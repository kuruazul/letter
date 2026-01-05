"use client";

import { useState } from "react";
import styles from "./Rose.module.css";

export default function Rose() {
  // Initial colors: mixed pinks for a natural rose look
  const [colors, setColors] = useState<string[]>([
    "#c2185b", "#c2185b", "#c2185b", "#c2185b", "#c2185b", "#c2185b"
  ]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handlePetalClick = (index: number) => {
    const newColors = [...colors];
    newColors[index] = getRandomColor();
    setColors(newColors);
  };

  return (
    <div className={styles.flowerContainer}>
      {colors.map((color, index) => {
        const rotation = index * 60;
        return (
          <div
            key={index}
            className={styles.petalWrapper}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div
              className={styles.petal}
              style={{
                backgroundColor: color,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePetalClick(index);
              }}
            />
          </div>
        );
      })}
      <div className={styles.center} />
    </div>
  );
}
