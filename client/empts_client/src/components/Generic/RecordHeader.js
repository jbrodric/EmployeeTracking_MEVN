import { Form, useNavigate } from "react-router-dom";
import { Paper, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const { recordName, objectName, icon, buttons, backURL } = props;
  const navigate = useNavigate();
  const ButtonMap = {
    Edit: (
      <Box key="btn-edit">
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
      </Box>
    ),
    Delete: (
      <Box key="btn-delete">
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (
              !window.confirm("Please confirm you want to delete this record.")
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
      </Box>
    ),
    Cancel: (
      <Box key="btn-cancel">
        <Button
          variant="outlined"
          type="button"
          sx={{ margin: "10px", backgroundColor: "white" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </Box>
    ),
    Back: (
      <Box key="btn-back">
        <Button
          variant="outlined"
          type="button"
          sx={{ margin: "10px", backgroundColor: "white" }}
          onClick={() => {
            navigate(backURL);
          }}
        >
          Back
        </Button>
      </Box>
    ),
    Save: (
      <Box key="btn-save">
        <Button
          variant="outlined"
          type="submit"
          sx={{ margin: "10px", backgroundColor: "white" }}
        >
          Save
        </Button>
      </Box>
    ),
  };

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
          {icon}
        </Box>
        <Box id="header-grid" sx={{ flex: "1 1 auto" }}>
          <Grid container rowSpacing={0} columnSpacing={0}>
            <Grid container xs={6}>
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
                  {recordName ? recordName : "New Record"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              {buttons.map((button, index) => {
                return ButtonMap[button];
              })}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </HeaderPaper>
  );
}
