import Sunny from 'assets/images/sunnyBG.jpg';
import Clear from 'assets/images/clearBG.jpg';
import Cloudy from 'assets/images/cloudyBG.jpg';
import PartlyCloudy from 'assets/images/PartlyCloudyBG.jpg';
import Overcast from 'assets/images/OvercastBG.jpg';
import Rainy from 'assets/images/rainBG.jpg';
import Thunderstorms from 'assets/images/ThunderstormsBG.jpg';
import Snowy from 'assets/images/SnowyBG.jpg';
import Foggy from 'assets/images/FoggyBG.jpg';
import Hot from 'assets/images/HotBG.jpg';
import Cold from 'assets/images/ColdBG.jpg';
import Humid from 'assets/images/HumidBG.jpg';
import Dry from 'assets/images/dryBG.jpg';

export const weatherConditionMapper: { [key: string]: string } = {
	Sunny: Sunny,
	Clear: Clear,
	Cloudy: Cloudy,
	'Partly cloudy': PartlyCloudy,
	Overcast: Overcast,
	Rainy: Rainy,
	Thunderstorms: Thunderstorms,
	Snowy: Snowy,
	Foggy: Foggy,
	Hot: Hot,
	Cold: Cold,
	Humid: Humid,
	Dry: Dry
};
