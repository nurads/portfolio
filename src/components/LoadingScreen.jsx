import { useEffect, useState } from "react";
import { Loading } from "@carbon/react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<Hello World />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-screen__inner">
        <p
          className="loading-screen__text"
          style={{ minWidth: `${fullText.length + 1}ch` }}
        >
          {text}
          <span className="animate-blink">_</span>
        </p>
        <Loading active small withOverlay={false} description="Loading" />
      </div>
    </div>
  );
};
