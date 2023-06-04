import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from 'hoc/layout/layout';
import Dashboard from 'features/dashboard/container/dashboard';

const App: FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Dashboard />} />
			</Routes>
		</Layout>
	);
};

export default App;
