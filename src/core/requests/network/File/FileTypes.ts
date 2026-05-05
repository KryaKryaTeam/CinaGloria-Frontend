export const RelationSlots = {
  user: {
    avatar: "user:avatar",
  },
  competition: {
    ultraWideBanner: "competition:ultraWideBanner",
    banner: "competition:banner",
    avatar: "competition:avatar",
    socialMedia: "competition:socialMedia",
  },
  team: {
    banner: "team:banner",
    avatar: "team:avatar",
  },
} as const;

export type RelationSlotCategory = keyof typeof RelationSlots;

export type ReletionSlotsType =
  | keyof typeof RelationSlots.user
  | keyof typeof RelationSlots.competition
  | keyof typeof RelationSlots.team;

export type UserSlots = keyof typeof RelationSlots.user;
export type CompetitionSlots = keyof typeof RelationSlots.competition;
export type TeamSlots = keyof typeof RelationSlots.team;

export type RelationSlotValues =
  | (typeof RelationSlots.user)[UserSlots]
  | (typeof RelationSlots.competition)[CompetitionSlots]
  | (typeof RelationSlots.team)[TeamSlots];
