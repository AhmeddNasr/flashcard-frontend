import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";

function CenteredSpinner(props) {
  //center the spinner
  useEffect(() => {
    let centeredSpinnerElement = document.getElementById(
      "centered-spinner-container"
    );
    const positionFromTop = centeredSpinnerElement.getBoundingClientRect().top;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    centeredSpinnerElement.style.height = `${vh - positionFromTop - 40}px`;
  }, []);

  return (
    <div
      id="centered-spinner-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "row",
        width: "100%",
      }}
    >
      {(() => {
        if (props.message) {
          return <Typography variant="h5" style={{marginRight: "20px"}}>{props.message}</Typography>;
        }
      })()}

      <CircularProgress
        color="white"
        size={50}
        // style={{ marginTop: "30vh" }}
      />
    </div>
  );
}

export default CenteredSpinner;
