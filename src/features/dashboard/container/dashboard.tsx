import { FC } from 'react';
import CityWeather from '../component/cityWeather';

const Dashboard: FC = () => {
	return (
		<div className='dashboard-wrapper'>
			<h1 className='title text--center'>Weather App</h1>
			<CityWeather />
		</div>
	);
};

export default Dashboard;
