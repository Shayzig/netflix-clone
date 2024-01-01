import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { useSelector } from "react-redux";

const MovieTrailer = ({ movieTrailer, onEndedTrailer, isMuted = true }) => {
  const playTrailer = useSelector(
    (state) => state.movieModule.isMovieTrailerPlay
  );

  return (
    <div className="video">
      <MediaPlayer
        src={movieTrailer}
        paused={playTrailer}
        aspectRatio="16/9"
        muted={isMuted}
        onEnded={() => onEndedTrailer(null)}
      >
        <MediaProvider />
      </MediaPlayer>
    </div>
  );
};

export default MovieTrailer;
