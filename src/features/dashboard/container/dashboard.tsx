import { FC } from 'react';
import CityWeather from '../component/cityWeather';

const Dashboard: FC = () => {
	return (
		<div className='dashboard-wrapper'>
			<CityWeather />
		</div>
	);
};

export default Dashboard;
