import React from "react";
import { ConnectedProps } from "react-redux";
import client from "src/api/client";
import AuthConnector from "src/store/auth/connector";

interface Props extends ConnectedProps<typeof AuthConnector> {}
function AuthCheck({ auth, check, user, error, id }: Props) {
  const refIntercetor = React.useRef<number>();

  React.useEffect(() => {
    if (auth && !user) {
      sessionStorage.setItem("auth", auth);
      console.log("새로 로그인 하면 바꿔드림", auth);
      const interceptor = client.interceptors.request.use(
        (config) => {
          config.headers = {
            ...config.headers,
            authorization: auth,
          };

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      refIntercetor.current = interceptor;
      check();
    }

    if (!auth && !user) {
      if (error) {
        sessionStorage.removeItem("auth");
      }
      if (refIntercetor.current) {
        client.interceptors.request.eject(refIntercetor.current);
      }
    }
  }, [auth, check, user, error, id]);

  return <></>;
}

export default AuthConnector(AuthCheck);
