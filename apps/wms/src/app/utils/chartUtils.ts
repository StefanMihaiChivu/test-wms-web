const documentStyle = getComputedStyle(document.documentElement);

export const getDefaultPieChartPlugins = () => ({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        fontSize: 20,
        color: documentStyle.getPropertyValue('--text-color'),
      },
    },
  },
});

export const populateChart = (labels: any, data: any) => {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        hoverOffset: 20,
        backgroundColor: [
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--yellow-500'),
          documentStyle.getPropertyValue('--green-500'),
          documentStyle.getPropertyValue('--red-500'),
          documentStyle.getPropertyValue('--gray-500'),
          documentStyle.getPropertyValue('--cyan-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--blue-400'),
          documentStyle.getPropertyValue('--yellow-400'),
          documentStyle.getPropertyValue('--green-400'),
          documentStyle.getPropertyValue('--red-400'),
          documentStyle.getPropertyValue('--gray-400'),
          documentStyle.getPropertyValue('--cyan-400'),
        ],
      },
    ],
  };
}
