import { Box, BoxProps, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  cardSize: "big" | "small";
}

const FileBox = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",

  border: "1px solid #EEEEEE",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  "&.big": {
    borderRadius: "16px 16px 0 0",
    width: 295,
    height: 295,
    margin: "0 10px 32px 0",
  },

  "&.small": {
    width: 200,
    height: 100,
    margin: "0 10px 10px 0",
  },

  "&:hover": {
    borderColor: "#26446D",
    color: "#26446D",
  },
}));

function CardAdd({ cardSize, ...htmlProps }: Props & BoxProps) {
  return (
    <FileBox className={`${cardSize} file-box`} {...htmlProps}>
      <AddIcon fontSize="large" />
    </FileBox>
  );
}

export default CardAdd;
