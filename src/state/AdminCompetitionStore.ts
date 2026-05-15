import { injectable } from "inversify";
import CompetitionState from "./CompetitionState";
@injectable()
export default class AdminCompetitionStore extends CompetitionState {
  constructor() {
    super();
  }
}
