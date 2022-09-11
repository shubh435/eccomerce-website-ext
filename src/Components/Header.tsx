import {
  AppBar,
  Avatar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import ShopingIcon from "@material-ui/icons/ShoppingCart";
import { deepOrange } from "@mui/material/colors";
import { EcommerceContext } from "../Contexts/Ecomerce";
import { WithRoutes } from "../HOC/WithRoutes";
class Header extends Component<any, any> {
  static contextType?: any = EcommerceContext;
  componentDidMount() {
    let { handleFetchApi }: any = this.context;
    handleFetchApi();
  }

  render() {
    const { state }: any = this.context;
    console.log({ state });
    return (
      <>
        <AppBar position="static" sx={{ mt: "0px" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              align="left"
              sx={{ flexGrow: 1 / 2 }}
              onClick={() => this.props.navigate("/")}
            >
              ECCOMERSE
            </Typography>
            <TextField
              placeholder="Search by product name"
              variant="outlined"
              className="inputField"
              sx={{
                flexGrow: 1,
                ml: 1,
                mr: 1,
                display: "flex",
              }}
            />

            <Box
              sx={{
                flexGrow: 1 / 2,
                justifyContent: "flex-end",
                textAlign: "right",
                position: "relative",
              }}
            >
              <Button
                color="info"
                onClick={() => this.props.navigate("/cart")}
                variant="contained"
              >
                <ShopingIcon />
                {state.porductCart && (
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      position: "absolute",
                      top: "-.51rem",
                      right: "-1rem",
                      width: "50%",
                      height: "50%",
                      zIndex: "1",
                      borderRadius: "50%",
                    }}
                    variant="square"
                  >
                    {state.porductCart.length}
                  </Avatar>
                )}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default WithRoutes(Header);
