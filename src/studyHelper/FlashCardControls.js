import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FlipIcon from '@material-ui/icons/Flip';
function FlashCardControls(props) {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <ArrowBackIcon
        className="flashcard-control"
        onClick={(e) => {
          props.decrement();
        }}
      />
      <FlipIcon 
        className="flashcard-control"
        onClick={(e) => {
          props.flip();
        }}
      />
      <ArrowForwardIcon
        className="flashcard-control"
        onClick={(e) => {
          props.increment();
        }}
      />
    </div>
  );
}

export default FlashCardControls;
