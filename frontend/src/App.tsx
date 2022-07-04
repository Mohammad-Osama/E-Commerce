import React ,{ useEffect ,useState }  from "react";
import { Container , useMantineTheme ,createStyles} from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from "./user/components/pages/Home";
import TempCart from "./user/components/TempCart";
import { Navbar } from "./user/components/features/NavBar";
import LoginRegister from "./user/components/pages/LoginRegister";
import TempUser from "./user/components/TempUser";
import { authState } from "./user/redux/slices/authSlice";
import { useSelector } from "react-redux";
import HomeAdmin from "./admin/components/pages/HomeAdmin";
import Browse from "./user/components/pages/Browse";
import ProductFull from "./user/components/features/ProductFull";
import Cart from "./user/components/pages/Cart";
import Profile from "./user/components/pages/Profile";


const useStyles = createStyles((theme) => ({
  container: {   
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],   
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          
  },
}));


const App: React.FC  = () => {
 // const theme = useMantineTheme();
  const { classes } = useStyles()
   const { role } = useSelector(authState)
   // const authStddddate = useSelector(authState)
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
              <TempCart />
              <TempUser/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/loginregister' element={<LoginRegister />} />
                <Route path='/browse/:id' element={<Browse />} />
                <Route path='/product/:id' element={<ProductFull />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </Container>


    }
       </div>   
  )
}

export default App
