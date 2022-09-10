import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Container } from "@mui/material";
import MyContextProvider from "./Contexts/Ecomerce";
import Products from "./Components/Products";
import { Route, Routes } from "react-router-dom";
import Carts from "./Components/Carts";

function App() {
  return (
    <>
      <MyContextProvider>
        <Container maxWidth="xl">
          <Header />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Carts />} />
          </Routes>
        </Container>
      </MyContextProvider>
    </>
  );
}

export default App;
