"use client"

import { ArrowRight } from "lucide-react"
import { Input } from "@/ui/input"
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
export default function SecondDataForm() {


  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Additional Information</CardTitle>
        <CardDescription>
          None of these fields are required. Fill in what you like.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1">First name</Label>
              <Input placeholder="John" />
            </div>

            <div>
              <Label className="block mb-1">Last name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div>
            <Label className="block mb-1">Surname</Label>
            <Input placeholder="Your surname" />
          </div>

          <div>
            <Label className="block mb-1">Age</Label>
            <Input type="number" placeholder="25" min={1} max={150} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1">Telegram</Label>
              <Input placeholder="@username" />
            </div>

            <div>
              <Label className="block mb-1">Discord</Label>
              <Input placeholder="user#0000" />
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <Button className="w-full">
              Submit
            </Button>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
            >
              Skip
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
