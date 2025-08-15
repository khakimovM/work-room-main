import React from "react";
import useCheckAuth from "../hooks/requests/useCheckAuth";
import { Navigate } from "react-router-dom";
import BounceLoading from "./ui/BounceLoading";
interface Props {
  children: React.ReactNode;
}

const ProtectedRouteComponent = ({ children }: Props) => {
  const { isSuccess, data, isFetching } = useCheckAuth();

  if (isFetching) {
    return <BounceLoading fill="black" />;
  }

  const status = data?.data;

  return <>{isSuccess && status ? children : <Navigate to={"sign-in"} />}</>;
};

export default ProtectedRouteComponent;
