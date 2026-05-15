import URLEnum from "../URLEnum";
import { HTTPMethod } from "../type";
import { injectable } from "inversify";
import { ISubRequestData } from "./NetworkRequest";

export class NetworkSSRRequestError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseData?: unknown,
  ) {
    super(message);
    this.name = "NetworkSSRRequestError";
  }
}

const allowCodes = ["COMPETITION_015"];

@injectable()
export default abstract class NetworkSSRRequest<Data, Response, RequestOutput> {
  constructor() {}

  abstract method: HTTPMethod;
  private maxRetries = 2;

  async execute(request_data: Data): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const mapped = await this.buildRequest(request_data);
        const result = await this.performFetch(mapped);
        return await this.onSuccess(result);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Вивід помилки в консоль
        console.error(
          `[NetworkSSRRequest] Attempt ${attempt + 1} failed:`,
          lastError.message,
        );

        if (this.onError) {
          this.onError(lastError.message);
        }

        const isLastAttempt = attempt === this.maxRetries;
        if (isLastAttempt) break;

        // Не ретраїмо клієнтські помилки (4xx), крім 408 та 429
        if (error instanceof NetworkSSRRequestError) {
          const status = error.statusCode ?? 0;
          if (
            status >= 400 &&
            status < 500 &&
            status !== 408 &&
            status !== 429
          ) {
            break;
          }
        }

        await this.delay(Math.pow(2, attempt) * 100);
      }
    }

    throw (
      lastError ?? new NetworkSSRRequestError("Request failed after retries")
    );
  }

  private async buildRequest(request_data: Data): Promise<ISubRequestData> {
    let mapped = this.mapData(request_data);
    if (this.preload) mapped = await this.preload(mapped);

    mapped.init.method = this.method;

    // Встановлюємо базові заголовки
    const headers = new Headers(mapped.init.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    mapped.init.headers = headers;

    return mapped;
  }

  private async performFetch(mapped: ISubRequestData): Promise<RequestOutput> {
    const res = await fetch(mapped.url, mapped.init as unknown as RequestInit);

    // Безпечне отримання JSON
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }

    if (!res.ok) {
      if (!allowCodes.includes(data.code))
        throw new NetworkSSRRequestError(
          data.message || `HTTP ${res.status}: ${res.statusText}`,
          res.status,
          data,
        );
    }

    return data as RequestOutput;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  abstract onSuccess(data: RequestOutput): Response | Promise<Response>;
  abstract mapData(data: Data): ISubRequestData;

  protected async preload?(base: ISubRequestData): Promise<ISubRequestData>;
  protected onError?(error: string): void;
}
