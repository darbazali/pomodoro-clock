/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

const Audio = ({ audio }) => {
  return (
    <audio
      id="beep"
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ref={audio}
    />
  );
};

export default Audio;
