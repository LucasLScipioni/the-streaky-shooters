import './GameAnimations.sass'
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useGameStore from '../../store/gameStore';

function GameAnimations() {
  const [animate, setAnimate] = useState(false);

  const [streak, setStreak] = useState(0);
  const [currentFG, setCurrentFG] = useState(0);
  const [currentShotAttempt, setCurrentShotAttempt] = useState(0);

  const shotsAttempted = useGameStore((state) => state.gameInformation['Shots attemps']);
  const shotsMade = useGameStore((state) => state.gameInformation['Shots Made']);
  const shotsMissed = useGameStore((state) => state.gameInformation['Shots Missed']);

  const FG = useGameStore((state) => state.gameInformation.FG);

  useEffect(() => {
    if(currentShotAttempt < shotsAttempted) {
      if(currentFG < FG || FG === 100) {
          const audio = new Audio('./public/sounds/score.wav');
          audio.play();
        setStreak(streak + 1);
      } else {
          const audio = new Audio('./public/sounds/score.wav');
          audio.play();
        setStreak(0);
      }

      setCurrentFG(FG);
    }

    setCurrentShotAttempt(shotsAttempted);
  }, [FG, shotsAttempted, shotsMade, shotsMissed, currentFG, currentShotAttempt, streak])

  const springTitleProps = useSpring({
    from: { transform: 'scale(1.2)', opacity: 1 },
    to: {
      transform: animate ? 'scale(1)' : 'scale(1.2)',
      opacity: animate ? 1 : 1,
    },
    config: animate ? { tension: 100, friction: 20 } : { tension: 3000, friction: 20, clamp: true },
  });

  const springProps = useSpring({
    from: { transform: 'scale(1.5) translateX(100px) rotate(320deg)', opacity: 1 },
    to: {
      transform: animate ? 'scale(1) translateX(0) rotate(360deg)' : 'scale(1.5) translateX(100px) rotate(340deg)',
      opacity: animate ? 1 : 1,
    },
    config: animate ? { tension: 100, friction: 20 } : { tension: 3000, friction: 20, clamp: true },
  });

  useEffect(() => {
    setAnimate(false);

    setTimeout(() => {
      setAnimate(true);
    }, 100)
  }, [streak])

  const shotWrapperClass = classNames({
    'game-animations__shot-wrapper': true,
    'game-animations__shot-wrapper-hot': streak >= 5
  })

  const streakClass = classNames({
    'game-animations__streak': true,
    'game-animations__streak-hot': streak >= 5
  })

  return (
    <>
      <div className={shotWrapperClass}>
        <span className="game-animations__shot">Shot</span>
        {/* <animated.div style={springTitleProps} className="animations__shot">  
          <span>Shot</span>
        </animated.div> */}
        <animated.div style={springTitleProps} className="game-animations__status">  
          <span>{ shotsAttempted > 0 && streak === 0 ? 'Missed' : 'Made'}</span>
        </animated.div>
      </div>
      <animated.div style={springProps} className={streakClass}>
        <span>{`${streak > 0 ? "+" : ""}${streak}`}</span>
      </animated.div>
    </>
  )
}

export default GameAnimations
