import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import ApiApplicationConnector from "src/store/apiApplication/connector";
import { ConnectedProps } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiApplication } from "src/store/apiApplication/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 500px;
  }

  & .MuiDialogContentText-root {
    margin: 0 0 8px;
  }
`;

export type ApplyDialogConfig = {
  hide: () => void;
};

interface Props
  extends ApplyDialogConfig,
    ConnectedProps<typeof ApiApplicationConnector> {}

function ApplyDialog({ hide, applyApi }: Props) {
  const { register, handleSubmit } = useForm<ApiApplication>();
  const onSubmit: SubmitHandler<ApiApplication> = React.useCallback(
    ({ purpose }) => {
      applyApi(purpose!);
      hide();
    },
    [applyApi, hide]
  );

  return (
    <StyledDialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={() => console.log("닫혀라!")}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>신청서</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            데이터 이용목적을 10자 이상 입력해주세요.
          </DialogContentText>

          <TextField
            autoFocus
            id="name"
            variant="standard"
            label="이용 목적"
            type="text"
            className="primary"
            fullWidth
            required
            {...register("purpose")}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="submit">
            신청
          </Button>
          <Button variant="outlined" onClick={hide}>
            취소
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
}

export default ApiApplicationConnector(ApplyDialog);
