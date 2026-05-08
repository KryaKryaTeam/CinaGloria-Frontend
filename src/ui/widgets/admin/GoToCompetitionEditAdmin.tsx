"use client";

import { Button } from "@/ui/button";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}
export default function GoToCompetitionPageButton(props: Props) {
  const n = useRouter();
  const handle = () => {
    n.push(`/app/admin/competitions/${props.id}`);
  };
  return (
    <>
      <Button className="w-full" size="sm" onClick={handle}>
        <PencilIcon className="text-white/50" />
        Edit
      </Button>
    </>
  );
}
