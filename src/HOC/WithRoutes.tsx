import React from "react";

import { useNavigate, useLocation, useParams } from "react-router-dom";
export const WithRoutes = (Child: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
      <Child
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
  return Wrapper;
};
