import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/constants';

const Main = lazy(() => import('./pages/MainPage/Main'));
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner/LoadingSpinner'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFound'));

function App() {
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path={ROUTES.MAIN} element={<Main />} />
					<Route path={ROUTES.NOTFOUND} element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
