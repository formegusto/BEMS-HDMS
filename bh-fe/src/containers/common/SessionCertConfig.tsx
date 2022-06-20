import { Box, Fab, CircularProgress, Grow } from "@mui/material";
import styled from "styled-components";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import React from "react";
import { blue } from "@material-ui/core/colors";
import SessionCertConnector from "src/store/sessionCert/connector";
import { ConnectedProps } from "react-redux";
import getRandomBytes from "src/utils/getRandomBytes";
import { publicEncrypt } from "crypto";
import { symmetricDecrypt, symmetricEncrypt } from "src/utils/ARIAUtils";
import client from "src/api/client";
import { REQUEST_ENC_HEADER } from "src/api/types";

interface Props extends ConnectedProps<typeof SessionCertConnector> {}

function SessionCertConfig({
  id,
  symmetricKey,
  tmp,
  getPublicKey,
  saveSymKey,
  postSymKey,
  patchEstablish,
  setAuth,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("modal-open");
  }, []);
  // step1. request public key
  React.useEffect(() => {
    getPublicKey();
    setLoading(true);
    setSuccess(false);
  }, [getPublicKey]);

  // step2. config symmetric key
  React.useEffect(() => {
    if (tmp && tmp.publicKey && !tmp.symmetricKey) {
      const symmetricKey = getRandomBytes(32);
      saveSymKey(symmetricKey);
    }
  }, [saveSymKey, tmp]);

  // step3. request decrypted symmetric key by public key
  React.useEffect(() => {
    if (tmp && tmp.publicKey && tmp.symmetricKey && !tmp.testString) {
      const encSymKey = publicEncrypt(
        tmp.publicKey,
        Buffer.from(tmp.symmetricKey)
      ).toString("base64");

      postSymKey({
        id: tmp.id!,
        symmetricKey: encSymKey,
      });
    }
  }, [tmp, postSymKey]);

  // step4. decrypt testString
  React.useEffect(() => {
    if (tmp && tmp.symmetricKey && tmp.testString) {
      const decResBodyStr = symmetricDecrypt(tmp.testString, tmp.symmetricKey);
      const encBodyStr = symmetricEncrypt(decResBodyStr, tmp.symmetricKey);

      patchEstablish({
        id: tmp.id!,
        encBodyStr,
      });
    }
  }, [tmp, patchEstablish]);

  const buttonSx = {
    ...(loading
      ? {
          bgcolor: blue[900],
        }
      : {
          bgcolor: blue[900],
        }),
  };

  React.useEffect(() => {
    if (symmetricKey && id) {
      client.interceptors.request.use(
        (config) => {
          config.headers = {
            ...config.headers,
            "session-cert-id": id.toString(),
            ...REQUEST_ENC_HEADER,
          };

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          setSuccess(true);

          const auth = sessionStorage.getItem("auth");
          if (auth) setAuth(auth);
          document.body.classList.remove("modal-open");
        }, 2000);
      }, 2000);
    }
  }, [symmetricKey, id, setAuth]);

  return success ? (
    <></>
  ) : (
    <Wrap>
      <Grow in style={{ transformOrigin: "50% 50%" }} timeout={1000}>
        <Box sx={{ position: "relative" }}>
          <Fab
            aria-label="config-encryption"
            sx={buttonSx}
            onClick={() => console.log("test 임당")}
          >
            {loading ? (
              <AddModeratorIcon color="info" />
            ) : (
              <Grow in style={{ transformOrigin: "50% 50%" }} timeout={300}>
                <VerifiedUserIcon color="info" />
              </Grow>
            )}
          </Fab>
          <CircularProgress
            size={68}
            sx={{
              color: blue[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
            {...(loading
              ? {}
              : {
                  variant: "determinate",
                  value: 100,
                })}
          />
        </Box>
      </Grow>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  min-width: 500px;
  min-height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(51, 51, 51, 0.5);

  z-index: 300;
`;

export default SessionCertConnector(SessionCertConfig);
