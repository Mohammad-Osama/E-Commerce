import React from "react";
import { Container } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/components/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/components/features/NavBar";
import LoginRegister from "./user/components/pages/LoginRegister";
import TempUser from "./user/components/TempUser";
import { authState } from "./user/redux/slices/authSlice";
import { useSelector } from "react-redux";

const App: React.FC = () => {

   // const authStddddate = useSelector(authState)
  
  return (
    <Container size="xl" px="xs" >
      <Navbar />
      <TempCart />
      <TempUser/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginregister' element={<LoginRegister />} />
      </Routes>
    </Container>
  );
}

export default App
