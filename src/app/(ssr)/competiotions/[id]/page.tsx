import container from "@/core/Container"
import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import GetCompetionByIdRequest from "@/core/requests/network/Competion/GetCompetionById.request"
export enum CompetitionStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  PUBLISHED = "PUBLISHED",
  REGISTRATION = "REGISTRATION",
  WAITING_FOR_START = "WAITING_FOR_START",
  STARTED = "STARTED",
  SCORING = "SCORING",
  ARCHIVED = "ARCHIVED",
  CANCELED = "CANCELED",
}
export interface CompetitionPublicObject {
  id: string;
  name: string;
  description: string;
  avatar: URL;
  banner: URL;
  dateOfStart: Date;
  dateOfEnd: Date;
  dateOfStartRegistration: Date;
  dateOfEndRegistration: Date;
  status: CompetitionStatus;
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    const request = container.get(GetCompetionByIdRequest);
    const {name} = await request.execute(id);

    return (
        <div className="flex">
            <h1>name</h1>
            
        </div>
    )
}