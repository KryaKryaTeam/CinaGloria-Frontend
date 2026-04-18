"use client";

import { CompetitionCard, CompetitionPublicObject, CompetitionStatus } from "@/ui/widgets/competition/CompetionCard";



export default function TestPage() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompetitions.map((competition) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            onRegister={(id) => console.log("Register", id)}
          />
        ))}
      </div>
    </div>
  );
}