import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
 
  
//pages
 
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';
 
 
export default function Navigation() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/:username" element={<User/>}></Route>
            <Route path="*" element={<Error404/>}></Route>
        </Routes>
    </Router>
  )
}
