"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./MusicPlayer.module.css";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Start at 50%
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Attempt aggressive auto-play on mount
    const playPromise = audioRef.current?.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay failed (expected in many browsers).
          // We attach a one-time listener to "unblock" the audio on the first interaction.
          const forcePlay = () => {
            // Remove listeners immediately to prevent multiple attempts
            document.removeEventListener('click', forcePlay);
            document.removeEventListener('touchend', forcePlay);
            document.removeEventListener('keydown', forcePlay);

            if (audioRef.current) {
              audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // If it still fails, we largely ignore it to prevent cluttering the console
                  // or showing errors to the user. The user can manually toggle play if needed.
                });
            }
          };

          // 'touchstart' often doesn't count as a user gesture for audio in strict browsers.
          // 'touchend' or 'click' is safer.
          document.addEventListener('click', forcePlay);
          document.addEventListener('touchend', forcePlay);
          document.addEventListener('keydown', forcePlay);
        });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src="/songs/background-theme.mp3" loop autoPlay />

      <div className={styles.controls}>
        <button className={styles.toggleButton} onClick={togglePlay} aria-label={isPlaying ? "Pause music" : "Play music"}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className={styles.volumeContainer}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.slider}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
