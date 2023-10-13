import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import store from './Redux/store.ts';
import Dashboard from "./pages/Home/Dashboard/Dashboard.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path='/' Component={Dashboard}/>
              </Routes>
          </Router>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
