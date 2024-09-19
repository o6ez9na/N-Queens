
//Компонент прорисовки
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, title, color }) => {
    const chartData = {
      labels: data.map((_, index) => index + 1),
      datasets: [
        {
          label: title,
          data: data,
          borderColor: color,
          fill: false,
          tension: 0.1
        }
      ]
    };
  
    return (
      <div className="chart">
        <Line data={chartData} />
      </div>
    );
  };

  export default ChartComponent;