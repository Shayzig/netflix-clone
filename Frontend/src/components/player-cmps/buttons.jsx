import buttonStyles from "../../player-styles/button.module.css";
import tooltipStyles from "../../player-styles/tooltip.module.css";

import { PlayButton, Tooltip, useMediaState } from "@vidstack/react";
import { PauseIcon, PlayIcon } from "@vidstack/react/icons";

export function Play({ tooltipPlacement }) {
  const isPaused = useMediaState("paused");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={`play-button ${buttonStyles.button}`}>
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipStyles.tooltip}
        placement={tooltipPlacement}
      >
        {isPaused ? "Play" : "Pause"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
