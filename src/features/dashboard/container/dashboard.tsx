import React, { FC } from 'react';
import CityWeather from '../component/cityWeather';
import DailyForeCast from '../component/dailyForeCast';

const Dashboard: FC = () => {
	return (
		<div className='dashboard-wrapper'>
			<h1 className='title text--center'>Weather App</h1>
			<CityWeather />
			<DailyForeCast />
		</div>
	);
};

export default Dashboard;
