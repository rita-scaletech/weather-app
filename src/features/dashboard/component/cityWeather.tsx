import { FC, useEffect, useState } from 'react';

import Spinner from 'shared/components/spinner/spinner';
import HttpService from 'shared/services/http.service';
import { DownTemp, HighTemp } from 'shared/components/icons/icons';

import DailyForeCast from './dailyForeCast';

import SunImg from 'assets/images/sun.png';
import Humidity from 'assets/images/hygrometer.png';
import Wind from 'assets/images/wind.png';
import Pressure from 'assets/images/atmospheric-pressure.png';
import SmallSun from 'assets/images/sunny.png';
import Moon from 'assets/images/moon.png';
import SmileySun from 'assets/images/smiling-sun.png';

const CityWeather: FC = () => {
	const API_KEY = process.env.REACT_APP_API_KEY;
	console.log('window.cu', navigator.geolocation);

	const [city, setCity] = useState('Ahmedabad');
	const [weather, setWeather] = useState<Record<string, any>>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [hourlyData, setHourlyData] = useState([]);

	const fetchWeather = (event?: any) => {
		event && event.preventDefault();
		setIsLoading(true);

		HttpService.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=yes`)
			.then((data) => {
				setWeather(data);
				setHourlyData(data.forecast.forecastday[0].hour);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
				setIsError(true);
				console.log('error', error);
			});
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	return (
		<>
			<div className='header-wrapper flex justify-content--between align-items--center'>
				<div className='flex align-items--center'>
					<h1 className='title text--center text--black'>Forecast</h1>
					<img src={SmileySun} className='ml--10' alt='sun-img' />
				</div>
				<div className='flex flex--column'>
					<form
						className='search-box text--black font-size--lg font--semi-bold border-radius--lg'
						onSubmit={fetchWeather}
					>
						<input
							className='border-radius--lg bg--transparent'
							placeholder='City'
							onChange={(event) => setCity(event.target.value)}
						/>
						<button
							className='submit-btn border-radius--lg bg--black text--white font--bold cursor--pointer'
							type='submit'
						>
							Search
						</button>
					</form>
				</div>
			</div>
			{weather && !isLoading && (
				<div className='weather-details-wrapper flex'>
					<div className='weather-info border-radius--lg text--black'>
						<div className='weatherCondition flex flex--wrap flex--column'>
							<div>
								<h3>{weather.location.name}</h3>
								<p className='info-title'>
									country: <span className='font--regular'>{weather.location.country}</span>
								</p>
							</div>
							<div className='flex justify-content--between'>
								<div className='image-wrapper width--50'>
									<img
										src={weather.forecast.forecastday[0].day.condition.icon}
										className='width--50'
										alt='sun-img'
									/>
								</div>
								<div className='width--50'>
									<h1 className='font-size--60'>{weather.current.temp_c}°C</h1>
									<p className='info-title'>{weather.forecast.forecastday[0].day.condition.text}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='weather-info border-radius--lg text--black'>
						<p className='font-size--30 font--semi-bold mb--20 pl--20 pr--20'>Current Weather</p>
						<div className='weatherCondition flex justify-content--between'>
							<div className='width--50'>
								<div className='flex mb--20'>
									<p className='info-label'>
										humidity :
										<span className='text--black mr--10 ml--5'>{weather.current.humidity} %</span>
									</p>
									<img src={Humidity} className='small-img' alt='humidity-img' />
								</div>
								<div className='flex mb--20'>
									<p className='info-label'>
										wind-speed :
										<span className='text--black ml--5 mr--10'>
											{weather.current.condition.wind_kph} kph
										</span>
									</p>
									<img src={Wind} className='small-img' alt='wind-img' />
								</div>
								<div className='flex mb--20'>
									<p className='info-label flex align-items--center'>
										pressure :
										<span className='text--black ml--5 mr--10'>
											{weather.current.condition.pressure_mb} mb
										</span>
									</p>
									<img src={SunImg} className='small-img' alt='SunImg-img' />
								</div>
								<div className='flex mb--20'>
									<p className='info-label flex align-items--center'>
										Cloud :
										<span className='text--black mr--10 ml--5'>{weather.current.cloud} %</span>
									</p>
									<img src={Pressure} className='small-img' alt='Pressure-img' />
								</div>
							</div>
							<div className='width--50'>
								<div className='flex justify-content--between'>
									<div className='mr--10'>
										<img className='sun-position-img' src={SmallSun} alt='SmallSun' />
										<p className='info-title mt--5'>
											{weather.forecast.forecastday[0].astro.sunrise}
										</p>
									</div>
									<div className='info-title'>
										<img className='sun-position-img' src={Moon} alt='moon' />
										<p className='info-title mt--5'>
											{weather.forecast.forecastday[0].astro.sunset}
										</p>
									</div>
								</div>
								<div className='flex mt--30'>
									<p className='info-title flex align-items--center mr--20'>
										<HighTemp />
										<span className='text--black'>
											{weather.forecast.forecastday[0].day.maxtemp_c} °C
										</span>
									</p>
									<p className='info-title flex align-items--center'>
										<DownTemp />
										<span className='text--black'>
											{weather.forecast.forecastday[0].day.mintemp_c} °C
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{hourlyData.length > 0 && !isLoading && <DailyForeCast hourlyData={hourlyData} />}
			{isLoading && (
				<div className='pt--40'>
					<Spinner />
				</div>
			)}
			{isError && <p>No data Found</p>}
		</>
	);
};

export default CityWeather;
