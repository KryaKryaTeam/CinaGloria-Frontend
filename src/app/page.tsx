import SticksBackground from "@/ui/backgrounds/SticksBackground";
import MainHeader from "@/ui/widgets/main/MainHeader";

export default function Home() {
  return (
    <>
      <MainHeader />
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
      </main>
    </>
  );
}
