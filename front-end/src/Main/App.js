import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '../Components/UserJoin/Login'
import RecuveryPass from '../Components/UserJoin/recoveryPass'
import Home from '../Components/Home/Home'

export default props =>
<div className="App">
<Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/Recovery" element={<RecuveryPass/>} />
      <Route path="/Home" element={<Home/>} />
    </Routes>
</div>

