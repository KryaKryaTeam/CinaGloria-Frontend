"use client";

import container, { TYPES } from "@/core/Container";
import { CompetitionStatus } from "@/core/domain/entity/Competion";
import { UserState } from "@/state/UserState";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}
export default function GoToCompetitionPageButton(props: Props) {
  const n = useRouter();
  const userState = container.get<UserState>(TYPES.UserState);
  const handle = () => {
    n.push(`/app/admin/competitions/${props.id}`);
  };
  return (
    <>
      <Button className="w-full" size="sm" onClick={handle}>
        delete
      </Button>
    </>
  );
}
