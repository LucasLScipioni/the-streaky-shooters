import './App.sass'
import GameCard from './components/gameCard'

function App() {
  return (
    <>
      <div className="streaky-shooter">
        <div className='streaky-shooter__sidebar'>
          <span>The Streaky Shooter</span>
        </div>
        <div className="streaky-shooter__content">
          <GameCard />
        </div>
      </div>
    </>
  )
}

export default App
