"use client";
import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { cn } from "@/infrastructure/utils";
import WaveBackground from "@/ui/backgrounds/WaveBackground";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Logo from "@/ui/logo";
import { animate } from "animejs";
import {
  LampCeiling,
  LampIcon,
  Lightbulb,
  Loader2,
  LucideLamp,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Fact {
  content: string;
}

const interestingFacts: Fact[] = [
  {
    content:
      "One day on Venus is longer than one year on Earth; it takes Venus 243 Earth days to complete a single rotation.",
  },
  {
    content:
      "Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body.",
  },
  {
    content:
      "The shortest war in history lasted only 38 minutes between Britain and Zanzibar in 1896.",
  },
  {
    content:
      "Time dilation means that astronauts on the International Space Station age slightly slower than people on Earth due to their high velocity.",
  },
  {
    content:
      "The word 'set' has the highest number of definitions in the English language, totaling over 430 distinct meanings in the Oxford English Dictionary.",
  },
  {
    content:
      "CinaGloria was originally conceived and developed during the SFLU hackathon.",
  },
  {
    content:
      "The first computer programmer was Ada Lovelace, a mathematician who wrote an algorithm for Charles Babbage's Analytical Engine in 1843.",
  },
  {
    content:
      "The Voyager 1 spacecraft has less computing power than a modern car key fob, yet it is currently over 24 billion kilometers away from Earth.",
  },
  {
    content:
      "The '404 Not Found' error was named after room 404 at CERN, where the first web servers were located (though this is a popular tech urban legend).",
  },
  {
    content:
      "The first domain name ever registered was symbolics.com on March 15, 1985.",
  },
  {
    content:
      "In 1999, NASA lost the $125 million Mars Climate Orbiter because one engineering team used metric units while another used English units.",
  },
  {
    content:
      "The first mouse was made of wood; it was built by Doug Engelbart in 1964 and had only one button.",
  },
  {
    content:
      "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth, meaning if the Sun vanished, we wouldn't know for over 8 minutes.",
  },
  {
    content:
      "The term 'bug' in software comes from a literal moth that got stuck in a relay of the Harvard Mark II computer in 1947.",
  },
  {
    content:
      "The total weight of all the ants on Earth is roughly equal to the total weight of all the humans on Earth.",
  },
  {
    content:
      "If you unraveled all the DNA in your body, it would span 34 billion miles — reaching far beyond the orbit of Pluto and back.",
  },
  {
    content:
      "The 'save' icon in most software is a floppy disk, a piece of hardware that most Gen Z users have never seen in person.",
  },
  {
    content:
      "The Apollo 11 guidance computer, which landed humans on the Moon, ran at a frequency of about 1.024 MHz — thousands of times slower than a modern calculator.",
  },
  {
    content:
      "A neutron star is so dense that a single teaspoon of its material would weigh about 6 billion tons.",
  },
  {
    content:
      "The original name of Google was 'Backrub', named for its ability to analyze back-links to determine the importance of a website.",
  },
  {
    content:
      "The first ever photo uploaded to the web was a picture of the band 'Les Horribles Cernettes', a parody group founded by employees at CERN.",
  },
  {
    content:
      "There are more possible iterations of a game of chess than there are atoms in the observable universe (the Shannon number).",
  },
  {
    content: "Linux powers 100% of the world's top 500 fastest supercomputers.",
  },
  {
    content:
      "The password for the computer controls of nuclear-tipped missiles in the US was '00000000' for eight years during the Cold War.",
  },
  {
    content:
      "Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  },
];

function LoaderScreen() {
  const loadMachine = useLoadMachine();
  const [exitAnimationIsPlaying, setExitAnimationIsPlaying] = useState(false);
  const [enterAnimationIsPlaying, setEnterAnimationIsPlaying] = useState(false);
  const [fact, setFact] = useState("");

  const ref = useCallback(
    (obj: HTMLDivElement) => {
      if (!obj) {
        return;
      }

      console.log(
        loadMachine.shouldAnimateEnter,
        loadMachine.shouldAnimateExit,
        enterAnimationIsPlaying,
        exitAnimationIsPlaying,
      );

      const hidder = document.querySelector("#hidder") as HTMLDivElement;
      hidder.style.display = "none";

      if (
        !enterAnimationIsPlaying &&
        !exitAnimationIsPlaying &&
        loadMachine.shouldAnimateEnter
      ) {
        obj.childNodes.forEach((value, key) => {
          animate(value, {
            delay: 200 + 100 * key,
            y: { from: 100, to: 0 },
            opacity: { from: 0, to: 1 },
            onComplete: () => {
              if (key == obj.children.length - 1) {
                setEnterAnimationIsPlaying(false);
                loadMachine.enterAnimationClear();
              }
            },
            onBegin: () => {
              if (key == 0) setEnterAnimationIsPlaying(true);
            },
          });
        });
      }
      if (
        !exitAnimationIsPlaying &&
        !enterAnimationIsPlaying &&
        loadMachine.shouldAnimateExit
      ) {
        animate(obj, {
          opacity: { from: 1, to: 0 },
          delay: 300,
          duration: 1000,
          ease: "inOut",
          onBegin: () => {
            obj.style.display = "flex";
            setExitAnimationIsPlaying(true);
          },
          onComplete: () => {
            obj.style.display = "none";
            setExitAnimationIsPlaying(false);
            loadMachine.exitAnimationClear();
          },
        });
      }

      if (
        loadMachine.loadedBefore &&
        !loadMachine.isAppBlocking &&
        !exitAnimationIsPlaying
      )
        obj.style.display = "none";
    },
    [loadMachine, enterAnimationIsPlaying, exitAnimationIsPlaying],
  );

  const loaderAnim = useCallback((obj: SVGSVGElement) => {
    if (!obj) return;

    animate(obj, {
      rotate: {
        from: "0deg",
        to: "360deg",
      },
      duration: 3000,
      ease: "inOut",
      loop: true,
    });
  }, []);

  useEffect(() => {
    (() => {
      setFact(
        interestingFacts[Math.floor(Math.random() * interestingFacts.length)]
          .content,
      );
    })();
  }, []);

  return (
    <section
      ref={ref}
      className="w-screen h-screen bg-background justify-center items-center flex flex-col gap-12 fixed top-0 left-0 z-50"
    >
      <div className="flex flex-row gap-4 items-center opacity-0">
        <Logo size={3} />
        <Loader2 ref={loaderAnim} className="w-12 h-12" />
      </div>
      <Card className="opacity-0">
        <CardHeader className="flex flex-row">
          <Lightbulb />
          <h3 className="font-lg font-bold">Interesting fact</h3>
        </CardHeader>
        <CardContent className="min-w-60 w-max max-w-100">{fact}</CardContent>
      </Card>
    </section>
  );
}

export default observer(LoaderScreen);
