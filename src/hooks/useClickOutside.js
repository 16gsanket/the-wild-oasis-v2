import { useEffect, useRef } from "react";

export function useClickOutside(handlerFunction , listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("clicked outside");
        handlerFunction();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [handlerFunction]);



  return ref;
}
