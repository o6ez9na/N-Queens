
//Компонент прорисовки
import { Line } from 'react-chartjs-2';

const CombinedChart = ({ tempHistory, errorHistory, bestEnergyHistory }) => {
  const data = {
    labels: tempHistory.map((_, index) => index + 1), // Используйте индекс для оси X
    datasets: [
      {
        label: 'Температура',
        data: tempHistory,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Ошибки',
        data: errorHistory,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Лучшая энергия',
        data: bestEnergyHistory,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Итерации',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Значение',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CombinedChart;