import './IntroCard.sass'
import CourtsideImage from '../assets/court-side.png';
import useGameStore from '../store/gameStore';
import { useState, useEffect } from 'react';

function IntroCard() {
  
  const gameStore = useGameStore();

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    gameStore.resetGame();
  }, []);

  return (
    <>
      <div className="intro-card">
        <div className="intro-card__header">
          <img className="intro-card__header-image" src={CourtsideImage} />
          <span className="intro-card__header-title">Courtside</span>
          <span className="intro-card__header-description">
            Courtside is the first basketball-themed entertainment venue powered by cutting-edge AI technology to track and analyze players' performance in real-time to create a unique and immersive experience for guests. Imagine a state-of-the-art facility that seamlessly combines the thrill of basketball with the social of Topgolf.
          </span>
        </div>
        <div className="intro-card__content">
          <div className="intro-card__rules">
            <span className="intro-card__rules-title">The Streaky Shooter</span>
            <span className="intro-card__rules-description">Players compete in this addictive game to make the most shots and score the most points in a 24s shot clock.</span>
            <span className="intro-card__rules-intro">Rules</span>
            
            <div className="intro-card__rules-list">
              <span>Designed to reward the streaky.</span>
              <ul>
                <li>0 pts for ALL missed shots</li>
                <li>1 pt for 1 made shot</li>
                <li>2 pts for 2 made shots in a row</li>
                <li>3 pts for 3 made shots in a row</li>
                <li>You get the point.</li>
              </ul>
            </div>
          </div>

          <input className="intro-card__input" value={playerName} onChange={(e) => setPlayerName(e.target.value)} type="text" placeholder='Please enter name' />

          <button className="intro-card__button" onClick={() => gameStore.setPlayerName(playerName)}>Run it</button>
        </div>
      </div>
    </>
  )
}

export default IntroCard
