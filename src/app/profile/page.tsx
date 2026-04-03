'use client'
import container from "@/core/Container"
import { UserState } from "@/state/UserState"

export default function PageProfile(){
    const user = container.get(UserState)
    console.log(user)
    return (
        <div>dsasd</div>
    )
}