import React from "react";
import { Container } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/components/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/components/features/NavBar";
import LoginRegister from "./user/components/pages/LoginRegister";


const App: React.FC = () => {
  return (
    <Container size="xl" px="xs" >
      <Navbar />
      <TempCart />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginregister' element={<LoginRegister />} />
      </Routes>
    </Container>
  );
}

export default App
