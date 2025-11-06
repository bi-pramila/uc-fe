import React from 'react';
import './assets/scss/themes.scss';
import 'remixicon/fonts/remixicon.css';
import 'prismjs/themes/prism-okaidia.css';

import RouteIndex from 'Routes/Index';

import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// const firebaseConfig = {
//   apiKey: process.env.VITE_APIKEY,
//   authDomain: process.env.VITE_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.VITE_PROJECTID,
//   storageBucket: process.env.VITE_STORAGEBUCKET,
//   messagingSenderId: process.env.VITE_MESSAGINGSENDERID,
//   appId: process.env.VITE_APPID,
//   measurementId: process.env.VITE_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

const App = () => {
  return (
    <RouteIndex />
  );
};

export default App;
