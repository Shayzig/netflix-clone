import React, { useEffect, useState } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";

const MovieTrailer = ({ movieTrailer, onEndedTrailer, isMuted = true }) => {
  const [isAutoPlay, setisAutoPlay] = useState(false);

  useEffect(() => {
    setisAutoPlay(true);
  }, []);

  if (!movieTrailer) {
    return (
    <h2>loading</h2>
    );
  } else {
    return (
      <div className="video">
        <MediaPlayer
          key={movieTrailer} 
          src={movieTrailer}
          autoplay={isAutoPlay}
          controls={false}
          aspectRatio="16/9"
          muted={isMuted}
          onEnded={() => onEndedTrailer(null)}
        >
          <MediaProvider/>
        </MediaPlayer>
      </div>
    );
  }
};

export default MovieTrailer;
