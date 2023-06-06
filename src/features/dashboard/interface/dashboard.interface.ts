export interface IHourlyData {
	[key: string]: number | any;
}

export interface Condition {
	text: string;
	icon: string;
	code: number;
}

export interface AirQuality {
	[key: string]: number;
}
