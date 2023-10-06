
import { useEffect, useState } from 'react';
import useGameStore from '../../store/gameStore';
import './PointsCounter.sass'


function PointsCounter() {
  const [count, setCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentFG, setCurrentFG] = useState(0);
  const [currentShotAttempt, setCurrentShotAttempt] = useState(0);

  const shotsAttempted = useGameStore((state) => state.gameInformation['Shots attemps']);

  const FG = useGameStore((state) => state.gameInformation.FG);

  useEffect(() => {
    if(currentShotAttempt < shotsAttempted) {

      if(currentFG < FG || FG === 100) {
        setCount(count + streak + 1);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }

      setCurrentFG(FG);
    }

    setCurrentShotAttempt(shotsAttempted);
  }, [FG, shotsAttempted, currentFG, currentShotAttempt, streak])

  return (
    <>
        <div className="points-counter">
            <span>Points Scored</span>
            <div className="points-counter__display">
                { count }
            </div>
        </div>
    </>
  )
}

export default PointsCounter
