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
import NavBarAdmin from '../components/NavBarAdmin';
import ProductsOverview from './ProductsOverview';
import ProductsOverviewSort from './ProductsOverviewSort';
import {Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import AddBrand from './AddBrand';


export default function AdminPanel() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState('overview products')


  const handleClick = (t: string) => {
    setType(t)

  }

  let child;
  switch (type) {
    case 'overview products':
      child = <Text>overview products</Text>;
      break;
    case 'add products':
      child = <Text>add product</Text>;
      break;
    case 'dashboard':
      child = <Text>dashboard</Text>;
      break;
    default:
      child = <Text>eeeeeeeeeeeee</Text>;
  }
  useEffect(() => {

    return () => {

    }
  }, [type])



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

     <Routes>
        <Route path='/' element={<Text>dashboard route</Text>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/addbrand' element={<AddBrand/>} />
     </Routes>

    </AppShell>
  );
}
