import useGameStore from '../../store/gameStore'
import { useEffect, useState } from 'react';
import './GameInformation.sass'
import InformationCounter from './InformationCounter'
import PointsCounter from './PointsCounter'
import StatsCharts from './StatsChart'

function GameInformation() {

  const [streak, setStreak] = useState(0);
  const [currentFG, setCurrentFG] = useState(0);
  const [currentShotAttempt, setCurrentShotAttempt] = useState(0);

  const shotsAttempted = useGameStore((state) => state.gameInformation['Shots attemps']);
  const shotsMade = useGameStore((state) => state.gameInformation['Shots Made']);
  const shotsMissed = useGameStore((state) => state.gameInformation['Shots Missed']);

  const FG = useGameStore((state) => state.gameInformation.FG);

  useEffect(() => {
    if(currentShotAttempt < shotsAttempted) {
      console.log(`FG: last - ${currentFG} & total - ${FG}`)

      if(currentFG < FG || FG === 100) {
        console.log(`add streak`);
        setStreak(streak + 1);
      } else {
        console.log(`remove streak`);
        setStreak(0);
      }

      setCurrentFG(FG);
    }

    setCurrentShotAttempt(shotsAttempted);
  }, [FG, shotsAttempted, shotsMade, shotsMissed])

  return (
    <>
        <div className="game-information">
                <PointsCounter />

                <div className="game-information__stats">
                  <InformationCounter text={'Shots Attempted'} value={shotsAttempted}/>
                  <InformationCounter text={'Shots Made'} value={shotsMade}/>
                  <InformationCounter text={'Shots Missed'} value={shotsMissed}/>
                </div>

                <div className="game-information__charts">
                  <StatsCharts description="FG%" title={FG.toFixed(2)} series={[shotsMade, shotsAttempted - shotsMade]}/>
                  <StatsCharts description="Streak" title={streak.toFixed(0)} series={[streak, 4 - streak]}/>
                </div>
        </div>
    </>
  )
}

export default GameInformation
