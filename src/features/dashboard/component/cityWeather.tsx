import { FC, useEffect, useState } from 'react';

import SunImg from 'assets/images/sun.png';
import Humidity from 'assets/images/hygrometer.png';
import Wind from 'assets/images/wind.png';
import Pressure from 'assets/images/atmospheric-pressure.png';
import SmallSun from 'assets/images/sunny.png';
import Moon from 'assets/images/moon.png';
import Spinner from 'shared/components/spinner/spinner';
import HttpService from 'shared/services/http.service';

const CityWeather: FC = () => {
	const API_KEY = process.env.REACT_APP_API_KEY;

	const [city, setCity] = useState('Ahmedabad');
	const [weather, setWeather] = useState<Record<string, any>>();
	const [isCurrentLocation, setIsCurrentLocation] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	console.log('weather', weather);

	const fetchWeather = async (event: any) => {
		event.preventDefault();
		setIsLoading(true);

		HttpService.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=yes`)
			.then((data) => {
				setWeather(data);
				setIsCurrentLocation(false);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
				setIsError(true);
				console.log('error', error);
			});
	};

	const convertUnixTimeToHours = (timestamp: number) => {
		const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
	};

	const fetchCurrentLocationWeather = () => {
		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(function (position: any) {
			fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=yes`)
				.then((res) => res.json())
				.then((data) => {
					console.log('🚀 ~ file: cityWeather.tsx:61 ~ .then ~ data:', data);
					setWeather(data);
					setIsCurrentLocation(true);
					setIsLoading(false);
				})
				.catch((error) => console.error(error));
		});
	};

	useEffect(() => {
		fetchCurrentLocationWeather();
	}, []);

	return (
		<>
			<i className='ion-ios-sunny' id='sunny'></i>
			<div className='city-component flex flex flex--column align-items--center border-radius--lg'>
				<span className='choose-city-label text--black font-size--xxl font--extra-bold'>
					Find Weather of your city
				</span>
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
			{weather && !isLoading && (
				<>
					<div className='weather-info border-radius--lg text--black'>
						<div className='weatherCondition flex flex--wrap'>
							<div className='width--50'>
								<h3>{weather.location.name}</h3>
								<p className='info-title'>
									country: <span className='font--regular'>{weather.location.country}</span>
								</p>
							</div>
							<div className='width--50 flex'>
								<div className='mr--20 width--50'>
									<h2 className=''>{weather.current.temp_c}°C</h2>
									<p className='info-title'>{weather.forecast.forecastday[0].day.condition.text}</p>
									<div className='mt--10'>
										<p className='info-title flex align-items--center'>
											<img className='small-img' src={SmallSun} alt='SmallSun' />
											{weather.forecast.forecastday[0].astro.sunrise}
										</p>
										<p className='info-title flex align-items--center mt--5'>
											<img className='small-img' src={Moon} alt='moon' />
											{weather.forecast.forecastday[0].astro.sunset}
										</p>
									</div>
								</div>
								<div className='image-wrapper'>
									<img
										src={weather.forecast.forecastday[0].day.condition.icon}
										className=' width--50'
										alt='sun-img'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='weather-info border-radius--lg text--black'>
						<div className='weatherCondition'>
							<p className='font-size--30 font--semi-bold mb--20'>Details</p>
							<div className='flex mb--10'>
								<p className='info-label'>
									humidity :
									<span className='text--black mr--10 ml--5'>{weather.current.humidity} %</span>
								</p>
								<img src={Humidity} className='small-img' alt='humidity-img' />
							</div>
							<div className='flex mb--10'>
								<p className='info-label'>
									wind-speed :
									<span className='text--black ml--5 mr--10'>
										{weather.current.condition.wind_kph} kph
									</span>
								</p>
								<img src={Wind} className='small-img' alt='wind-img' />
							</div>
							<div className='flex mb--10'>
								<p className='info-label flex align-items--center'>
									pressure :
									<span className='text--black ml--5 mr--10'>
										{weather.current.condition.pressure_mb} mb
									</span>
								</p>
								<img src={SunImg} className='small-img' alt='SunImg-img' />
							</div>
							<div className='flex mb--10'>
								<p className='info-label flex align-items--center'>
									Cloud :<span className='text--black mr--10 ml--5'>{weather.current.cloud} %</span>
								</p>
								<img src={Pressure} className='small-img' alt='Pressure-img' />
							</div>
						</div>
					</div>
				</>
			)}
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
