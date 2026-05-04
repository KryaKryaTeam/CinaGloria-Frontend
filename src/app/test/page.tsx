"use client";
import AdminTable from "@/ui/widgets/admin/adminTable";
import { useState } from "react";

const mockActions = new Map([
  [
    "participants",
    (row: object) => alert(`View participants for: ${JSON.stringify(row)}`),
  ],
]);

const initialCompetitions = [
  {
    title: "Winter Hackathon 2025",
    participants: 142,
    deadline: "2025-02-28",
    prize: "$5,000",
  },
  {
    title: "Spring AI Challenge",
    participants: 98,
    deadline: "2025-04-15",
    prize: "$3,000",
  },
  {
    title: "Summer Code Jam",
    participants: 310,
    deadline: "2025-06-01",
    prize: "$10,000",
  },
  {
    title: "Autumn Data Science Cup",
    participants: 220,
    deadline: "2025-09-30",
    prize: "$7,500",
  },
  {
    asdhsaihd: "djoasojdsa",
    participants: 50,
    deadline: "2025-12-31",
    prize: "$1,000",
  },
];

export default function TestPage() {
  const [competitions, setCompetitions] = useState(initialCompetitions);

  const handleLoadMore = () => {
    setCompetitions((prev) => [
      ...prev,
      {
        title: "New Competition",
        participants: 0,
        deadline: "2025-12-31",
        prize: "$1,000",
      },
    ]);
  };

  return (
    <AdminTable
      caption="Competitions"
      data={competitions}
      actions={mockActions}
      loadMore={handleLoadMore}
    />
  );
}
