import WorkIcon from "@mui/icons-material/Work";

const JobMetadata = {
  objectName: "Job",
  getIcon: () => {
    return (
      <>
        <WorkIcon
          fontSize="large"
          sx={{
            color: "rgb(255,255,255)",
            backgroundColor: "rgb(25, 118, 210)",
            borderRadius: "5px",
            padding: "6px",
          }}
        />
      </>
    );
  },
};

export default JobMetadata;
