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
// import { white } from "@material-ui/core/colors";
import "./styles/create-class.css";

function CreateClassTermFields(props) {
  const [questionCount, setQuestionCount] = useState([1]);
  if (questionCount.length !== props.count) {
    let arr = [...questionCount];
    while (arr.length !== props.count) {
      arr.push(1);
    }
    setQuestionCount(arr);
  }
  let cardFields = [];
  const handleChange = props.onChange;
  // setQuestionCount(0);
  for (let i = 0; i < props.count; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    cardFields.push(
      <Grid key={`term-field-${i}`} item sm={12}>
        {/* spacing between terms */}
        <Grid container spacing={3}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: "0, 0, 4px, 0" }}>{`Term - ${i + 1}`}</h3>
            <IconButton tabIndex="-1" size="small">
              <DeleteIcon />
            </IconButton>
          </div>
          {/* term name text field */}
          <TextField
            name={`terms.term_name[${i}]`}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "12px" }}
            fullWidth
            label="Term Name"
            placeholder="e.g. World War 2"
          />
          {/* create question fields depending on questionCount state with the index of the current term */}
          <CreateClassQuestionFields
            termIndex={i}
            count={questionCount[i]}
            onChange={props.onChange}
          />
          {/* add a question button by increasing the questionCount at index of current term */}
          <Button
            variant="contained"
            style={{ width: "100%" }}
            onClick={() => {
              let arr = questionCount;
              arr[i] = arr[i] + 1;
              setQuestionCount([...arr]);
            }}
          >
            Add Another Question
          </Button>
        </Grid>
      </Grid>
    );
  }
  return cardFields;
}

function CreateClassQuestionFields(props) {
  let questionFields = [];
  for (let i = 0; i < props.count; i++) {
    questionFields.push(
      // generate a question/answer field for every question the term has
      <Grid key={`question-answer-group-field-${props.termIndex}-${i}`} item sm={12}>
        {/* spacing between questions and answers */}
        <Grid container spacing={2} direction="column">
          {/* question field */}
          <Grid
            item
            key={`term-field-${props.termIndex}-question-field-${i}`}
          >
            <TextField
              multiline
              name={`terms.questions[${props.termIndex}][${i}]`}
              onChange={props.onChange}
              variant="outlined"
              fullWidth
              label={`Question #${i + 1}`}
              placeholder="e.g. When did it start?"
            />
          </Grid>
          {/* answer field */}
          <Grid
            item
            key={`term-field-${props.termIndex}-answer-field-${i}`}
          >
            <TextField
              multiline
              name={`terms.answers[${props.termIndex}][${i}]`}
              onChange={props.onChange}
              variant="outlined"
              fullWidth
              label={`Answer #${i + 1}`}
              placeholder="e.g. September 1, 1939"
            />
          </Grid>
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
      // terms: [],

      terms: {
        term_name: [],
        questions: [[]],
        answers: [[]],
      },
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
            {/* class name text field */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <TextField
                onChange={formik.handleChange}
                name="class_name"
                placeholder="e.g. History (Grade 12)"
                fullWidth
                label="Class Name"
                variant="outlined"
              />
            </Grid>
            {/* class description text field */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <TextField
                fullWidth
                multiline
                onChange={formik.handleChange}
                name="class_description"
                placeholder="e.g. dates of major events"
                label="Class Description"
                variant="outlined"
              />
            </Grid>
            {/* term fields */}
            <CreateClassTermFields
              count={termCount}
              onChange={formik.handleChange}
            />
            {/* Add term button */}
            <Grid item sm={12} align="center">
              <Button
                onClick={() => setTermCount(termCount + 1)}
                variant="contained"
                style={{ borderRadius: "25px" }}
              >
                Add Term
              </Button>
            </Grid>
            {/* Submit button */}
            <Grid item sm={12} align="center">
              <Button type="submit" variant="contained">
                Create Class
              </Button>
            </Grid>
          </Grid>
        </form>
        <div></div>
      </div>
      {formValues}
    </div>
  );
}

export default CreateClass;
