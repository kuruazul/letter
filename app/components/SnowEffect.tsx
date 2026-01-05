"use client";

import { useEffect, useState } from "react";
import styles from "./SnowEffect.module.css";

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generar un número de copos de nieve
    const count = 50;
    const flakes = Array.from({ length: count }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div className={styles.snowContainer}>
      {snowflakes.map((i) => {
        const left = Math.random() * 100 + "%";
        const duration = Math.random() * 5 + 5 + "s"; // Entre 5 y 10s
        const delay = Math.random() * 5 + "s";
        const size = Math.random() * 1.5 + 0.5 + "rem";

        return (
          <div
            key={i}
            className={styles.snowflake}
            style={{
              left: left,
              animationDuration: duration,
              animationDelay: delay,
              fontSize: size,
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
}
