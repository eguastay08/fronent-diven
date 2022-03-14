import {Navigate} from "react-router-dom";

export const Public = ({children}) => {
  if (localStorage.getItem("access-token")) {
    return <Navigate to="/" />
  }
  return children
}
