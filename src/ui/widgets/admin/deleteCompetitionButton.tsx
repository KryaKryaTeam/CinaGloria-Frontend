"use client";

import container, { TYPES } from "@/core/Container";
import DeleteCompetitionRequest from "@/core/requests/network/Competion/DeleteCompetition.request";
import { Button } from "@/ui/button";

interface Props {
  id: string;
}

export default function GoToCompetitionPageButton({ id }: Props) {
  const handle = async () => {
    const deleteReq = container.get<DeleteCompetitionRequest>(
      TYPES.DeleteCompetitionRequest
    );
    await deleteReq.execute({id: id, isAdmin: true});
  };

  return (
    <Button className="w-full" size="sm" onClick={handle}>
      delete
    </Button>
  );
}