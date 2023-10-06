import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';
import './TimeCounter.sass';
import useGameStore from "../../store/gameStore";

export const options: any = {
  chart: {
    width: 380,
    type: 'pie',
    animations: {
      enabled: false,
      easing: 'easeinout',
      speed: 200,
      animateGradually: {
          enabled: true,
          delay: 200
      },
      dynamicAnimation: {
          enabled: true,
          speed: 200
      }
  }
  },
  legend: false,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  colors:['#980202', 'transparent'],
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0, 
  }
};

export function TimeCounter() {
  const isGameRunning = useGameStore((state) => state.isGameRunning);
  const [count, setCount] = useState(24);
  const [graphInfo, setGraphInfo] = useState([0, 1000]);

  const gameStore = useGameStore();

  useEffect(() => {
    if (isGameRunning) {
      countdown(24000);
    }
  }, [isGameRunning]);

  const countdown = (elapsedTime: number) => {
    setTimeout(() => {
      const newElapsedTime = elapsedTime - 10;

      setCount(Math.trunc(newElapsedTime / 1000));
      setGraphInfo([newElapsedTime % 1000, 1000 - (newElapsedTime % 1000)]);

      if(newElapsedTime % 1000 === 0 && newElapsedTime < 11000 && newElapsedTime > 0) {
        const audio = new Audio('./public/sounds/beep.wav');
        audio.play();
      }

      if (newElapsedTime <= 0) {
        const audio = new Audio('./public/sounds/buzzer.wav');
        audio.play();

        setTimeout(() => {
          const audio = new Audio('./public/sounds/applause.wav');
          audio.play();
        }, 500)

        gameStore.finishGame();
        setCount(24);
        setGraphInfo([1, 0]);
        return;
      }

      countdown(newElapsedTime);
    }, 10);
  }

  return (
    <div className="header-counter">
      <div className="header-counter__info">
        <span className="header-counter__seconds"><i>{count}</i></span>
        <span> sec </span>
      </div>
      <Chart options={options} series={graphInfo} type="pie" width={195} />
    </div>
  );
}