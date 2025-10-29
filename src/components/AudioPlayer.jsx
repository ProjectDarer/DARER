import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Handles auto-playing background music if '?music=true' is present in the URL.
 * Requires an audio element in the parent component.
 */
const AudioPlayer = ({ audioId, src }) => {
  const [searchParams] = useSearchParams();
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if the music parameter is present and true
    if (searchParams.get("music") === "true" && audioRef.current) {
      const audio = audioRef.current;
      
      // Attempt to play music
      audio.play().catch(() => {
        // Autoplay prevented, add click listener to play on first user interaction
        const playOnInteraction = () => {
          audio.play().catch(e => console.log("Music play still prevented:", e));
          document.body.removeEventListener("click", playOnInteraction);
        };
        document.body.addEventListener("click", playOnInteraction, { once: true });
        console.log("Autoplay prevented, music will play on first click.");
      });
    }
  }, [searchParams]);

  return (
    <audio ref={audioRef} id={audioId} src={src} autoPlay loop muted={false /* Start muted=false for immediate attempt */} style={{ display: 'none' }} />
  );
};

export default AudioPlayer;