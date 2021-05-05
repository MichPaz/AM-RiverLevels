import React from 'react';
import authorization from './auth'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import Routes from '../routes';
import Menu from '../components/Menu';
import Alert from './alert';
import Snack from './snack';
import './style/global.css';
import store from '../stores'
import theme from './paleta'
import { ThemeProvider } from '@material-ui/styles';
// import Footer from './footer'

function App() {

  authorization()

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div id='content-wrap'>
              <Snack />
              <Alert />
              <Menu />
              <Routes />
            </div>
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
