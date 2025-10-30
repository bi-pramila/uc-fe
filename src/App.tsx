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
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID,
//   measurementId: import.meta.env.VITE_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

const App = () => {
  return (
    <RouteIndex />
  );
};

export default App;
