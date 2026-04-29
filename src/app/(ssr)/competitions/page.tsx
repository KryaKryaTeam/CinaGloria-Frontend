
import {
  CompetitionPublicObject,
  CompetitionStatus,
} from "@/core/domain/entity/Competion";
import GetPublicCompetitionRequest from "@/core/requests/network/Competion/GetPublicCompetion.request";
import { CompetitionCard } from "@/ui/widgets/competition/CompetionCard";


export default async function CompetitionPage() {
  const request = new GetPublicCompetitionRequest();
  const data = await request.execute(0);

  return (
    <div className="py-8 w-3/4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-start">Competitions</h1>
      <div></div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] auto-rows-[1fr] gap-4">
        {data.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
