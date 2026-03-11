import Link from "next/link";
import ProfileHeaderButtons from "./ProfileHeaderButtons";

export default function MainHeader() {
  return (
    <header className="w-full text-md font-medium h-15">
      <div className="flex flex-row w-9/12 mx-auto my-0 h-full items-center gap-12 relative">
        <h2 className="font-bebas text-2xl leading-0 text-foreground">
          CinaGloria
        </h2>
        <nav className="flex flex-row gap-4 items-center">
          <Link className="text-md hover:underline" href={"/"}>
            Home
          </Link>
          <Link className="text-md hover:underline" href={"/competiotions"}>
            Competitions
          </Link>
          <Link className="text-md hover:underline" href={"/about"}>
            About platform
          </Link>
        </nav>
        <nav className="w-max h-full flex flex-row items-center right-0 absolute">
          <ProfileHeaderButtons />
        </nav>
      </div>
    </header>
  );
}
