import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import NavBarAdmin from './NavBarAdmin';
import ErrorPage from '../../components/ErrorPage';
import { authState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import AddProduct from './add product/AddProduct';
/* import {Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import AddBrand from './AddBrand';
import AddCategory from './AddCategory';
import AddCoupon from './AddCoupon';
import OverviewUsers from './OverviewUsers'; */


export default function AdminPanel() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState('overview products')


  const handleClick = (t: string) => {
    setType(t)

  }

  let child;
  switch (type) {
    case 'Add Product':
      child = <AddProduct/>
      break;
    case 'Add Product':
      child = <Text>Add Product</Text>;
      break;
    case 'Dashboard':
      child = <Text>Dashboard</Text>;
      break;
    default:
      child = <Text>Not done yet </Text>;
  }
  const { role } = useSelector(authState)
  useEffect(() => {
console.log("type" , type)
    return () => {

    }
  }, [type,role])

  if (role!=="admin")

  return <ErrorPage/>

else 

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      //  navbarOffsetBreakpoint="sm"
      // asideOffsetBreakpoint="sm"
      fixed
      navbar={
        //  <Navbar  p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <NavBarAdmin hidden={!opened}
          handleClick={handleClick}
        />
        //  </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
{child}
    </AppShell>
  );
}
