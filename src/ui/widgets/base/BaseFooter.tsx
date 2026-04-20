import Logo from "@/ui/logo";
import Link from "next/link";

function BaseFooter() {
  return (
    <footer className="grid grid-cols-1 max-lg:gap-10 grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 w-full h-max min-h-100 bg-foreground py-10 px-[5rem]">
      <div className="flex flex-col gap-8 justify-between max-lg:row-start-3">
        <div className="flex flex-col">
          <Logo
            className="text-background text-start leading-normal"
            size={1.2}
          />
          <p className="text-background font-light">
            Developed by KryaKryaTeam for SFLU
          </p>
        </div>
        <p className="text-background/60 text-sm font-light">
          © {new Date().getFullYear()} CinaGloria. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl text-background">Links</h2>
        <nav className="flex flex-col gap-2">
          <Link className="text-background" href="/">
            - Home
          </Link>
          <Link className="text-background" href="/competitions">
            - Competitions
          </Link>
          <Link className="text-background" href="/app/profile/information">
            - App
          </Link>
          <Link className="text-background" href="/policy/privacy">
            - Privacy Policy
          </Link>
          <Link className="text-background" href="/policy/terms">
            - Terms of use
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl text-background">Social media</h2>
        <nav className="flex flex-col gap-2">
          <Link className="text-background" href="/">
            - KryaKryaTeam Github
          </Link>
          <Link className="text-background" href="/competitions">
            - KryaKryaTeam Instagram
          </Link>
          <Link className="text-background" href="/app/profile/information">
            - KryaKryaTeam Threads
          </Link>
          <Link className="text-background" href="/policy/privacy">
            - KryaKryaTeam Discord
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default BaseFooter;
