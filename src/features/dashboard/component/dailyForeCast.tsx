import { FC, useEffect, useState } from 'react';
import HttpService from 'shared/services/http.service';

const DailyForeCast: FC = () => {
	const API_KEY = process.env.REACT_APP_API_KEY;

	const [isLoading, setIsLoading] = useState(false);
	const [foreCastData, setForeCastData] = useState({});
	const [position, setPosition] = useState({
		latitude: 0,
		longitude: 0
	});

	const locationPosition = () => {
		navigator.geolocation.getCurrentPosition(function (position: any) {
			const { latitude, longitude } = position.coords;
			setPosition({
				latitude,
				longitude
			});
		});
	};
	const fetchDailyWeatherData = () => {
		setIsLoading(true);
		const { latitude, longitude } = position;
		if (latitude > 0 && longitude > 0) {
			HttpService.get(
				`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log('🚀 ~ file: dailyForeCast.tsx:32 ~ .then ~ data:', data);
				})
				.catch((error) => console.error(error));
		}
	};

	useEffect(() => {
		locationPosition();
		fetchDailyWeatherData();
	}, [position.latitude, position.longitude]);

	return <div></div>;
};

export default DailyForeCast;
