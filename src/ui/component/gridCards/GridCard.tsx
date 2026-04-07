import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { animate } from "animejs";
import { useCallback, useEffect, useRef, useState } from "react";

function GridCard({ name }: { name: string }) {
  const [Rendered, setRendered] = useState(false);
  const [IsAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const content = useRef<HTMLDivElement>(null);

  const ref = useCallback(
    (obj: HTMLDivElement) => {
      if (IsAnimationPlaying || !obj) return;
      obj.style.transform = "translate(0px, 0px)";
      content.current = obj;
    },
    [IsAnimationPlaying],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRendered(true);
  }, []);

  useEffect(() => {
    if (content.current) {
      animate(content.current, {
        y: [-100, 0],
        ease: "inOutQuart",
        duration: 300,
        onBegin: () => {
          setIsAnimationPlaying(true);
        },
        onComplete: () => {
          setIsAnimationPlaying(false);
        },
      });
    }

    return () => {
      if (content.current && Rendered) {
        animate(content.current, {
          y: [0, -100],
          ease: "inOutQuart",
          duration: 300,
          onBegin: () => {
            setIsAnimationPlaying(true);
          },
          onComplete: () => {
            setIsAnimationPlaying(false);
            setRendered(false);
          },
        });
      }
    };
  }, [Rendered]);

  if (!Rendered) return null;

  return (
    <div ref={ref}>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>{/* ...content of the GridCard */}</CardContent>
      </Card>
    </div>
  );
}

export default GridCard;
