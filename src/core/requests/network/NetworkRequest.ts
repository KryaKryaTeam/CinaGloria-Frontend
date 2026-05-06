import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import { inject, injectable } from "inversify";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import URLAddValue from "@/infrastructure/URLAddKey";
import { CreateTeamRequest } from "@/core/models/create-team.request";

export interface ISubRequestData {
  url: URL | string;
  init: Omit<RequestInit, "body"> & {
    body?: Record<string, unknown> | BodyInit;
  };
}

interface Option {
  mock: boolean;
}
let refreshPr: undefined | Promise<void>;
@injectable()
export abstract class NetworkRequest<
  Data,
  Response,
  RequestOutput,
  ErrorResponse = string,
> {
  static post(arg0: string, data: CreateTeamRequest) {
    throw new Error("Method not implemented.");
  }
  constructor(
    @inject(TYPES.UserState)
    protected readonly userState: UserState,
  ) {}
  abstract withCSRF: boolean;
  abstract authorized: boolean;
  abstract method: HTTPMethod;
  abstract mockOutputData?: RequestOutput;
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

  getAuth(): string {
    return this.userState.authToken;
  }

  setAuth(token: string) {
    this.userState.setAuthToken(token);
  }

  async execute(request_data: Data, option?: Option): Promise<Response> {
    if (option?.mock) {
      if (!this.mockOutputData) throw Error();
      let mapped = this.mapData(request_data);
      if (this.preload) mapped = await this.preload(mapped);
      return this.onSuccess(this.mockOutputData);
    }
    try {
      if (this.retrying > 2) throw new Error("Out of retry counter!");

      let mapped = this.mapData(request_data);

      if (this.preload) mapped = await this.preload(mapped);

      mapped.init.method = this.method;
      mapped.init.credentials = "include";

      if (!(mapped.url instanceof URL)) mapped.url = new URL(mapped.url);

      const headers = new Headers(mapped.init.headers);

      if (!(mapped.init.body instanceof FormData)) {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
      } else headers.delete("Content-Type");

      if (
        mapped.init.body &&
        typeof mapped.init.body === "object" &&
        !(mapped.init.body instanceof FormData) &&
        !(mapped.init.body instanceof Blob)
      ) {
        mapped.init.body = JSON.stringify(mapped.init.body);
      }

      if (this.withCSRF)
        mapped.url = URLAddValue(mapped.url, "state", await this.getCsrf());

      if (this.authorized) {
        const token = this.getAuth();
        if (!token) {
          await this.refresh();
          return await this.execute(request_data);
        }
        headers.set("Authorization", `Bearer ${token}`);
      }

      mapped.init.headers = headers;

      return fetch(mapped.url, mapped.init as unknown as RequestInit)
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (res.ok) return data;

          throw new Error(data.message || "Request failed", {
            cause: res.status,
          });
        })
        .then((json) => this.onSuccess(json));
    } catch (error) {
      const err = error as Error;

      if (Number(err.cause) === 401) {
        await this.refresh();
        return await this.execute(request_data);
      }

      if (this.onError) {
        this.onError(err);
      }

      if (this.onError) {
        this.onError(err);
      }

      throw err;
    }
  }

  private async refresh() {
    if (refreshPr) {
      return await refreshPr;
    }

    try {
      refreshPr = (async () => {
        const res = await fetch(URLEnum.REFRESH, {
          credentials: "include",
          method: "POST",
        });

        if (!res.ok) throw new Error("Session expired!");

        this.setAuth((await res.json()).accessToken);

        this.retrying++;
      })();
      await refreshPr;
    } finally {
      refreshPr = undefined;
    }
  }
  mockOnError(): ErrorResponse | undefined {
    if (this.onError) return this.onError(new Error("Mock error"));
  }
  abstract onSuccess(data: RequestOutput): Response | Promise<Response>;
  abstract mapData(data: Data): ISubRequestData;
  protected async preload?(base: ISubRequestData): Promise<ISubRequestData>;
  protected onError?(error: Error): ErrorResponse;
}
