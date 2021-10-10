import CircularProgress from "@material-ui/core/CircularProgress";

function CenteredSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        color="white"
        size={50}
        style={{ height: "30%", marginTop: "30vh" }}
      />
    </div>
  );
}

export default CenteredSpinner;
