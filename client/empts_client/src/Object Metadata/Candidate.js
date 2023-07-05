import GroupIcon from "@mui/icons-material/Group";

const CandidateMetadata = {
  objectName: "Candidate",
  getIcon: () => {
    return (
      <>
        <GroupIcon
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

export default CandidateMetadata;
