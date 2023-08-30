import './gameCard.sass'
import CourtsideImage from '../assets/court-side.png';
import { TimeCounter } from './gameCard/TimeCounter';
import GameInformation from './gameCard/GameInformation';
import useGameStore from '../store/gameStore';
import { useEffect, useState } from 'react';

function GameCard() {

  const [updateOnce, setUpdateOnce] = useState(true);
  const gameStore = useGameStore();
  const playerName = useGameStore((state) => state.playerName);
  const selectedVideo = useGameStore((state) => state.gameInformation.selectedVideo);
  
  useEffect(() => {
    if(updateOnce) {
      setUpdateOnce(false);
      update();
    }
  }, [playerName]);

  const update = () => {
    gameStore.updateGame(true);

    setTimeout(() => {
      update()
    }, 1000);
  }

  return (
    <>
      <div className="game-card">
          <div className='game-card__header'>
              <div className='game-card__logo'>
                  <img src={CourtsideImage} />
                  <span>Courtside</span>
              </div>

              <div className='game-card__header-timer'>
                <TimeCounter />
              </div>

              <span className='game-card__username'>
                  {playerName}
              </span>
          </div>

          <div className='game-card__content'>
              <GameInformation />
          </div>

          {
            selectedVideo && 
            <div className='game-card__selected-video'>
              Video: {selectedVideo}
            </div>
          }
        </div>
    </>
  )
}

export default GameCard
