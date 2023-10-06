import './Animations.sass';
import classNames from 'classnames';
import StartCountdown from './components/StartCountdown';
import useGameStore from '../store/gameStore';
import GameAnimations from './components/GameAnimations';
import { useState, useEffect } from 'react';

function Animations() {

  const isGameOnCountdown = useGameStore((state) => state.isGameOnCountdown);
  const isGameRunning = useGameStore((state) => state.isGameRunning);
  const isGameFinished = useGameStore((state) => state.isGameFinished);

  const [streak, setStreak] = useState(0);
  const [currentFG, setCurrentFG] = useState(0);
  const [currentShotAttempt, setCurrentShotAttempt] = useState(0);

  const shotsAttempted = useGameStore((state) => state.gameInformation['Shots attemps']);

  const FG = useGameStore((state) => state.gameInformation.FG);

  useEffect(() => {
    if(currentShotAttempt < shotsAttempted) {

      if(currentFG < FG || FG === 100) {
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }

      setCurrentFG(FG);
    }

    setCurrentShotAttempt(shotsAttempted);
  }, [FG, shotsAttempted, currentFG, currentShotAttempt, streak])

  const animationsClass = classNames({
    'streaky-shooters-animations': true,
    'streaky-shooters-animations__missed': shotsAttempted > 0 && streak === 0,
    'streaky-shooters-animations__countdown': isGameOnCountdown || isGameFinished
  })

  return (
    <>
      <div className={animationsClass}>
        <div className="streaky-shooters-animations__canvas">
          { isGameRunning && !isGameFinished && <GameAnimations /> }
          { !isGameRunning && !isGameFinished && <StartCountdown /> }
          { isGameFinished && <div className="streaky-shooters-animations__finished">Game Over</div>}
        </div>
      </div>
    </>
  )
}

export default Animations
