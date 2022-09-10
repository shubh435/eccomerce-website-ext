import React from "react";
import axios from "axios";
interface MyContextProviderProps {
  children: React.ReactNode;
}

const EcommerceContext = React.createContext({});
interface MyContextProviderState {
  cartValue: string | number;
  cartEle: Cart[];
}
export interface Cart {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

class MyContextProvider extends React.Component<
  MyContextProviderProps,
  MyContextProviderState
> {
  constructor(props: MyContextProviderProps) {
    super(props);
    this.state = {
      cartValue: 0,
      cartEle: JSON.parse(localStorage.getItem("products")!) || [],
    };
  }

  handleFetchApi = async () => {
    if (this.state.cartEle.length > 0) {
      return false;
    } else {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log({ res });

      if (res.status === 200) {
        await localStorage.setItem("products", JSON.stringify(res.data));

        this.setState({
          cartEle: JSON.parse(localStorage.getItem("products")!),
        });
      }
    }
  };
  render() {
    const { children } = this.props;
    return (
      <EcommerceContext.Provider
        value={{
          state: this.state,
          handleFetchApi: this.handleFetchApi,
        }}
      >
        {children}
      </EcommerceContext.Provider>
    );
  }
}

export { MyContextProvider, EcommerceContext };
