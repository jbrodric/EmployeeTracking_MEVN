import { Form } from "react-router-dom";
import { Paper, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Unstable_Grid2";

const HeaderPaper = styled((props) => (
  <Paper
    sx={{
      fontSize: "0.9rem",
      minHeight: "64px",
      margin: "1% 3% 1% 3%",
      padding: "1%",
    }}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgb(243, 243, 243)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
}));

export default function RecordHeader(props) {
  const { recordName, objectName } = props;

  return (
    <HeaderPaper variant="elevation" elevation={8}>
      <Box
        id="header-container"
        sx={{ display: "flex", flexFlow: "row", height: "100%" }}
      >
        <Box
          id="header-icon"
          className="center-content"
          sx={{ flex: "0 1 auto", marginRight: "10px" }}
        >
          <WorkIcon
            fontSize="large"
            sx={{
              color: "rgb(255,255,255)",
              backgroundColor: "rgb(25, 118, 210)",
              borderRadius: "5px",
              padding: "6px",
            }}
          />
        </Box>
        <Box id="header-grid" sx={{ flex: "1 1 auto" }}>
          <Grid container rowSpacing={0} columnSpacing={0}>
            <Grid container xs={9}>
              <Grid xs={12}>
                <Typography sx={{ margin: "0px" }}>{objectName}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  variant="h6"
                  component="div"
                  noWrap={true}
                  width="600px"
                  sx={{ fontWeight: "bold", margin: "0px" }}
                >
                  {recordName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Form action="edit">
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ margin: "10px", backgroundColor: "white" }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Form>
              <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                  if (
                    !window.confirm(
                      "Please confirm you want to delete this record."
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ margin: "10px", backgroundColor: "white" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </HeaderPaper>
  );
}
