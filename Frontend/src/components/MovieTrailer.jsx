import React, { useEffect, useState } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { useMediaRemote } from "@vidstack/react";

const MovieTrailer = ({ movieTrailer, onEndedTrailer, isMuted = true }) => {
  // const remote = useMediaRemote();
  // remote.setTarget(eventTarget);

  // const [isAutoPlay, setisAutoPlay] = useState(true);
  // const isMobile = window.innerWidth <= 767;
  // remote.lockScreenOrientation("landscape", isMobile);

  useEffect(() => {
    // setisAutoPlay(true);
  }, []);

  if (!movieTrailer) {
    return <h2>loading</h2>;
  } else {
    return (
      <div className="video">
        <MediaPlayer
          playsinline
          // key={movieTrailer}
          src={movieTrailer}
          autoplay
          aspectRatio="16/9"
          muted={isMuted}
          onEnded={() => onEndedTrailer(null)}
        >
          <MediaProvider />
        </MediaPlayer>
      </div>
    );
  }
};

export default MovieTrailer;
