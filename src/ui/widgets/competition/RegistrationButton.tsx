'use client'

import { useMe } from "@/hooks/user/useMe.hook"
import { Button } from "@/ui/button"
import { ArrowRight, UserRoundPlus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface RegistrationButtonProps {
  isRegistrationOpen: boolean
  id: string
}

export default function RegistrationButton({
  isRegistrationOpen,
  id
}: RegistrationButtonProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {isAuthed} = useMe();
  if (!isRegistrationOpen) return null

  function handleClick() {
    if (isAuthed()) {
      router.push(`/competitions/${id}/register`)
      return
    }

    const modal = searchParams.get('modal')
    const next = modal === 'true' ? 'false' : 'true'
    router.push(`?modal=${next}`)
  }

  return (
    <Button
      size="lg"
      className="hidden sm:flex items-center gap-2 shrink-0"
      onClick={handleClick}
    >
      <UserRoundPlus className="h-4 w-4" />
      Go to Registration
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
}