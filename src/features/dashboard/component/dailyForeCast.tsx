import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const DailyForeCast: FC<{ hourlyData: any[] }> = ({ hourlyData }) => {
	const graphOptions = {
		responsive: true,
		scales: {
			x: {
				type: 'category',
				grid: {
					drawBorder: true, // Hide the border of the x-axis grid lines
					drawOnChartArea: true // Show the x-axis grid lines only between the axes
				}
			},
			y: {
				beginAtZero: true,
				grid: {
					drawBorder: true, // Hide the border of the y-axis grid lines
					drawOnChartArea: true // Show the y-axis grid lines only between the axes
				}
			}
		},
		tooltips: {
			callbacks: {
				title: (tooltipItem: any) => {
					console.log('tooltipItem', tooltipItem);
					// Modify the title of the tooltip
					// tooltipItem is an array containing tooltip item(s)
					// For example, if you want to show the date as the tooltip title:
					return tooltipItem[0].label;
				},
				label: (tooltipItem: any) => {
					// Modify the label(s) of the tooltip
					// tooltipItem is an object containing tooltip data
					// For example, if you want to show the temperature as the tooltip label:
					return 'Temperature: ' + tooltipItem.value;
				}
				// You can add more callback functions to customize other tooltip elements
			}
		}
	};

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const convertedData = hourlyData.map((data) => {
		const time = data.time.split(' ')[1].substr(0, 2);
		return {
			label: time,
			data: [
				{ x: time, y: data.temp_c },
				// { x: time, y: data.temp_f }
				{ x: time, y: data.wind_mph }
			],
			backgroundColor: 'transparent',
			borderColor: getRandomColor(),
			borderWidth: 2
		};
	});
	return (
		<div className='chart-wrapper border-radius--lg'>
			<Line
				style={{ width: '100%', height: '300px' }}
				className='m--0-auto'
				data={{ datasets: convertedData }}
				options={graphOptions as any}
			/>
		</div>
	);
};

export default DailyForeCast;
