import { Form } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";

const StyledPaper = styled((props) => (
  <Paper
    sx={{
      fontSize: "0.9rem",
      minHeight: "64px",
      margin: "1% 3% 1% 3%",
      padding: "1%",
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgb(243, 243, 243)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
}));

export default function RecordHeader() {
  return (
    <StyledPaper variant="elevation" elevation={8}>
      <WorkIcon />
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
    </StyledPaper>
  );
}
