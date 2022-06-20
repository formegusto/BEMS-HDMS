import AuthComponent from "src/components/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInInput } from "src/store/auth/types";
import React from "react";
import { ConnectedProps } from "react-redux";
import AuthConnector from "src/store/auth/connector";
import client from "src/api/client";

interface Props extends ConnectedProps<typeof AuthConnector> {}

function AuthContainer({ auth, signIn, check }: Props) {
  const { control, handleSubmit } = useForm<SignInInput>();

  const onSubmit: SubmitHandler<SignInInput> = React.useCallback(
    (data) => {
      signIn(data);
    },
    [signIn]
  );

  React.useEffect(() => {
    if (auth) {
      client.interceptors.request.use(
        (config) => {
          config.headers = {
            ...config.headers,
            authorization: auth,
          };

          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      check();
    }
  }, [auth, check]);

  return <AuthComponent control={control} onSubmit={handleSubmit(onSubmit)} />;
}

export default AuthConnector(AuthContainer);
