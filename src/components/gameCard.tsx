import './gameCard.sass'
import CourtsideImage from '../assets/court-side.png';
import { HeaderCounter } from './headerCounter';
import GameInformation from './gameCard/GameInformation';

function GameCard() {
  return (
    <>
      <div className="game-card">
            <div className='game-card__header'>
                <div className='game-card__logo'>
                    <img src={CourtsideImage} />
                    <span>Courtside</span>
                </div>

                <HeaderCounter />

                <span className='game-card__username'>
                    Rahul Sheth
                </span>
            </div>

            <div className='game-card__content'>
                <GameInformation />
            </div>
        </div>
    </>
  )
}

export default GameCard
