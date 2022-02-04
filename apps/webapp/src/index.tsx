import ReactDOM from 'react-dom';
import { AppWithProviders } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
