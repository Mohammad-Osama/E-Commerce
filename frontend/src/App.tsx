import React, { useEffect, useState } from "react";
import { Container, useMantineTheme, createStyles } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/features/NavBar";
import LoginRegister from "./user/pages/LoginRegister";
import TempUser from "./user/components/TempUser";
import { authState } from "./user/redux/slices/authSlice";
import { useSelector } from "react-redux";
import Browse from "./user/pages/Browse";
import ProductFull from "./user/features/ProductFull";
import Cart from "./user/pages/Cart";
import Dashboard from "./user/pages/Dashboard";
import AffixApp from "./user/features/AffixApp";
import Footer from "./user/features/Footer";
import AdminPanel from "./admin/pages/AdminPanel";
import NavBarAdmin from "./admin/components/NavBarAdmin";
import AffixDrawerCart from "./user/features/AffixDrawerCart";



const useStyles = createStyles((theme) => ({
  container: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.cyan[2],
    //    paddingbottom:"60px",
    position:"relative" ,
    minHeight:"100vh" , 

  },
}));


const App: React.FC = () => {
  const { classes } = useStyles()
  const { role } = useSelector(authState)
  const [type, SetType] = useState<string>('')

  useEffect(() => {
    SetType(role)
  }, [role, type])

  // <Container size="xl" px="xs" ></Container>
  return (

    < div className={classes.container}>
      {type === "admin"
        ? <>
          {/*  <TempUser/> */}

          <Routes>
            <Route path='/*' element={<AdminPanel />} />
            {/* <Route path='/NavBarAdmin' element={<NavBarAdmin />} /> */}
          </Routes>
        </>

        : <Container size="xl" px="xs" className={classes.container} >
          <Navbar />
          {/* <TempCart />
              <TempUser/> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/loginregister' element={<LoginRegister />} />
            <Route path='/browse/:id' element={<Browse />} />
            <Route path='/product/:id' element={<ProductFull />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>

          <AffixApp />
          <Footer />
          <AffixDrawerCart/>
        </Container>
      }
      
    </div>
  )
}

export default App
