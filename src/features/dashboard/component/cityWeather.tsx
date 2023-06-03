const CityWeather = () => {
	return (
		<>
			<div className='city-component'>
				<span className='choose-city-label'>Find Weather of your city</span>
				<form className='search-box'>
					<input placeholder='City' />
					<span className='glyphicon glyphicon-map-marker'></span>
					<button className='submit-btn' type='submit'>
						Search
					</button>
				</form>
			</div>
		</>
	);
};

export default CityWeather;
