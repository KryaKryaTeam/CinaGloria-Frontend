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

@injectable()
export default abstract class NetworkSSRRequest<Data, Response, RequestOutput> {
  constructor() {}

  abstract withCSRF: boolean;
  abstract method: HTTPMethod;
  abstract authorized: boolean;

  private maxRetries = 2;

  async getCsrf(): Promise<string> {
    try {
      const response = await fetch(URLEnum.CSRF, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.csrf) return data.csrf;
      console.warn("CSRF token not found in response");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
    return "";
  }

  async execute(request_data: Data): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const mapped = await this.buildRequest(request_data);
        const result = await this.performFetch(mapped);
        return await this.onSuccess(result);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (this.onError) {
          this.onError(lastError.message);
        }

        const isLastAttempt = attempt === this.maxRetries;
        if (isLastAttempt) break;

        // Don't retry client errors (4xx) except 408/429
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

        // Exponential backoff before retry
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
    mapped.init.headers = {
      ...mapped.init.headers,
      "Content-Type": "application/json",
    };

    // SSR-safe: only include credentials if explicitly needed
    if (this.authorized) {
      mapped.init.credentials = "include";
    }

    if (this.withCSRF) {
      const csrf = await this.getCsrf();
      mapped.url.searchParams.set("state", csrf);
    }

    return mapped;
  }

  private async performFetch(mapped: ISubRequestData): Promise<RequestOutput> {
    const res = await fetch(mapped.url, mapped.init);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
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
