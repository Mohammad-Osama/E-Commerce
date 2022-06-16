import React from "react";
import { Container } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/components/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/components/features/NavBar";


const App: React.FC = () => {
  return (
    <>
    <Navbar/>
    <Container size="xl" px="xs" >
     
      <TempCart />
      <Routes>
        <Route  path='/' element={<Home/>} />
      </Routes>
    </Container>
    </>
  );
}

export default App
