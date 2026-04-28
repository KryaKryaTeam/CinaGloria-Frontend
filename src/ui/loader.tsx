import { Loader2 } from "lucide-react";
import { useAnimate } from "motion/react";
import { useEffect } from "react";

function Loader() {
  const [loaderScope, loaderAnimate] = useAnimate();
  useEffect(() => {
    loaderAnimate(
      loaderScope.current,
      { rotate: 360 },
      { duration: 3, repeat: Infinity, ease: "circInOut" },
    );
  });
  return <Loader2 ref={loaderScope} className="w-12 h-12" />;
}

export default Loader;
