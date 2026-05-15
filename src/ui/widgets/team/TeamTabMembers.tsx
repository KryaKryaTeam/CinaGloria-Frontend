"use client";

import { useTeamPage } from "@/hooks/team/useTeamPage";
import { TabsContent } from "@/ui/tabs";
import GridCard from "@/ui/component/gridCards/GridCard";
import {
  Users,
  Trophy,
  Calendar,
  ShieldCheck,
  Hash,
  Clock,
  Info,
  CalendarDays,
  Crown,
  Trash2,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import UserProfileCard from "@/ui/component/UserProfileCard";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { ErrorBlank } from "@/ui/component/ErrorBlank";
import { Button } from "@/ui/button";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";
import { Controller } from "react-hook-form";

const TeamTabMembers = observer(() => {
  const { team, members } = useTeamPage();

  if (!team) return null;

  return (
    <TabsContent
      value="members"
      className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="w-full grid grid-cols-2 grid-rows-1 space-x-6">
        <div className="flex flex-col space-y-6">
          <GridCard name="Members">
            <div className="space-y-6">
              {team.members.map((member) => (
                <UserProfileCard id={member} key={member}>
                  <Button
                    variant={"destructive"}
                    className="ml-auto"
                    disabled={team.captainId === member}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </UserProfileCard>
              ))}
            </div>
          </GridCard>
        </div>
        <div className="flex flex-col space-y-6">
          <GridCard name="Invitations">
            {team.memberInvites.length === 0 ? (
              <div className="w-full h-20 border-black/10 border bg-slate-50 rounded-xl flex items-center justify-center text-sm text-slate-500">
                No pending invitations
              </div>
            ) : (
              <div className="space-y-4">
                {team.memberInvites.map((invite) => (
                  <div key={invite.member}>
                    <UserProfileCard id={invite.member} />
                  </div>
                ))}
              </div>
            )}
          </GridCard>
          <GridCard name="Invite Member">
            <form>
              <Field>
                <FieldLabel htmlFor="invite-email">Email Address</FieldLabel>
                <Controller
                  name="email"
                  control={members.emailForm.control}
                  render={({ field }) => (
                    <InputWithDebounce
                      debounceCallback={field.onChange}
                      value={field.value}
                      id="invite-email"
                      placeholder="Enter email to invite"
                    />
                  )}
                ></Controller>

                <FieldDescription>
                  Invite new members to your team by entering their email
                  address.
                </FieldDescription>
                {members.users.length != 0 ? (
                  members.users.map((user) => (
                    <div
                      className="w-full h-20 border-slate-200 flex bg-accent flex-row p-2 rounded-lg items-center space-x-4 hover:bg-background transition-colors border-1"
                      key={user.id}
                    >
                      <Image
                        className="rounded-full"
                        width={64}
                        height={64}
                        src={user.avatarUrl ?? ""}
                        alt="avatar"
                      ></Image>
                      <h2>{user.email}</h2>
                    </div>
                  ))
                ) : (
                  <p className="w-full py-10 text-slate-400 text-center">
                    Opps... we couldn`t find any users with that email.
                  </p>
                )}
                <Button type="submit" className="mt-4">
                  Invite
                </Button>
              </Field>
            </form>
          </GridCard>
        </div>
      </div>
    </TabsContent>
  );
});

export default TeamTabMembers;
