import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider } from "@chakra-ui/react";
import BudgetProvider from "./state/BudgetContext";

import { RecoilRoot } from "recoil";

import { Provider } from 'react-redux';
import { store } from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <ChakraProvider>
          <BudgetProvider>
            <App />
          </BudgetProvider>
        </ChakraProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
