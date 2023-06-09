import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { IHourlyData } from '../interface/dashboard.interface';
import Spinner from 'shared/components/spinner/spinner';

interface IDailyProps {
	isLoading: boolean;
	isError: boolean;
	hourlyData: IHourlyData[];
}

const DailyForeCast: FC<IDailyProps> = ({ hourlyData, isLoading, isError }) => {
	const graphOptions: Record<string, any> = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Hourly Forecast Weather Update'
			}
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true
				},
				type: 'category',
				grid: {
					drawBorder: true, // Hide the border of the x-axis grid lines
					drawOnChartArea: false // Show the x-axis grid lines only between the axes
				}
			},
			y: {
				display: true,
				title: {
					display: true
				},
				beginAtZero: true,
				grid: {
					drawBorder: true, // Hide the border of the y-axis grid lines
					drawOnChartArea: false // Show the y-axis grid lines only between the axes
				}
			}
		}
	};

	const convertedLabel: string[] = [];
	const temperatureDataset: number[] = [];
	const humidityDataset: number[] = [];
	const windDataset: number[] = [];

	hourlyData.length > 0 &&
		hourlyData.forEach((data) => {
			const time = data.time.split(' ')[1].substr(0, 2);
			convertedLabel.push(time);
			temperatureDataset.push(data.temp_c);
			humidityDataset.push(data.humidity);
			windDataset.push(data.wind_kph);
		});

	const finalData = {
		labels: convertedLabel,
		datasets: [
			{
				label: 'Temperature(°C)',
				data: temperatureDataset,
				backgroundColor: 'Blue',
				borderColor: 'Blue',
				borderWidth: 2
			},
			{
				label: 'Humidity',
				data: humidityDataset,
				backgroundColor: 'green',
				borderColor: 'green',
				borderWidth: 2
			},
			{
				label: 'Wind(kph)',
				data: windDataset,
				backgroundColor: 'Red',
				borderColor: 'Red',
				borderWidth: 2
			}
		]
	};
	return (
		<div className='chart-wrapper border-radius--lg'>
			{hourlyData.length > 0 && (
				<Line
					style={{ width: '850', height: '400px' }}
					className='m--0-auto'
					data={finalData}
					options={graphOptions}
				/>
			)}
			{isLoading && !isError && (
				<div className='display-flex-center height--full'>
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default DailyForeCast;
