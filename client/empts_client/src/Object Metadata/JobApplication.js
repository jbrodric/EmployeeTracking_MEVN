import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const JobApplicationMetadata = {
  objectName: "Job Application",
  getIcon: () => {
    return (
      <>
        <DriveFileRenameOutlineIcon
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

export default JobApplicationMetadata;
