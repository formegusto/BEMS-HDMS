export type AlertData = {
  type: "error" | "info";
  action: string;
  message: string;
  clickEvent?: {
    success?: () => void;
    failure?: () => void;
  };
};

export const SHOW_ALERT = "alert/show";
export const HIDE_ALERT = "alert/hide";
