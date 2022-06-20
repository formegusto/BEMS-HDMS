import {
  Dialog,
  DialogTitle,
  Typography,
  styled,
  DialogContent,
  DialogActions,
  Fab,
  TextField,
  Box,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import client from "src/api/client";
import SessionCertConnector from "src/store/sessionCert/connector";
import { ConnectedProps } from "react-redux";
import { symmetricDecrypt, symmetricEncrypt } from "src/utils/ARIAUtils";
import { VIEWMODE } from "src/store/information/types";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: 500,
  },

  "& .MuiDialogTitle-root": {
    display: "flex",
    alignItems: "center",
  },
}));

const FileBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 295,
  border: "1px solid rgba(0, 0, 0, 0.23)",
  marginTop: "8px",
  borderRadius: "4px",
  overflow: "hidden",

  "&:hover": {
    borderColor: "#1565c0",
  },

  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    objectFit: "cover",
  },
}));

const FileLabel = styled(InputLabel)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  cursor: "pointer",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "&:hover": {
    color: "#1565c0",
  },

  "&.image-in": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  },
}));

const FileInput = styled(TextField)(({ theme }) => ({
  display: "none",
}));

const InformationMap: { [key: string]: string } = {
  building: "건물",
  unit: "호",
  sensor: "센서",
};

interface Props extends ConnectedProps<typeof SessionCertConnector> {
  open: boolean;
  viewMode?: VIEWMODE | null;
  closeAction: (update?: boolean) => void;
  originalData?: {
    name?: string;
    image?: string;
  } | null;
}

function PatchFormDialog({
  open,
  symmetricKey,
  closeAction,
  viewMode,
  originalData,
}: Props) {
  const [name, setName] = React.useState<string | null | undefined>();
  const [image, setImage] = React.useState<string | null | undefined>();
  const [updateImage, setUpdateImage] = React.useState<Blob | null>(null);
  const [mainImage, setMainImage] = React.useState<string | null | undefined>(
    null
  );

  React.useEffect(() => {
    if (originalData) {
      setName(originalData.name);
      setImage(originalData.image);
    }
  }, [originalData]);

  const fileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const src = e.target?.result;

        setMainImage(src as any);
      };

      if (e.target.files && e.target.files.length > 0) {
        fileReader.readAsDataURL(e.target.files[0]);
        setUpdateImage(e.target.files[0]);
      }
    },
    []
  );

  const onSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      if (symmetricKey && name && name !== originalData?.name) {
        console.log(name.length);
        const cipherText = symmetricEncrypt(name, symmetricKey);
        console.log(cipherText);
        console.log(symmetricDecrypt(cipherText, symmetricKey));
        formData.append("name", symmetricEncrypt(name, symmetricKey));
      }

      if (updateImage) {
        formData.append("image", updateImage);
      }
      const path = `/admin/data/${viewMode?.target}/${viewMode?.rootId}`;

      const res = await client.patch(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      closeAction(true);
    },
    [name, updateImage, symmetricKey, closeAction, viewMode, originalData]
  );

  return (
    <CustomDialog open={open} onClose={() => closeAction()}>
      <DialogTitle>
        <Typography variant="h6" component="span">
          {viewMode && InformationMap[viewMode.target]} 수정
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="이름"
            sx={{
              mt: 1,
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {viewMode && viewMode.target === "building" && (
            <FileBox>
              {mainImage && <img src={mainImage} alt="add" />}
              {!mainImage && image && (
                <img src={"http://localhost:8080" + image} alt="add" />
              )}
              <FileLabel
                htmlFor="add-test"
                className={`${mainImage ? "image-in" : ""}`}
              >
                <AddIcon fontSize="large" />
              </FileLabel>
              <FileInput id="add-test" type="file" onChange={fileChange} />
            </FileBox>
          )}
        </DialogContent>
        <DialogActions>
          <Fab
            type="submit"
            variant="extended"
            color="primary"
            sx={{
              fontSize: "16px",
            }}
          >
            저장
          </Fab>
        </DialogActions>
      </form>
    </CustomDialog>
  );
}

export default SessionCertConnector(PatchFormDialog);
