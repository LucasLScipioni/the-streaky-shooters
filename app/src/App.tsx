import './App.sass'
import GameCard from './components/gameCard'
import IntroCard from './components/IntroCard'
import useGameStore from './store/gameStore'

function App() {

  const playerName = useGameStore((state) => state.playerName);

  return (
    <>
      <div className="streaky-shooter">
        <div className='streaky-shooter__sidebar'>
          <span>The Streaky Shooter</span>
        </div>
        <div className="streaky-shooter__content">
          { !playerName && <IntroCard />}
          { playerName && <GameCard />}
        </div>
      </div>
    </>
  )
}

export default App
