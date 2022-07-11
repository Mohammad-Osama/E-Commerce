import React ,{ useEffect ,useState }  from "react";
import { Container , useMantineTheme ,createStyles} from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/features/NavBar";
import LoginRegister from "./user/pages/LoginRegister";
import TempUser from "./user/components/TempUser";
import { authState } from "./user/redux/slices/authSlice";
import { useSelector } from "react-redux";
import HomeAdmin from "./admin/components/pages/HomeAdmin";
import Browse from "./user/pages/Browse";
import ProductFull from "./user/features/ProductFull";
import Cart from "./user/pages/Cart";
import Dashboard from "./user/pages/Dashboard";



const useStyles = createStyles((theme) => ({
  container: {   
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],   
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
          
  },
}));


const App: React.FC  = () => {
  const { classes } = useStyles()
   const { role } = useSelector(authState)
   const [type, SetType] = useState<string>('')

   useEffect(() => {
     SetType(role)
  }, [role  , type])

  
  return (
    
    < div className={classes.container}>
    {  type==="admin"
     ? <Container size="xl" px="xs" >
            <TempUser/>

            <Routes>
              <Route path='/' element={<HomeAdmin />} />
            </Routes>
          </Container>

          :  <Container size="xl" px="xs" className={classes.container} >
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
            </Container>
    }
       </div>   
  )
}

export default App
