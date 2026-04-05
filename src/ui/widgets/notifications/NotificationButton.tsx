import useNotification from "@/hooks/notification/useNotification";
import { Button } from "@/ui/button";
import { animate, createTimeline } from "animejs";
import { Bell } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import NotificationSheet from "./NotificationSheet";
import { trace } from "mobx";

function NotificationButton() {
  trace();
  const nt = useNotification();
  const [AnimationIsPlaying, setAnimationIsPlaying] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    console.log("Store id:", nt.store.id);

    if (nt.store.shouldPlayAnimation && !AnimationIsPlaying) {
      const timeline = createTimeline({
        onBegin: () => {
          setAnimationIsPlaying(true);
        },
        onComplete: () => {
          setAnimationIsPlaying(false);
          nt.animationPlayed();
        },
      });

      timeline.add(ref.current, {
        rotate: [0, 20, -20, 10, -10, 0],
        duration: 500,
        easing: "easeInOutQuad",
      });

      timeline.play();
    }
  }, [AnimationIsPlaying, nt.shouldPlayAnimation, nt.store.id]);

  return (
    <NotificationSheet>
      <div className="w-12 h-12 bg-background flex justify-center items-center rounded-full hover:bg-accent">
        <Bell ref={ref} className="w-5 h-5" />
        {nt.haveUnreadedNotifications ? (
          <div className="absolute w-2 h-2 rounded-full bg-chart-1 mb-3 ml-3"></div>
        ) : null}
      </div>
    </NotificationSheet>
  );
}

export default observer(NotificationButton);
