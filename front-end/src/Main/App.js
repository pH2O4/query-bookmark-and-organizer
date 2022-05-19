import './App.css';
import LoginPage from '../Components/UserJoin/Login';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
export default props =>
<div className="App">
<Routes>
      <Route path="/" element={<LoginPage/>} />

    </Routes>
</div>

