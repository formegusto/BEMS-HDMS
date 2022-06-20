import { Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  size: "big" | "small";
  contents: {
    id?: number;
    name?: string;
    image?: string;
  };
  selectId: number | null;
  selectEvent: (id?: number) => void;
  updateAction: () => void;
};

function Card({ size, contents, selectId, selectEvent, updateAction }: Props) {
  return (
    <Box
      className={selectId && selectId === contents.id ? "active" : ""}
      sx={{
        position: "relative",

        overflow: "hidden",
        cursor: "pointer",

        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },

        ...(size === "big"
          ? {
              borderRadius: "16px 16px 0 0",
              width: 295,
              height: 295,
              margin: "0 10px 32px 0",
              "&:hover": {
                "& .name": {
                  height: 295,
                },
                "& .options": {
                  display: "block",
                },
              },
              "&.active": {
                "& .name": {
                  height: 295,
                },
                "& .options": {
                  display: "block",
                },
              },
            }
          : {
              width: 200,
              height: 100,
              margin: "0 10px 10px 0",
              "&:hover": {
                "& .name": {
                  borderColor: "#26446D",
                  color: "#26446D",
                },
                "& .options": {
                  display: "block",
                },
              },
              "&.active": {
                "& .name": {
                  borderColor: "#26446D",
                  color: "#26446D",
                },
                "& .options": {
                  display: "block",
                },
              },
            }),
      }}
    >
      {size === "big" ? (
        <>
          <img src={`http://localhost:8080${contents.image}`} alt="이미지" />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(51, 51, 51, 0.3)",
            }}
            className="shadow"
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#26446D",
              color: "#FFF",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "12px",
              lineHeight: "14px",
              transition: "0.35s",
            }}
            className="name"
          >
            {contents.name}
            <Box
              className="options"
              sx={{
                mt: 2,
                display: "none",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FFF",
                  mr: 1,
                }}
                onClick={() => selectEvent(contents.id)}
              >
                <VisibilityIcon
                  sx={{
                    color: "#fff",
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FFF",
                }}
                onClick={() => updateAction()}
              >
                <EditIcon
                  sx={{
                    color: "#fff",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#333",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "19px",
              border: "1px solid #EEEEEE",
              boxSizing: "border-box",
            }}
            className="name"
          >
            {contents.name}
            <Box
              className="options"
              sx={{
                mt: 2,
                display: "none",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#26446D",
                  mr: 1,
                }}
                onClick={() => selectEvent(contents.id)}
              >
                <VisibilityIcon
                  sx={{
                    color: "#26446D",
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#26446D",
                }}
                onClick={() => updateAction()}
              >
                <EditIcon
                  sx={{
                    color: "#26446D",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Card;
