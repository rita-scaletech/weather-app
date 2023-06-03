import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = (props) => {
	return (
		<div id='wrapper'>
			<div id='page-wrapper' className='full--width'>
				{props.children}
			</div>
			{/* <div className='sun' />
					<img src='https://i.postimg.cc/BvNdRH3z/building.png' alt='building' width='100%' />
				<div className='moon' /> */}

			{/* <div className='tvscreen'>
				<div className='sun' />
				<div className='landscape'>
					<div className='hill foreground'></div>
					<div className='hill background'></div>
				</div>
			</div> */}
		</div>
	);
};

export default Layout;
