import container, { TYPES } from "@/core/Container";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import Team from "@/core/domain/entity/Team";
import { GetUsersAdminListRequest } from "@/core/requests/network/GetUsersAdminList.request";
import { GetUsersByEmailRequest } from "@/core/requests/network/GetUsersByEmailRequest";
import { PatchTeamRequest } from "@/core/requests/network/Team/PatchTeamRequest";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";
import TeamState from "@/state/TeamState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z, { email } from "zod";

const schema = z.object({
  // Робимо ім'я необов'язковим або дозволяємо порожній рядок
  name: z.string().max(255).optional().or(z.literal("")),

  avatar: z.preprocess(
    (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
    z
      .file()
      .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
      .max(2_000_000)
      .nullable()
      .optional(),
  ),

  banner: z.preprocess(
    (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
    z
      .file()
      .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
      .max(5_000_000)
      .nullable()
      .optional(),
  ),
});

type FormValues = z.infer<typeof schema>;

export const useChangeTeamForm = ({ team }: { team: Team | undefined }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      avatar: null,
      banner: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!team) return;
    const uploadFile = container.get<UploadFileToAServerRequest>(
      TYPES.UploadFileToAServerRequest,
    );

    let avatarUrl: string | undefined = undefined;
    let bannerUrl: string | undefined = undefined;

    if (data.avatar) {
      avatarUrl = await uploadFile.execute({
        file: data.avatar,
        scope: "team:avatar",
      });
    }

    if (data.banner) {
      bannerUrl = await uploadFile.execute({
        file: data.banner,
        scope: "team:banner",
      });
    }

    const patchTeamRequest = container.get<PatchTeamRequest>(
      TYPES.PatchTeamRequest,
    );

    await patchTeamRequest.execute({
      name: data.name || "Unnamed Team",
      avatar: avatarUrl,
      banner: bannerUrl,
      teamId: team.id,
    });
  };

  return {
    form: {
      ...form,
      submit: form.handleSubmit(onSubmit),
      errors: form.formState.errors,
    },
  };
};

const formEmail = z.object({
  email: z.string().min(1),
});

const useMembers = ({ team }: { team: Team | undefined }) => {
  const emailForm = useForm({ resolver: zodResolver(formEmail) });

  const [users, setUsers] = useState<IUserForAdminList[]>([]);
  const watched = emailForm.watch();
  const formData = useMemo(() => watched, [watched.email]);

  async function inviteMember(id: string) {}
  async function declineInvite(id: string) {}
  async function deleteMember(id: string) {}
  async function makeCaptain(id: string) {}
  async function findUsersByEmail(email: string) {
    if (!team) return;
    if (email.length < 3) return setUsers([]);
    const request = container.get<GetUsersByEmailRequest>(
      TYPES.GetUsersByEmailRequest,
    );

    let users = await request.execute({ email });

    users = users.filter(
      (a) =>
        !(
          team.captainId == a.id ||
          team.members.includes(a.id) ||
          team.memberInvites.some((b) => b.member == a.id)
        ),
    );
    setUsers(users);
  }

  useEffect(() => {
    findUsersByEmail(formData.email);
  }, [formData]);

  return {
    emailForm,
    users,
    utils: {
      inviteMember,
      declineInvite,
      deleteMember,
      makeCaptain,
    },
  };
};

export function useTeamPage() {
  const teamStore = container.get<TeamState>(TYPES.TeamState);

  const { id } = useParams();

  const team = useMemo(() => teamStore.getById(id as string), [id]);

  const changeForm = useChangeTeamForm({ team });
  const members = useMembers({ team });

  return { team, changeForm: changeForm.form, members };
}
