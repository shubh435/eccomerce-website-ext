import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Cart, EcommerceContext } from "../Contexts/Ecomerce";
import CardCarts from "./CardCarts";
interface CartsProps {}

interface CartsState {}

class Carts extends React.Component<CartsProps, CartsState> {
  static contextType?: any = EcommerceContext;
  render() {
    const { state }: any = this.context;
    return (
      <Box
        sx={{
          position: "relative",
          boxShadow: "none",
          mt: 8,
        }}
      >
        <Typography
          sx={{ position: "absolute", bottom: "0px", zIndex: "1", right: 0 }}
          variant="h6"
        >
          Total amount:- <span>${state.amount.toFixed(2)}</span>
        </Typography>
        {state.porductCart &&
          state.porductCart.map((product: Cart) => {
            return <CardCarts key={product.id} {...product} />;
          })}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Button color="success" variant="contained">
            {" "}
            Buy Now{" "}
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Carts;
