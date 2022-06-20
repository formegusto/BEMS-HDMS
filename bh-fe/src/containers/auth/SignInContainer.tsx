import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInComponent from "src/components/auth/SignInComponent";
import AuthConnector from "src/store/auth/connector";
import { RequestSignIn } from "src/store/auth/types";

interface Props extends ConnectedProps<typeof AuthConnector> {}

function SignInContainer({ signIn }: Props) {
  const { control, handleSubmit } = useForm<RequestSignIn>({});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RequestSignIn> = React.useCallback(
    (data) => {
      signIn({
        ...data,
        clickEvent: {
          success: () => {
            navigate("/");
          },
        },
      });
    },
    [navigate, signIn]
  );

  return (
    <SignInComponent control={control} onSubmit={handleSubmit(onSubmit)} />
  );
}

export default AuthConnector(SignInContainer);
