import { inject, injectable } from "inversify";
import { NetworkRequest, ISubRequestData } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { useTeamState } from "@/state/team.state";
import { UserState } from "@/state/UserState";

@injectable()
export class CreateTeamRequest extends NetworkRequest<
  { name: string; avatar: string | null; banner: string | null },
  void,
  void
> {
  method: HTTPMethod = "POST";
  withCSRF: boolean = true;
  authorized: boolean = true;

  mockOutputData: void = undefined;

  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: {
    name: string;
    avatar: string | null;
    banner: string | null;
  }): ISubRequestData {
    return {
      init: {
        body: JSON.stringify(data),
      },
      url: new URL(URLEnum.CREATE_TEAM),
    };
  }

  onSuccess(data: void): void {
    return;
  }

  async execute(data: {
    name: string;
    avatar: string | null;
    banner: string | null;
  }): Promise<void> {
    const state = useTeamState.getState();
    state.setSubmitting(true);
    state.setError(null);

    try {
      await super.execute(data);
    } catch (e: any) {
      state.setError(e.message || "Unknown error");
    } finally {
      state.setSubmitting(false);
    }
  }
}
