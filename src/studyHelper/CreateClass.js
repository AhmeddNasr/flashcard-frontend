import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { Field, useFormik, FormikProvider, FieldArray } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { white } from "@material-ui/core/colors";
import "./styles/create-class.css";
import * as Yup from "yup";
import React from "react";

//TODO
function CreateClassTermFieldsBAK(props) {
  let formik = props.formik;
  return (
    // term array
    <FieldArray
      name="terms"
      render={(arrayHelpers) => (
        <React.Fragment>
          {/* Term name array */}
          {formik.values.terms.map((term, index) => (
            <React.Fragment>
              <Field key={`term-${index}`} name={`terms.${index}.term`} />
              <FieldArray
                name={`terms.${index}.questions`}
                render={(arrayHelpers) => (
                  <React.Fragment>
                    {formik.values.terms[index].questions.map(
                      (question, qIndex) => (
                        // Alter question object of the term at index of index
                        <div key={`question-${qIndex}-term-${index}`}>
                          <Field
                            name={`terms.${index}.questions.${qIndex}.question`}
                          />
                          <Field
                            name={`terms.${index}.questions.${qIndex}.answer`}
                          />
                          {/* REMOVE BUTTON */}
                          {/* If only one question exists don't render the button */}
                          {formik.values.terms[index].questions.length ===
                          1 ? null : (
                            <Button
                              onClick={() => {
                                arrayHelpers.remove(qIndex);
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      )
                    )}
                    <Button
                      onClick={() => {
                        arrayHelpers.push({});
                      }}
                    >
                      Add Question
                    </Button>
                  </React.Fragment>
                )}
              />
            </React.Fragment>
          ))}
          <Button
            onClick={() => {
              arrayHelpers.push({
                term: "",
                questions: [""],
              });
            }}
          >
            Add Term
          </Button>
        </React.Fragment>
      )}
    />
  );
}

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
  // create term and call on question fields
  for (let i = 0; i < props.count; i++) {
    cardFields.push(
      <Grid key={`term-field-${i}`} item xs={12}>
        {/* spacing between terms */}
        <Grid container direction="column" spacing={3}>
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
          <Field
            as={TextField}
            name={`terms.term_name[${i}]`}
            // onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "25px" }}
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
          <Grid item xs={12} style={{ padding: "12px 0" }}>
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
      </Grid>
    );
  }
  return cardFields;
}
//create question fields
function CreateClassQuestionFields(props) {
  let questionFields = [];
  for (let i = 0; i < props.count; i++) {
    questionFields.push(
      // generate a question/answer field for every question the term has
      <Grid
        style={{ padding: "0", marginTop: `${i < 1 ? "0px" : "20px"}` }}
        align="center"
        key={`question-answer-group-field-${props.termIndex}-${i}`}
        item
        sm={12}
      >
        {/* spacing between questions and answers */}
        <Grid container direction="column">
          {/* question field */}
          <Grid
            item
            xs={12}
            key={`term-field-${props.termIndex}-question-field-${i}`}
          >
            <Field
              as={TextField}
              multiline
              name={`terms.questions[${props.termIndex}][${i}]`}
              // onChange={props.onChange}
              variant="outlined"
              fullWidth
              label={`Question #${i + 1}`}
              placeholder={
                i % 2 === 0
                  ? "e.g. When did it start?"
                  : "e.g. When did it end?"
              }
            />
          </Grid>
          {/* answer field */}
          <Grid
            align="center"
            item
            key={`term-field-${props.termIndex}-answer-field-${i}`}
            style={{ marginTop: "10px" }}
          >
            <Field
              as={TextField}
              multiline
              name={`terms.answers[${props.termIndex}][${i}]`}
              onChange={props.onChange}
              variant="outlined"
              fullWidth
              label={`Answer #${i + 1}`}
              placeholder={
                i % 2 === 0 ? "e.g. September 1, 1939" : "September 2, 1945"
              }
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return questionFields;
}
//submit form
function handleSubmit(values) {
  fetch("http://localhost:8080/api/folders/8777", {
    credentials: "include",
    method: "POST",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
// function cleanBody(values) {
//   for (let i = 0; i < values.questions.length; i++) {}
// }

// function validateBody(values) {
//   let isBodyFilledCorrectly = true;
//   //for each term
//   for (let i = 0; i < values.terms.length; i++) {
//     //if none of the values are filled
//     if (values.terms[i].length !== 0 && ) {
//       return;
//     }
//   }
// }

function CreateClass() {
  const [termCount, setTermCount] = useState(1);
  // eslint-disable-next-line
  const [formValues, setFormValues] = useState(null);

  const FormSchema = Yup.object().shape({
    class_name: Yup.string()
      .min(3, "Class Name Is Too Short!")
      .required("class name can not be empty"),
  });
  //Formik setup
  const formik = useFormik({
    initialValues: {
      class_name: "",
      class_description: "",
      // terms: [],
      terms: [
        {
          term: "",
          questions: [""],
        },
      ],
      //  {
      //each index in term_name maps to an array at the same index in questions and answers
      // term_name: [''],
      // questions: [['']],
      // answers: [['']],
      // },
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      setFormValues(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      id="create-class"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ alignText: "center" }}>Create A New Class</h1>
      <FormikProvider value={formik}>
        <form
          id="create-class-form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3} direction="column" align="center">
            {/* class name text field */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <Field
                as={TextField}
                className={`create-class-class-info ${
                  formik.errors.class_name && formik.touched.class_name
                    ? "error"
                    : ""
                }`}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                name="class_name"
                placeholder="e.g. History (Grade 12)"
                maxWidth="100%"
                label="Class Name"
                variant="outlined"
                fullWidth
              />
              <div>{formik.errors.class_name}</div>
            </Grid>
            {/* class description text field */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <Field
                as={TextField}
                className="create-class-class-info"
                fullWidth
                multiline
                // onChange={formik.handleChange}
                name="class_description"
                placeholder="e.g. dates of major events"
                label="Class Description"
                variant="outlined"
              />
            </Grid>
            {/* term fields */}
            {/*  */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <Accordion className="create-class-accordion">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 style={{ margin: "0px" }}>Add Some Terms (Optional)</h3>
                </AccordionSummary>
                {/*  */}
                <AccordionDetails style={{ padding: " 0 20px" }}>
                  <Grid container justifyContent="center">
                    {/* <CreateClassTermFields
                      count={termCount}
                      onChange={formik.handleChange}
                    /> */}
                    {/* Add term button */}
                    <Grid item sm={12}>
                      <Button
                        onClick={() => setTermCount(termCount + 1)}
                        variant="contained"
                        color="secondary"
                        style={{ margin: "10px 0" }}
                      >
                        Add Another Term
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/* Submit button */}
            <Grid item sm={12} align="center">
              <Button type="submit" variant="contained">
                Create Class
              </Button>
              <CreateClassTermFieldsBAK formik={formik} />
            </Grid>
          </Grid>
        </form>
        <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre>
      </FormikProvider>
    </div>
  );
}

export default CreateClass;
