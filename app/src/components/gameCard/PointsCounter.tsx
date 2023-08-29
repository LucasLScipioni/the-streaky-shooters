
import useGameStore from '../../store/gameStore';
import './PointsCounter.sass'


function PointsCounter() {
  const pointsMade = useGameStore((state) => state.gameInformation['Shots Made'] * 2);

  return (
    <>
        <div className="points-counter">
            <span>Points Scored</span>
            <div className="points-counter__display">
                { pointsMade }
            </div>
        </div>
    </>
  )
}

export default PointsCounter
