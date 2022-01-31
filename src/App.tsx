import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Home from './components/home';
import SignUp from './components/sign-up';
import SignIn from './components/sign-in';
import Checkout from './components/check-out';
import AutocompleteProduct from './components/autocomplete-product';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/autocomplete-product' element={<AutocompleteProduct />} />
      </Routes>
    </>
  );
}

export default App;
