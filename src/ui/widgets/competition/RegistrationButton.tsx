'use client'

import container, { TYPES } from "@/core/Container";
import { UserState } from "@/state/UserState";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";


interface Props {
  id: string;
  isRegistrationOpen: boolean;
}
export default function RegistrationButton(props: Props){
    const n = useRouter();
    const userState = container.get<UserState>(TYPES.UserState)
    const handle = () => {
        n.push(`/competiotions/${props.id}`)
    }
    return (
        <>
                <Button
      className="w-full"
      size="sm"
      variant={props.isRegistrationOpen ? "default" : "outline"}
      disabled={!props.isRegistrationOpen}
      onClick={handle}
    >
      {props.isRegistrationOpen ? "Register now" : "Registration closed"}
    </Button>
        </>
    )
}