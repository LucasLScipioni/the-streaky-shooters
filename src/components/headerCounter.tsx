import Chart from "react-apexcharts";
import './headerCounter.sass';

export const series = [100, 20];

export const options: any = {
  chart: {
    width: 380,
    type: 'pie',
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

export function HeaderCounter() {
  return (
    <div className="header-counter">
      <Chart options={options} series={series} type="pie" width={195}/>
    </div>
  );
}