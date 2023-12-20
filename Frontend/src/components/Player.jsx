import "@vidstack/react/player/styles/base.css";

import styles from "./player-cmps/player.module.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";

import { VideoLayout } from "../components/player-cmps/layouts/video-layout";
import { useSelector } from "react-redux";

export default function Player({ movieTrailer, isMuted = true }) {
  const mobileMode = useSelector((state) => state.userModule.mobileMode);
  return (
    <MediaPlayer
      className={`${styles.player} player`}
      src={movieTrailer}
      crossorigin
      autoplay
      muted={isMuted}
      playsinline
      onEnded={() => onEndedTrailer(null)}
    >
      <MediaProvider />
      {mobileMode && <VideoLayout />}
    </MediaPlayer>
  );
}
