import Chart from "react-apexcharts";
import './StatsChart.sass';

export const options: any = {
  chart: {
    width: 380,
    type: 'donut',
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

interface StatsChartsProps {
  title: string,
  description: string,
  series?: number[],
}

const StatsCharts: React.FC<StatsChartsProps> = ({description, title, series}) => {
  return (
    <div className="stats-chart">
      <Chart options={options} series={series} type="donut" width={300}/>
      <span className="stats-chart__title">{title}</span>
      <span className="stats-chart__description">{description}</span>
    </div>
  );
}

export default StatsCharts;