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
			// `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
			HttpService.get(
				`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${'vadodara'}&days=7&aqi=yes&alerts=yes`
			)
				.then((data) => {
					// console.log('🚀 ~ file: dailyForeCast.tsx:32 ~ .then ~ data:', data);
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
