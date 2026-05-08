"use client";

import container, { TYPES } from "@/core/Container";
import DeleteCompetitionRequest from "@/core/requests/network/Competion/DeleteCompetition.request";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { TrashIcon } from "lucide-react";

interface Props {
  id: string;
}

export default function GoToCompetitionPageButton({ id }: Props) {
  const handle = async () => {
    const deleteReq = container.get<DeleteCompetitionRequest>(
      TYPES.DeleteCompetitionRequest,
    );
    await deleteReq.execute({ id: id, isAdmin: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm" variant={"destructive"}>
          <TrashIcon className="text-white/50" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action is destructive, you will delete competition for forever
            ( this is very looong... )
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant={"destructive"} onClick={handle}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
