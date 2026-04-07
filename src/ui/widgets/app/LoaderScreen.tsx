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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Fact {
  content: string;
}

const interestingFacts: string[] = [
  "One day on Venus is longer than one year on Earth; it takes Venus 243 Earth days to complete a single rotation.",
  "Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body.",
  "The shortest war in history lasted only 38 minutes between Britain and Zanzibar in 1896.",
  "Time dilation means that astronauts on the International Space Station age slightly slower than people on Earth due to their high velocity.",
  "The word 'set' has the highest number of definitions in the English language, totaling over 430 distinct meanings in the Oxford English Dictionary.",
  "CinaGloria was originally conceived and developed during the SFLU hackathon.",
  "The first computer programmer was Ada Lovelace, a mathematician who wrote an algorithm for Charles Babbage's Analytical Engine in 1843.",
  "The Voyager 1 spacecraft has less computing power than a modern car key fob, yet it is currently over 24 billion kilometers away from Earth.",
  "The '404 Not Found' error was named after room 404 at CERN, where the first web servers were located (though this is a popular tech urban legend).",
  "The first domain name ever registered was symbolics.com on March 15, 1985.",
  "In 1999, NASA lost the $125 million Mars Climate Orbiter because one engineering team used metric units while another used English units.",
  "The first mouse was made of wood; it was built by Doug Engelbart in 1964 and had only one button.",
  "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth, meaning if the Sun vanished, we wouldn't know for over 8 minutes.",
  "The term 'bug' in software comes from a literal moth that got stuck in a relay of the Harvard Mark II computer in 1947.",
  "The total weight of all the ants on Earth is roughly equal to the total weight of all the humans on Earth.",
  "If you unraveled all the DNA in your body, it would span 34 billion miles — reaching far beyond the orbit of Pluto and back.",
  "The 'save' icon in most software is a floppy disk, a piece of hardware that most Gen Z users have never seen in person.",
  "The Apollo 11 guidance computer, which landed humans on the Moon, ran at a frequency of about 1.024 MHz — thousands of times slower than a modern calculator.",
  "A neutron star is so dense that a single teaspoon of its material would weigh about 6 billion tons.",
  "The original name of Google was 'Backrub', named for its ability to analyze back-links to determine the importance of a website.",
  "The first ever photo uploaded to the web was a picture of the band 'Les Horribles Cernettes', a parody group founded by employees at CERN.",
  "There are more possible iterations of a game of chess than there are atoms in the observable universe (the Shannon number).",
  "Linux powers 100% of the world's top 500 fastest supercomputers.",
  "The password for the computer controls of nuclear-tipped missiles in the US was '00000000' for eight years during the Cold War.",
  "Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "The first recorded use of electricity in a modern context was by Alessandro Volta with the voltaic pile in 1800.",
  "The concept of Object-Oriented Programming (OOP) was heavily influenced by Simula, which predates C++.",
  "The Internet of Things (IoT) revolution is largely dependent on IPv6, as IPv4 addresses are almost exhausted.",
  "The SHA-256 hashing algorithm is foundational to Bitcoin's security, providing a unique digital fingerprint for data.",
  "JavaScript was initially created for Netscape to embed dynamic content in web pages, not for general-purpose computation.",
  "The term 'cloud computing' generally refers to processing power and storage delivered over the internet, rather than literal clouds.",
  "Early robotics often relied on vacuum tubes; modern microcontrollers use transistors, which are vastly smaller and more energy-efficient.",
  "Quantum computing aims to solve problems intractable for classical computers by utilizing qubits, which can represent 0, 1, and both simultaneously.",
  "Machine learning algorithms often require massive, labeled datasets (the 'data problem') before they can be effectively trained.",
  "WebAssembly (Wasm) allows code written in languages like C++, Rust, and Go to run in web browsers at near-native speed.",
  "Edge computing brings data processing closer to the physical source (like IoT sensors) to reduce latency and bandwidth strain.",
  "The JSON (JavaScript Object Notation) format became the universal standard for data exchange on the modern web due to its simplicity and human readability.",
  "Git, the distributed version control system, fundamentally changed how collaborative software development is managed.",
];

function LoaderScreen() {
  const loadMachine = useLoadMachine();
  const [exitAnimationIsPlaying, setExitAnimationIsPlaying] = useState(false);
  const [enterAnimationIsPlaying, setEnterAnimationIsPlaying] = useState(false);
  const [fact, setFact] = useState("");

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obj = ref.current;
    if (!obj) return;

    document.getElementById("hidder")!.style.display = "none";

    // 1. FORCE HIDE if we already finished the flow in the past
    if (
      loadMachine.loadedBefore &&
      !loadMachine.isAppBlocking &&
      !exitAnimationIsPlaying
    ) {
      obj.style.display = "none";
      return;
    }

    // 2. EXIT ANIMATION LOGIC
    // If the store says we should exit, and we aren't already doing it:
    if (loadMachine.shouldAnimateExit && !exitAnimationIsPlaying) {
      // eslint-disable-next-line react-hooks/set-state-in-effect

      animate(obj, {
        opacity: [1, 0], // Using array syntax for clarity
        duration: 800,
        easing: "easeInOutQuad",
        onBegin: () => {
          setExitAnimationIsPlaying(true);

          obj.style.display = "flex";
        },
        onComplete: () => {
          obj.style.display = "none";
          setExitAnimationIsPlaying(false);
          // CRITICAL: Tell the store we are done so it flips loadedBefore to true
          loadMachine.exitAnimationClear();
        },
      });
    }

    // 3. ENTER ANIMATION LOGIC
    if (loadMachine.shouldAnimateEnter && !enterAnimationIsPlaying) {
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
  }, [
    loadMachine.shouldAnimateExit,
    loadMachine.shouldAnimateEnter,
    loadMachine.isAppBlocking,
  ]);

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
        interestingFacts[Math.floor(Math.random() * interestingFacts.length)],
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
