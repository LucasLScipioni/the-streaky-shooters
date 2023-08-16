import './App.sass'
import GameCard from './components/gameCard'
import BG from './assets/bg.jpg';

function App() {
  return (
    <>
      <div className="streaky-shooter" style={{background: `url(${BG}`, backgroundSize: 'cover'}} >
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
