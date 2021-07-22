import { useContext } from "react";
import { setAuthorizationToken } from "../api-config/axios";
import Background from "../components/Home";
import { authStore } from "../global-contexts/auth-state";

const USER = { session_token: "test-session", user_id: 23 };

export default function App() {
  const authState = useContext(authStore);
  const auth = authState.state.session_token ? true : false;
  const login = (context, user) => {
    const { dispatch } = context;
    setAuthorizationToken(USER);
    dispatch({ type: "UPDATE_SESSION", payload: user });
  };
  const logout = (context) => {
    const { dispatch } = context;
    setAuthorizationToken({});
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Background loggedin={auth}>
      <div
        style={{
          alignItems: "center",
          backgroundColor: "pink",
          color: "red",
          display: "flex",
          flexDirection: "row",
          fontSize: "3rem",
          height: "20vh",
          justifyContent: "center",
          margin: "0 auto",
          width: "50vw",
        }}
      >
        {auth
          ? "Log out from here as user : " + authState.state.user_id
          : "Log in as ROOT-USER"}
      </div>
      <button
        style={{
          alignItems: "center",
          backgroundColor: "yellow",
          color: "red",
          display: "flex",
          flexDirection: "row",
          fontSize: "3rem",
          height: "5vh",
          justifyContent: "center",
          margin: "0 auto",
          width: "10vw",
        }}
        type="button"
        onClick={() => {
          auth ? logout(authState) : login(authState, USER);
        }}
      >
        {auth ? "Logout" : "Login"}
      </button>
    </Background>
  );
}
