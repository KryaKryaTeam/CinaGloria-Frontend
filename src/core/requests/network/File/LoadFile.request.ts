import { inject } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { RelationSlotValues } from "./FileTypes";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import FileStore from "@/state/FileStore";

// ============ Request/Response Types ============
export interface LoadFileRequestData {
  file: FormData;
  relationString: RelationSlotValues;
}

export interface LoadFileResponse {
  size: number;
  mimeType: string;
  slot: string;
  url: string;
}

// ============ Error Types ============
export interface ErrorResponse {
  code: string;
  message: string;
  cause: string;
  timestamp: string;
}

// Error code 401 constant
const ERROR_401 = {
  code: "USER_027",
  message: "Authorization header is undefined",
  cause: "FIELD_NAME_OR_REASON",
  timestamp: "2026-05-02T16:23:43.964Z",
} as const;

export type Type401 = typeof ERROR_401;

export default class LoadFileRequest extends NetworkRequest<
  LoadFileRequestData,
  LoadFileResponse,
  LoadFileResponse,
  Type401
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  store: FileStore;
  relation: RelationSlotValues | null;
  constructor(
    @inject(TYPES.UserState) private userState: UserState,
    @inject(TYPES.FileStore) private fileStore: FileStore,
  ) {
    super(userState);
    this.store = fileStore;
    this.relation = null;
  }
  mapData(data: LoadFileRequestData): ISubRequestData {
    this.relation = data.relationString;
    return {
      url: new URL(URLEnum.FILE + `upload/${data.relationString}`),
      init: {
        body: data.file,
      },
    };
  }
  onSuccess(
    data: LoadFileResponse,
  ): LoadFileResponse | Promise<LoadFileResponse> {
    if (!this.relation) throw Error();
    this.store.addUrl(data.url, this.relation);
    return data;
  }
}
