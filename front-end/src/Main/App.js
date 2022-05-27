import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '../Components/UserJoin/Login'
import RecuveryPass from '../Components/UserJoin/recoveryPass'
import Home from '../Components/Home/Home'
import Calendar from '../Components/Calendar/CalendarForm'


export default props =>

<div className="App">
<Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/Recovery" element={<RecuveryPass/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Calendar" element={<Calendar/>} />
    </Routes>
</div>
