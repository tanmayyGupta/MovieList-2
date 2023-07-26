import './App.css';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css" 

import Home from './pages/Home';
import YourProfile from './pages/YourProfile';
import NotFound from './pages/NotFound'
import Landing from './pages/Landing';
import UpdatedNavbar from './components/UpdatedNavbar';
import UpdatedLogin from './pages/UpdatedLogin';
import UpdatedRegister from './pages/UpdatedRegister';
import SignOut from './components/Signout';

function App() {
  return (
    <>
    <div className="App min-h-screen">
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path="" element={<UpdatedNavbar/>}>
            <Route path="/register" element={<UpdatedRegister />}/>
            <Route path="/login" element={<UpdatedLogin />}/>
            <Route path="/home/" element={<Home />}/>
            <Route path="/profile" element={<YourProfile />}/>
            <Route path="/signout" element={<SignOut/>}/>
            <Route path="*" element={<NotFound />}/>
          </Route>
      </Routes>
    </div>
    </>
  );
}

export default App;