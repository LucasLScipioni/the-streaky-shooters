import './StartCountdown.sass'
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import useGameStore from '../../store/gameStore';

function StartCountdown() {
    const [animateCounter, setanimateCounter] = useState(true);
    const [animateTitle, setanimateTitle] = useState(true);
    const [counter, setCounter] = useState(10);


    const gameStore = useGameStore();
    const isGameOnCountdown = useGameStore((state) => state.isGameOnCountdown);

    const InitiateCountdown = () => {
        gameStore.toogleCountdown(true);

        /* const audio = new Audio('./public/sounds/countdown_bg2.wav');
        audio.play(); */
    
        countdown(10000);
    };

    const countdown = (elapsedTime: number) => {
        setTimeout(() => {
            const newElapsedTime = elapsedTime - 10;

            if(newElapsedTime % 1000 >= 500) {
                setanimateCounter(true);
            }

            if(newElapsedTime % 1000 < 50) {
                setanimateCounter(false);
                if(elapsedTime < 1000) {
                    setanimateTitle(false);
                }
            }

            if(newElapsedTime % 1000 === 0) {
                if(newElapsedTime <= 0){
                    const audio = new Audio('./public/sounds/buzzer.wav');
                    audio.play();
                } else {
                    const audio = new Audio('./public/sounds/beep.wav');
                    audio.play();
                }
            }

            setCounter(+(newElapsedTime / 1000).toString()[0] + 1);

            if (newElapsedTime <= 0) {
                setCounter(0);

                gameStore.toogleCountdown(false);
                setTimeout(() => {
                    gameStore.startGame();
                }, 1000)
                return;
            }

            countdown(newElapsedTime);
        }, 10);
    }

    const countdownProps = useSpring({
        from: { transform: 'scale(1.2)', opacity: 0 },
        to: {
            transform: animateCounter ? 'scale(1)' : 'scale(1.2)',
            opacity: animateCounter ? 1 : 0,
        },
        config: animateCounter ? { tension: 100, friction: 20 } : { tension: 100000, friction: 20, clamp: true },
    });

    const titleProps = useSpring({
        from: { transform: 'scale(1.2)', opacity: 0 },
        to: {
            transform: animateTitle ? 'scale(1)' : 'scale(1.2)',
            opacity: animateTitle ? 1 : 0,
        },
        config: animateTitle ? { tension: 100, friction: 20 } : { tension: 100000, friction: 20, clamp: true },
    });

    const counterFinishedProps = useSpring({
        from: { transform: 'scale(1)', opacity: 0 },
        to: {
            transform: 'scale(1.2)',
            opacity: 1,
        },
        config: { tension: 100, friction: 20 },
    });

    return (
        <>
        
            <div className="start-countdown">
            { isGameOnCountdown && counter > 0 && 
                <>
                    <animated.div style={titleProps}  className="start-countdown__title">  
                        <span>The Streaky Shooter</span>
                    </animated.div>
                    <animated.div style={countdownProps} className="start-countdown__counter">  
                        <span>{counter}</span>
                    </animated.div>
                </>
            }
            { counter <= 0 && 
                <animated.div style={counterFinishedProps} className="start-countdown__counter-finished">  
                    <span>Let's Ball!</span>
                </animated.div>
            }
            { 
                !isGameOnCountdown && counter > 0 && <div onClick={InitiateCountdown} className="start-countdown__start">
                    <span>Click to Start</span>
                </div> 
            }
            </div>
        </>
    )
}

export default StartCountdown
