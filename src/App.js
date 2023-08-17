import { Provider } from 'react-redux';
import './App.css';
import { Mainroute } from './router';
import { persistor, store } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Mainroute />
      </PersistGate >
    </Provider>
  );
}

export default App;
