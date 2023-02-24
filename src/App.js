import { Provider } from 'react-redux';
import { ContainerQuiz } from './components/ContainerQuiz';

import { store } from './state';

function App() {
	return (
		<Provider store={store}>
			<ContainerQuiz />
		</Provider>
	);
}

export default App;