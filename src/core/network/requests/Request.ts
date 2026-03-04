import URLEnum from "../URLEnum";

export interface ISubRequestData {
  init: RequestInit;
  url: URL;
}

export default abstract class Request<Data, Response, RequestOutput> {
  abstract withCSRF: boolean;
  abstract method: "GET" | "POST" | "PUT" | "DELETE";
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
      let mapped = this.mapData(request_data);
      if (this.preload) mapped = await this.preload(mapped);

      mapped.init.method = this.method;
      mapped.init.credentials = "include";
      mapped.init.headers = {
        ...mapped.init.headers,
        "Content-Type": "application/json",
      };

      if (this.withCSRF)
        mapped.url.searchParams.append("state", await this.getCsrf());

      return fetch(mapped.url, mapped.init)
        .then((res) => res.json())
        .then((json) => this.onSuccess(json));
    } catch (error) {
      if (this.onError) this.onError(error as Error);
      //handle
      throw error;
    }
  }

  abstract onSuccess(data: RequestOutput): Response | Promise<Response>;
  abstract mapData(data: Data): ISubRequestData;
  protected async preload?(base: ISubRequestData): Promise<ISubRequestData>;
  protected onError?(error: Error): void;
}
