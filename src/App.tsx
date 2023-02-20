import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loadable from "react-loadable";


import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayouts from "./layouts/MainLayouts";

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Идет загрузка</div>,
});



const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route path="" element={<Home />}/>
        <Route 
          path="cart" 
          element={
            <Suspense fallback={<div>Загрузка пошла...</div>}>
              <Cart />
            </Suspense>
          }
          />
        <Route 
          path="pizza/:id" 
          element={
            <Suspense fallback={<div>Загрузка пошла...</div>}>
              <FullPizza />
            </Suspense>
          }
          />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<div>Загрузка пошла...</div>}>
              <NotFound />
            </Suspense>
          }
          />
      </Route>
    </Routes>  
  ); 
}

export default App;
     