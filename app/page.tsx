"use client";

import { useState, useEffect } from "react";
import LoveLetter from "./components/LoveLetter";
import SnowEffect from "./components/SnowEffect";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const message = `Qué tal, espero que te haya gustado el detalle. Me parece que no es justo lo que querías, pero por lo menos es algo. Lamentablemente no pude entregartelo personalmente, pero me conformo con por lo menos verte y saludarte 😆.
  \nMis mejores deseos para ti y tu familia: que este nuevo año esté lleno de alegría, triunfos, superación, éxitos, wins y, por qué no, de chamba también, para que no falten los COD Points.
  \nLo siguiente no se como expressarlo sin sonar muy cliché o cursi 😅, pero quisiera decirte que la paso bien chévere contigo cuando jugamos. Tienes buena vibra, o al menos eso es lo que percibo. Si estás libre y no te incomoda, quisiera acercarme un poco más a ti. Aunque soy penoso, no muy bueno en COD, pero por lo menos me defiendo, jeje..
  \nSin mas me despido, que disfrutes tu regalo y espero tu respuesta de que te pareció ☺️. 
  \nUn abrazo enorme 🤗.
  `;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 2.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="heart-loader">
          ⭐
        </div>
        <style jsx>{`
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            height: 100dvh;
            flex-direction: column;
            gap: 20px;
            position: relative;
            overflow: hidden;
          }
          .heart-loader {
            font-size: 5rem;
            color: #ff1744;
            animation: pulse 1s infinite alternate;
            z-index: 10;
            will-change: transform;
          }
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.6; }
            100% { transform: scale(1.4); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main style={{ position: "relative" }}>
      <MusicPlayer />
      <LoveLetter
        to="Ana"
        from="Erick"
        message={message}
      />
    </main>
  );
}
