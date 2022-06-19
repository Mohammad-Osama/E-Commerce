import React ,{ useEffect ,useState }  from "react";
import { Container } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/components/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/components/features/NavBar";
import LoginRegister from "./user/components/pages/LoginRegister";
import TempUser from "./user/components/TempUser";
import { authState } from "./user/redux/slices/authSlice";
import { useSelector } from "react-redux";
import HomeAdmin from "./admin/components/pages/HomeAdmin";

const App: React.FC  = () => {

   const { role } = useSelector(authState)
   // const authStddddate = useSelector(authState)
   const [type, SetType] = useState<string>('')

   useEffect(() => {
     SetType(role)
  }, [role  , type])

  
  return (
    <>
    {  type==="admin"
     ? <Container size="xl" px="xs" >
            <TempUser/>

            <Routes>
              <Route path='/' element={<HomeAdmin />} />
            </Routes>
          </Container>

          :  <Container size="xl" px="xs" >
              <Navbar />
              <TempCart />
              <TempUser/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/loginregister' element={<LoginRegister />} />
              </Routes>
            </Container>


    }
       </>   
  )
}

export default App
