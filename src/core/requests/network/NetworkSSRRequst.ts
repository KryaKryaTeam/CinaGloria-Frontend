import URLAddValue from "@/infrastructure/URLAddKey";
import URLEnum from "../URLEnum";
import { HTTPMethod } from "../type";
import { injectable } from "inversify";
import { ISubRequestData } from "./NetworkRequest";


@injectable()
export default abstract class NetworkSSRRequest<Data, Response, RequestOutput> {
  constructor() {}
  abstract withCSRF: boolean;
  abstract method: HTTPMethod;
  private retrying: number = 0;   
  async getCsrf(): Promise<string> {
    let csrfToken: string = "";
    try {
      const response = await fetch(URLEnum.CSRF, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data?.csrf) csrfToken = data.csrf;
      else console.warn("CSRF token not found in response");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
    return csrfToken;
  }

  async execute(request_data: Data): Promise<Response> {
    try {
      if (this.retrying > 2) throw new Error("Out of retry counter!");  
      let mapped = this.mapData(request_data);
      if (this.preload) mapped = await this.preload(mapped);

      mapped.init.method = this.method;
      mapped.init.credentials = "include";
      mapped.init.headers = {
        ...mapped.init.headers,
        "Content-Type": "application/json",
      };

      if (this.withCSRF)
        mapped.url = URLAddValue(mapped.url, "state", await this.getCsrf());

      return fetch(mapped.url, mapped.init)
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (res.ok) return data;

          throw new Error(data.message || "Request failed", {
            cause: res.status,
          });
        })
        .then((json) => this.onSuccess(json));
    } catch (error) {
      if (this.onError) this.onError(JSON.stringify((error as Error).message));
      this.retrying++;  
      throw (error as Error).message;
    }
  }

  abstract onSuccess(data: RequestOutput): Response | Promise<Response>;
  abstract mapData(data: Data): ISubRequestData;
  protected async preload?(base: ISubRequestData): Promise<ISubRequestData>;
  protected onError?(error: string): void;
}
