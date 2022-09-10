import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Container } from "@mui/material";
import { MyContextProvider } from "./Contexts/Ecomerce";
import Products from "./Components/Products";

function App() {
  return (
    <>
      <MyContextProvider>
        <Container maxWidth="xl">
          <Header />
          <Products />
        </Container>
      </MyContextProvider>
    </>
  );
}

export default App;
