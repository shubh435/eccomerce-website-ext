import React, { Component } from "react";
import { Box } from "@mui/system";
import { Cart, EcommerceContext } from "../Contexts/Ecomerce";
import { Typography } from "@mui/material";
import Cards from "./Cards";

export default class Products extends Component {
  static contextType?: any = EcommerceContext;
  render() {
    const { state }: any = this.context;
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        {state.cartEle.length > 0 ? (
          <>
            {state.cartEle.map((cart: Cart) => {
              return <Cards key={cart.id} {...cart} />;
            })}
          </>
        ) : (
          <Typography align="center" color="error">
            No data found
          </Typography>
        )}
      </Box>
    );
  }
}
