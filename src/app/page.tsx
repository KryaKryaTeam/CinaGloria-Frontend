import SticksBackground from "@/ui/backgrounds/SticksBackground";
import BaseHeader from "@/ui/widgets/base/BaseHeader";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import Logo from "@/ui/logo";
import Link from "next/link";
import Image from "next/image";
import BaseFooter from "@/ui/widgets/base/BaseFooter";

export default function Home() {
  return (
    <>
      <BaseHeader />
      <main>
        <section className="w-full h-screen relative">
          <div className="absolute w-screen h-screen z-10 flex items-center justify-center">
            <p className="text-5xl text-center leading-30 text-background">
              Welcome to <br />
              <span className="font-bebas text-[140px]">CinaGloria</span>
            </p>
          </div>
          <SticksBackground />
        </section>
        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_500px] grid-rows-1 w-3/4 h-max min-h-screen mx-auto py-10">
          <section id="about" className="flex flex-col justify-center gap-8">
            <h1 className="flex flex-row items-end gap-2 text-4xl font-bold">
              About
              <span>
                <Logo size={3} className="w-10 leading-12" />
              </span>
            </h1>
            <p className="text-lg w-full lg:w-1/2 mt-2 text-foreground">
              the premier platform for hackathons, long-term programming
              competitions, and more! Whether you`re a seasoned developer or
              just starting out on your coding journey, we`ve got something for
              everyone.
            </p>
            <h2 className="text-2xl font-semibold">Why Choose CinaGloria?</h2>
            <Card className="w-full lg:w-1/2">
              <CardHeader>
                <CardTitle>Diverse Competitions</CardTitle>
              </CardHeader>
              <CardContent>
                Join exciting hackathons and long-term challenges that cater to
                all skill levels. From beginners-friendly events to hardcore
                coding marathons, there`s always a competition that matches your
                passion.
              </CardContent>
            </Card>
            <Card className="w-full lg:w-1/2">
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                Form or join teams with other talented developers to tackle
                complex problems together. CinaGloria supports team creation and
                collaboration features, making it easy for you to work on
                projects alongside like-minded individuals.
              </CardContent>
            </Card>
            <Card className="w-full lg:w-1/2">
              <CardHeader>
                <CardTitle>Leaderboards and Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                Stand out in the community with leaderboards that showcase top
                performers and earn prestigious certificates for your
                achievements.
              </CardContent>
            </Card>

            <Card className="bg-foreground w-full lg:w-1/2 lg:min-w-150">
              <CardHeader>
                <CardTitle className="text-[3rem] font-bebas text-background w-full text-center">
                  Join Us Today!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center flex-col justify-center gap-8">
                <p className="text-center text-lg text-background w-3/4 mx-auto">
                  Ready to take your coding skills to the next level? Sign up
                  now and start participating in exciting competitions, meeting
                  amazing people, and growing as a developer. See you on
                  CinaGloria!
                </p>
                <Link href={"/auth/login"}>
                  <Button variant={"secondary"} size={"lg"}>
                    Start your Journey now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
          <Image
            src={"/cat2.png"}
            alt="cat"
            width={550}
            height={700}
            className="w-full h-full object-contain hidden 2xl:block"
          />
        </div>
      </main>
      <BaseFooter />
    </>
  );
}
