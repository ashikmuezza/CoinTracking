import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import HomePage from './pages/HomePage';
import {Helmet} from 'react-helmet';

function App() {
  return (
   <BrowserRouter>
    <div>
      <Helmet>
          <style>{'body { background-color: #422a41; }'}</style>
      </Helmet>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} default />
        <Route path="/coins/:id"  element={<CoinPage/>} />
      </Routes> 
    </div>
   </BrowserRouter>
  )
}

export default App;
