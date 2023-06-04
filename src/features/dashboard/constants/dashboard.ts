import Thunderstorm from 'assets/images/thunderstorm.png';
import Drizzle from 'assets/images/drizzle.png';
import Rain from 'assets/images/rain.png';
import Snow from 'assets/images/snow.png';
import Mist from 'assets/images/mist.png';
import Smoke from 'assets/images/Smoke.png';
import Haze from 'assets/images/haze.png';
import Dust from 'assets/images/Dust.png';
import Fog from 'assets/images/Fog.png';

import Squall from 'assets/images/Squall.png';
import Clear from 'assets/images/Clear.png';
import Tornado from 'assets/images/Tornadopng.png';
import Clouds from 'assets/images/Clouds.png';

export const weatherConditionMapper: { [key: string]: string } = {
	Thunderstorm: Thunderstorm,
	Drizzle: Drizzle,
	Rain: Rain,
	Snow: Snow,
	Mist: Mist,
	Smoke: Smoke,
	Haze: Haze,
	Dust: Dust,
	Fog: Fog,
	Sand: Tornado,
	Ash: Fog,
	Squall: Squall,
	Tornado: Tornado,
	Clear: Clear,
	Clouds: Clouds
};
