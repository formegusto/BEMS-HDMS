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
import { symmetricEncrypt } from "src/utils/ARIAUtils";
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
}

function PostFormDialog({ open, symmetricKey, closeAction, viewMode }: Props) {
  const [name, setName] = React.useState<string>("");
  const [image, setImage] = React.useState<Blob | null>(null);
  const [mainImage, setMainImage] = React.useState<string | null | undefined>(
    null
  );
  const fileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const src = e.target?.result;

        setMainImage(src as any);
      };

      if (e.target.files && e.target.files.length > 0) {
        fileReader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
      }
    },
    []
  );

  const onSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      if (symmetricKey) {
        formData.append("name", symmetricEncrypt(name, symmetricKey));
      }

      if (image) {
        formData.append("image", image);
      }

      const path = `/admin/data/${viewMode?.target}/`;

      if (viewMode && viewMode.rootId && viewMode.target === "unit")
        formData.append("buildingId", viewMode.rootId!);
      if (viewMode && viewMode.rootId && viewMode?.target === "sensor")
        formData.append("unitId", viewMode.rootId);
      const res = await client.post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      closeAction(true);
    },
    [name, image, symmetricKey, closeAction, viewMode]
  );

  return (
    <CustomDialog open={open} onClose={() => closeAction()}>
      <DialogTitle>
        <Typography variant="h6" component="span">
          {viewMode && InformationMap[viewMode.target]} 추가
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
            onChange={(e) => setName(e.target.value)}
          />
          {viewMode && viewMode.target === "building" && (
            <FileBox>
              {mainImage && <img src={mainImage} alt="add" />}
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

export default SessionCertConnector(PostFormDialog);
