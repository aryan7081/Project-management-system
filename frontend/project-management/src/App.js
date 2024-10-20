import './App.css';
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './routes';
import SignupPage from './Components/signUp';
import LoginPage from './Components/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
