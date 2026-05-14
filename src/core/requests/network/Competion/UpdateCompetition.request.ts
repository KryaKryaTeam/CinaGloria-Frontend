import Competition from "@/core/domain/entity/Competion";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import { inject } from "inversify";
import URLEnum from "../../URLEnum";
import { da } from "date-fns/locale";

export interface IUpdateCompetitionDTO {
  name: string;
  description: string;
  dateOfStart: Date;
  dateOfEnd: Date;
  dateOfStartRegistration: Date;
  dateOfEndRegistration: Date;
  rules: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  avatar: string | null;
  banner: string | null;
  ultraWideBanner: string | null;
  socialMedia: string | null;
}

export class UpdateCompetitionRequest extends NetworkRequest<
  { id: string } & Partial<IUpdateCompetitionDTO>,
  void,
  void
> {
  authorized: boolean = true;
  withCSRF: boolean = false;
  method: HTTPMethod = "PUT";
  mockOutputData: void | undefined;
  protected showProgressInToast: boolean = true;
  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(
    data: { id: string } & Partial<IUpdateCompetitionDTO>,
  ): ISubRequestData {
    console.log(data);
    return {
      url: new URL(URLEnum.COMPETITION_UPDATE + data.id),
      init: {
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          dateOfStart: data.dateOfStart?.toISOString(),
          dateOfEnd: data.dateOfEnd?.toISOString(),
          dateOfStartRegistration: data.dateOfStartRegistration?.toISOString(),
          dateOfEndRegistration: data.dateOfEndRegistration?.toISOString(),
          rules: data.rules,
          avatar: data.avatar,
          banner: data.banner,
          ultraWideBanner: data.ultraWideBanner,
          socialMedia: data.socialMedia,
        }),
      },
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
