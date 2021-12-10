import './css/App.css';
import SignInSide from './pages/signin';
import Homepage from './pages/hompeage';
import SignUp from './pages/signup'
import SignIn from './pages/signin';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<Homepage/>} />
       <Route path="/signup" element={<SignUp/>}/>
       <Route path="/signIn" element={<SignIn/>}/>
     </Routes>
   </Router>
  );
}

export default App;
