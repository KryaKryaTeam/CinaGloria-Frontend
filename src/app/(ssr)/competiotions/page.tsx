import container, { TYPES } from "@/core/Container";
import {
  CompetitionPublicObject,
  CompetitionStatus,
} from "@/core/domain/entity/Competion";
import GetPublicCompetitionRequest from "@/core/requests/network/Competion/GetPublicCompetion.request";
import { CompetitionCard } from "@/ui/widgets/competition/CompetionCard";
export const mockCompetitions: CompetitionPublicObject[] = [
  {
    id: "1",
    name: "Summer Code Challenge 2025",
    description:
      "A competitive programming event open to all skill levels. Solve algorithmic problems and climb the leaderboard over 30 days.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=SCC"),
    banner: new URL("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"),
    dateOfStart: new Date("2025-07-01"),
    dateOfEnd: new Date("2025-07-31"),
    dateOfStartRegistration: new Date("2025-06-01"),
    dateOfEndRegistration: new Date("2025-06-20"),
    status: CompetitionStatus.REGISTRATION,
  },
  {
    id: "2",
    name: "AI Hackathon: Build the Future",
    description:
      "48-hour hackathon focused on real-world AI applications. Teams of up to 4 compete for $10,000 in prizes.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=AIH"),
    banner: new URL("https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"),
    dateOfStart: new Date("2025-08-15"),
    dateOfEnd: new Date("2025-08-17"),
    dateOfStartRegistration: new Date("2025-07-01"),
    dateOfEndRegistration: new Date("2025-08-10"),
    status: CompetitionStatus.SCHEDULED,
  },
  {
    id: "3",
    name: "Frontend Design Showdown",
    description:
      "Showcase your UI/UX skills by building a stunning web interface from a given design brief. Judged on creativity and code quality.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=FDS"),
    banner: new URL("https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"),
    dateOfStart: new Date("2025-05-01"),
    dateOfEnd: new Date("2025-05-15"),
    dateOfStartRegistration: new Date("2025-04-01"),
    dateOfEndRegistration: new Date("2025-04-28"),
    status: CompetitionStatus.STARTED,
  },
  {
    id: "4",
    name: "Data Science Cup 2025",
    description:
      "Analyze a real-world dataset and present your findings. Open to students and professionals alike.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=DSC"),
    banner: new URL("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"),
    dateOfStart: new Date("2025-03-01"),
    dateOfEnd: new Date("2025-03-31"),
    dateOfStartRegistration: new Date("2025-02-01"),
    dateOfEndRegistration: new Date("2025-02-25"),
    status: CompetitionStatus.SCORING,
  },
  {
    id: "5",
    name: "Open Source Sprint",
    description:
      "Contribute to open source projects during a focused two-week sprint. Earn points for merged PRs and issue resolutions.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=OSS"),
    banner: new URL("https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80"),
    dateOfStart: new Date("2025-09-01"),
    dateOfEnd: new Date("2025-09-14"),
    dateOfStartRegistration: new Date("2025-08-01"),
    dateOfEndRegistration: new Date("2025-08-28"),
    status: CompetitionStatus.PUBLISHED,
  },
  {
    id: "6",
    name: "Blockchain Dev Challenge",
    description:
      "Build decentralized applications on-chain. Smart contract development, DeFi, and NFT tracks available.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=BDC"),
    banner: new URL("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"),
    dateOfStart: new Date("2025-10-10"),
    dateOfEnd: new Date("2025-10-24"),
    dateOfStartRegistration: new Date("2025-09-01"),
    dateOfEndRegistration: new Date("2025-10-05"),
    status: CompetitionStatus.WAITING_FOR_START,
  },
  {
    id: "7",
    name: "Winter Algorithm Games",
    description:
      "Classic competitive programming contest with problems ranging from easy warmups to expert-level challenges.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=WAG"),
    banner: new URL("https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&q=80"),
    dateOfStart: new Date("2024-12-01"),
    dateOfEnd: new Date("2024-12-31"),
    dateOfStartRegistration: new Date("2024-11-01"),
    dateOfEndRegistration: new Date("2024-11-28"),
    status: CompetitionStatus.ARCHIVED,
  },
  {
    id: "8",
    name: "Mobile App Blitz",
    description:
      "Build a production-ready mobile app in 72 hours. React Native and Flutter both welcome.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=MAB"),
    banner: new URL("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"),
    dateOfStart: new Date("2025-04-20"),
    dateOfEnd: new Date("2025-04-23"),
    dateOfStartRegistration: new Date("2025-03-15"),
    dateOfEndRegistration: new Date("2025-04-15"),
    status: CompetitionStatus.CANCELED,
  },
  {
    id: "9",
    name: "Security CTF: Capture the Flag",
    description:
      "Test your cybersecurity skills across web exploitation, reverse engineering, cryptography, and forensics challenges.",
    avatar: new URL("https://api.dicebear.com/9.x/initials/svg?seed=CTF"),
    banner: new URL("https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"),
    dateOfStart: new Date("2025-11-01"),
    dateOfEnd: new Date("2025-11-03"),
    dateOfStartRegistration: new Date("2025-10-01"),
    dateOfEndRegistration: new Date("2025-10-28"),
    status: CompetitionStatus.DRAFT,
  },
];
export default async function CompetitionPage() {
  // const request = container.get<GetPublicCompetitionRequest>(TYPES.GetPublicCompetitionRequest)
  // const data = await request.execute(0)

  return (
  <div className="px-4 py-8">
  <h1 className="mb-8 text-3xl font-bold text-center">Competitions</h1>
  <div>

  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {mockCompetitions.map((competition) => (
      <CompetitionCard key={competition.id} competition={competition} />
    ))}
  </div>
</div>
  );
}
