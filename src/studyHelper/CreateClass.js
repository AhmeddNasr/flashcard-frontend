import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@material-ui/core";
import { useFormik } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import "./styles/create-class.css";

function CreateClassTermFields(props) {
  const [questionCount, setQuestionCount] = useState(1);
  let cardFields = [];
  // setQuestionCount(0);
  for (let i = 0; i < props.count; i++) {
    cardFields.push(
      <Grid key={`term-field-${i}`} item sm={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: "0px" }}>{`Term - ${i + 1}`}</h3>
          <IconButton tabindex="-1" size="small">
            <DeleteIcon />
          </IconButton>
        </div>
        <TextField
          variant="outlined"
          style={{ marginBottom: "12px" }}
          fullWidth
          label="Term Name"
          placeholder="e.g. World War 2"
        />
        <CreateClassQuestionFields i={i} count={questionCount} />
        <Divider />
      </Grid>
    );
  }
  return cardFields;
}

function CreateClassQuestionFields(props) {
  let questionFields = [];
  for (let i = 0; i < props.count; i++) {
    questionFields.push(
      <Grid container spacing={0} direction="column">
        <Grid item key={`term-field-${props.i}-question-field-${props.count}`}>
          <TextField
            variant="outlined"
            fullWidth
            label="Question"
            placeholder="e.g. When did it start?"
          />
        </Grid>
        <Grid item key={`term-field-${props.i}-answer-field-${props.count}`}>
          <TextField
            variant="outlined"
            fullWidth
            label="Answer"
            placeholder="e.g. September 1, 1939"
          />
        </Grid>
      </Grid>
    );
  }
  return questionFields;
}

function CreateClass() {
  const [termCount, setTermCount] = useState(1);
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: {
      class_name: "",
      class_description: "",
      terms: [],
      questions: [[]],
    },
    onSubmit: (values) => {
      setFormValues(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div id="create-class">
      <div>
        <h1>Create A New Class</h1>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          style={{ width: "300px" }}
        >
          <Grid container spacing={3} direction="column">
            <Grid item sm={12}>
              <TextField
                onChange={formik.handleChange}
                id="class_name"
                name="class_name"
                fullWidth
                label="Class Name"
                variant="outlined"
                
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                multiline
                label="Class Description"
                variant="outlined"
                placeholder="Describe The Class"
              />
            </Grid>
            <CreateClassTermFields count={termCount} />
            <Grid item sm={12} align="center">
              <Button
                onClick={() => setTermCount(termCount + 1)}
                variant="contained"
                color="secondary"
                style={{ borderRadius: "25px" }}
              >
                Add Term
              </Button>
            </Grid>
            <Grid item sm={12} align="center">
              <Button type="submit" variant="contained" color="primary">
                Create Class
              </Button>
            </Grid>
          </Grid>
        </form>
        <div></div>
        hi
        {formValues}
      </div>
    </div>
  );
}

export default CreateClass;
