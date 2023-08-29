import './gameCard.sass'
import CourtsideImage from '../assets/court-side.png';
import { TimeCounter } from './gameCard/TimeCounter';
import GameInformation from './gameCard/GameInformation';
import useGameStore from '../store/gameStore';
import { useEffect } from 'react';

function GameCard() {

  const gameStore = useGameStore();
  const playerName = useGameStore((state) => state.playerName);
  const selectedVideo = useGameStore((state) => state.gameInformation.selectedVideo);

  useEffect(() => {
    gameStore.startGame()
  }, []);

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
