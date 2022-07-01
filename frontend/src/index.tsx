import React , { useState }from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications';
import { Provider } from "react-redux"
import store from './user/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { MantineProvider , ColorSchemeProvider , ColorScheme } from '@mantine/core';
import AppWrapper from './AppWrapper';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

  
          <AppWrapper />
        

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
