import { useLocation } from "react-router";

const LoginGoogle = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const saveToken = (access_token) => {
    localStorage.clear();
    localStorage.setItem(
      "access-token",
      JSON.stringify({ token: access_token })
    );
    if (path === null || path==='/logout') {
      path = "/";
    }
    window.location = path;
  };
  const API_URL = process.env.REACT_APP_API_URL;
  let query = useQuery();
  let path = query.get("path");
  let access_token = query.get("access_token");
  access_token
    ? saveToken(access_token)
    : (window.location = `${API_URL}/auth/google`);
  return <></>;
};
export default LoginGoogle;
