import { CSSProperties } from 'react';

export const reactSelectStyles: any = {
	option: (base: CSSProperties, state: any) => ({
		...base,
		borderBottom: '1px solid #e7e7e7',
		color: 'black',
		padding: 8,
		fontSize: '14px',
		fontWight: '400',
		backgroundColor: state.isSelected ? '#d5d5d5' : state.isFocused ? '#e7e7e7' : '',
		':active': {
			backgroundColor: '#e7e7e7'
		},
		':hover': {
			backgroundColor: '#e7e7e7'
		},
		':focus': {
			backgroundColor: '#e7e7e7',
			outline: 0
		}
	}),
	menu: (base: CSSProperties) => ({
		...base,
		zIndex: 3,
		marginTop: 0,
		width: '300px',
		top: '84px'
	}),
	menuList: (base: CSSProperties) => ({
		...base,
		padding: 0,
		maxHeight: '230px',
		backgroundColor: '#ffffff'
	}),
	clearIndicator: (base: CSSProperties) => ({
		...base,
		cursor: 'pointer'
	}),
	dropdownIndicator: (base: CSSProperties, state: any) => ({
		...base,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
	}),
	indicatorSeparator: () => ({
		width: '0'
	}),
	control: () => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '300px',
		minHeight: '50px',
		padding: '0px '
	}),
	container: () => ({
		width: '300px'
	}),

	singleValue: (base: CSSProperties, state: any) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...base, opacity: opacity, transition: transition };
	}
};
