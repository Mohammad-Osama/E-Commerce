import React, { useState } from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from '@mantine/notifications';
import { Provider } from "react-redux"
import store from './user/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

const AppWrapper = () => {

    let persistor = persistStore(store);


    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <NotificationsProvider position="top-right" >
                                <ModalsProvider>
                                    <App />
                                </ModalsProvider>
                            </NotificationsProvider>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>

    )
}

export default AppWrapper
