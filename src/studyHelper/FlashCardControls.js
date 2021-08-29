import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FlipIcon from "@material-ui/icons/Flip";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { Tooltip } from "@material-ui/core";

function FlashCardControls(props) {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Tooltip title="Shuffle">
        <ShuffleIcon
          className={`flashcard-control ${
            props.isShuffled ? "flashcard-control-active" : null
          }`}
          onClick={() => {
            props.shuffle();
          }}
        />
      </Tooltip>

      <Tooltip title="Previous">
        <ArrowBackIcon
          className="flashcard-control"
          onClick={(e) => {
            props.decrement();
          }}
        />
      </Tooltip>

      <Tooltip title="Flip">
        <FlipIcon
          className="flashcard-control"
          onClick={(e) => {
            props.flip();
          }}
        />
      </Tooltip>
      <Tooltip title="Next">
        <ArrowForwardIcon
          className="flashcard-control"
          onClick={(e) => {
            props.increment();
          }}
        />
      </Tooltip>
    </div>
  );
}

export default FlashCardControls;
