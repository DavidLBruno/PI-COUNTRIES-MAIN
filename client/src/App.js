import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandindPage';
import Home from './components/Home/Home'
import ActivityCreate from './components/ActivityCreate/ActivityCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route exact path= '/' element = {<LandingPage/>} />
      <Route path = '/home' element = {<Home/>}/>
      <Route path='activity' element={<ActivityCreate/>} />
      <Route path='/home/:id' element={<Detail/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
