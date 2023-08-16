import './GameInformation.sass'
import InformationCounter from './InformationCounter'
import PointsCounter from './PointsCounter'
import StatsCharts from './StatsChart'

function GameInformation() {
  return (
    <>
        <div className="game-information">
                <PointsCounter />

                <div className="game-information__stats">
                  <InformationCounter text={'Shots Attempted'} />
                  <InformationCounter text={'Shots Made'} />
                  <InformationCounter text={'Shots Missed'} />
                </div>

                <div className="game-information__charts">
                  <StatsCharts description="FG%" title="72"/>
                  <StatsCharts description="Streak" title="2"/>
                </div>
        </div>
    </>
  )
}

export default GameInformation
