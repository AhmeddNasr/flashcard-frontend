import { Button, FormControlLabel, FormGroup, Switch } from "@material-ui/core";

function FlashCardSettingsHome(props) {
  return (
    <form>
      <FormGroup column>
        <FormControlLabel
          control={
            <Switch
              checked={props.shuffleCards}
              color="secondary"
              name="shuffleCards"
              onChange={(e) => {
                props.setShuffleCards(e.target.checked);
              }}
            />
          }
          label="Shuffle cards"
        />
        <FormControlLabel
          control={
            <Switch
              checked={props.isBackFaceDefault}
              color="secondary"
              name="defaultFace"
              onChange={(e) => {
                props.setIsBackFaceDefault(e.target.checked);
                props.setCardFront(!e.target.checked);
              }}
            />
          }
          label="Show Answer First"
        />
      </FormGroup>
      <Button onClick={() => props.setCurrentPage(1)} style={{ marginTop: "5px" }} variant="outlined">
        Customize playlist
      </Button>
    </form>
  );
}

export default FlashCardSettingsHome;
