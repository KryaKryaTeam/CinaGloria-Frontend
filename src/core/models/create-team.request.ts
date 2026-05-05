export class CreateTeamRequest {
  name: string;
  avatar: string | null;
  banner: string | null;

  constructor() {
    this.name = "";
    this.avatar = null;
    this.banner = null;
  }
}

export const MAX_TEAM_NAME_LENGTH = 255;
