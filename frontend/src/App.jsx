import React from 'react'

import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Signup from './assets/components/Signup';
import Signin from './assets/components/Signin';
import Dashbord from './assets/components/Dashbord'
import Protectedroute from './assets/components/Protectedroute';
import Send from './assets/components/Send';
import About from './assets/components/About';
import Transactions  from './assets/components/Transactions';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/about" element={<About/>}></Route>
         <Route path="/signup" element={<Signup/>} ></Route>
         <Route path="/signin" element={<Signin/>}></Route>
         <Route path="/dashboard" element={<Protectedroute />}></Route>
         <Route path="/send" element={<Send/>}> </Route>
          <Route path="/transaction" element={<Transactions/>}> </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
