import { Routes, Route } from 'react-router-dom';

import Home from './components/home';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in';
import Checkout from './components/check-out';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  );
}

export default App;
