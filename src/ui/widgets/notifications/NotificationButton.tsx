import useNotification from "@/hooks/notification/useNotification.hook";
import { Button } from "@/ui/button";
import { Bell } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import NotificationSheet from "./NotificationSheet";
import { trace } from "mobx";
import { useAnimate } from "motion/react";

function NotificationButton() {
  const nt = useNotification();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    console.log(nt);
    if (nt.shouldPlayAnimation)
      animate(
        scope.current,
        {
          rotate: [-20, 18, -16, 14, -12, 10, -8, 6, -4, 2, 0],
        },
        {
          duration: 1.5,
          ease: "easeInOut",
          onComplete: () => nt.animationPlayed(),
        },
      );
  }, [nt.shouldPlayAnimation, animate, scope]);

  return (
    <NotificationSheet>
      <div className="w-12 h-12 bg-background flex justify-center items-center rounded-full hover:bg-accent">
        <Bell ref={scope} className="w-5 h-5" />
        {nt.haveUnreadedNotifications ? (
          <div className="absolute w-2 h-2 rounded-full bg-chart-1 mb-3 ml-3"></div>
        ) : null}
      </div>
    </NotificationSheet>
  );
}

export default observer(NotificationButton);
