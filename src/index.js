import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Theme
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer, getFirebase } from 'react-redux-firebase';
import appReducer, { appReducerInit } from './store/appreducer';
import thunk from 'redux-thunk';
import { createFirestoreInstance, firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore';

// Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Util
import { SECONDARY_THEME_COLOR, ERROR_COLOR, SECONDARY_BACKGROUND_COLOR, SUCCESS_COLOR } from './util/constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: {
      main: SECONDARY_THEME_COLOR
    },
    error: {
      main: ERROR_COLOR
    },
    success: {
      main: SUCCESS_COLOR
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: SECONDARY_BACKGROUND_COLOR,
    }
  }
});

let firebaseConfig = null;

if (process.env.REACT_APP_COMP === 'finance') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FINANCE_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FINANCE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FINANCE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FINANCE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FINANCE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FINANCE_APP_ID,
    measurementId: process.env.REACT_APP_FINANCE_MEASUREMENT_ID
  }
} else if (process.env.REACT_APP_COMP === 'tech') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_TECH_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_TECH_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_TECH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_TECH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_TECH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_TECH_APP_ID,
    measurementId: process.env.REACT_APP_TECH_MEASUREMENT_ID
  }
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const createStoreWithFirebase = compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase))(createStore);

const rootReducer = combineReducers({ firebase: firebaseReducer, firestore: firestoreReducer, appReducer });

const store = createStoreWithFirebase(rootReducer, { appReducer: appReducerInit });

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render((
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>
), document.getElementById('root'));
