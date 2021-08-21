import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import { Field, useFormik, FormikProvider, FieldArray, useField } from "formik";
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
          {formik.values.terms.map((term, index) => {
            return (
              <Grid key={`term-field-${index}`} item xs={12}>
                <Grid container direction="column" spacing={3}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ margin: "0, 0, 4px, 0" }}>{`Term - ${
                      index + 1
                    }`}</h3>
                  </div>
                  <Field
                    as={TextField}
                    key={`term-${index}`}
                    name={`terms.${index}.term`}
                    multiline
                    fullWidth
                    variant="outlined"
                    label="Term Name"
                    placeholder="e.g. World War 2"
                    style={{ marginBottom: "25px" }}
                  />
                  {formik.values.terms.length === 1 ? null : (
                    <Button
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                    >
                      Remove Term
                    </Button>
                  )}
                  {/* Questions and answer */}
                  <FieldArray
                    name={`terms.${index}.questions`}
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {formik.values.terms[index].questions.map(
                          (question, qIndex) => {
                            return (
                              // Alter question object of the term at index of index
                              <Grid
                                item
                                sm={12}
                                align="center"
                                style={{
                                  padding: "0",
                                  marginTop: `${qIndex < 1 ? "0px" : "20px"}`,
                                }}
                                key={`question-${qIndex}-term-${index}`}
                              >
                                <Grid container direction="column">
                                  <Grid item xs={12} />
                                  <Field
                                    // error = {formik.errors.terms[index].questions[qIndex].question ? true : false}
                                    as={TextField}
                                    name={`terms.${index}.questions.${qIndex}.question`}
                                    disabled={
                                      formik.values.terms[index].term
                                        ? false
                                        : true
                                    }
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    placeholder={
                                      qIndex % 2 === 0
                                      ? "e.g. When did it start"
                                      : "e.g. When did it end"
                                    }
                                    label={`Question ${qIndex + 1}`}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  align="center"
                                  style={{ marginTop: "10px" }}
                                >
                                  <Field
                                    as={TextField}
                                    name={`terms.${index}.questions.${qIndex}.answer`}
                                    disabled={
                                      formik.values.terms[index].term
                                        ? false
                                        : true
                                    }
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    label={`Answer ${qIndex + 1}`}
                                    placeholder={qIndex % 2 === 0 
                                    ? "e.g. September 1, 1939"
                                    : "September 2, 1945"
                                    }
                                  />
                                </Grid>
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
                              </Grid>
                            );
                          }
                        )}
                        <Button style={{marginBottom: "15px"}} variant="contained" color="primary"
                          onClick={() => {
                            arrayHelpers.push({ question: "", answer: "" });
                          }}
                        >
                          Add Question
                        </Button>
                      </React.Fragment>
                    )}
                  />
                </Grid>
              </Grid>
            );
          })}
          <Button
          variant="contained"
          color="secondary"
          style={{ margin: "10px 0" }}
            onClick={() => {
              arrayHelpers.push({
                term: "",
                questions: [""],
              });
            }}
          >
            Add Another Term
          </Button>
        </React.Fragment>
      )}
    />
  );
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
function CreateClass() {
  const [termCount, setTermCount] = useState(1);
  // eslint-disable-next-line
  const [formValues, setFormValues] = useState(null);

  // TODO custom textField
  // const MyTextField = ({placeholder, ...props}) => {
  //   const [field, meta] = useField(props);
  //   const errorText = meta.error && meta.touched ? meta.error : ''
  //   return (
  //     <TextField
  //       placeholder = {placeholder}
  //       helperText = {errorText}
  //       {...field}
  //     />

  //   )
  // }

  function isValidQuestionAnswer(message) {
    return this.test("isValidQuestionAnswer", message, function (value) {
      const { path, createError } = this;
      if (value.term) {
        //TODO check both answer and question at the same time
        for (let i = 0; i < value.questions.length; i++) {
          let currentQuestion = `${path}.questions[${i}]`;
          if (!value.questions[i].question) {
            return createError({
              path: `${currentQuestion}.question`,
              message: "Question can not be empty",
            });
          }
          if (!value.questions[i].answer) {
            return createError({
              path: `${currentQuestion}.answer`,
              message: "Answer can not be empty",
            });
          }
        }
      }
      return true;
    });
  }
  Yup.addMethod(Yup.object, "isValidQuestionAnswer", isValidQuestionAnswer);

  const FormSchema = Yup.object().shape({
    class_name: Yup.string()
      .trim()
      .min(3, "Class Name Is Too Short!")
      .max(19, "Too Long")
      .required("class name can not be empty"),
    class_description: Yup.string().max(200, "Too Long! (Max 200 Character)"),
    terms: Yup.array().of(Yup.object().isValidQuestionAnswer()),
  });
  //Formik setup
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      class_name: "",
      class_description: "",
      // terms: [],
      terms: [
        {
          term: "",
          questions: [{ question: "", answer: "" }],
        },
      ],
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
                className={"create-class-class-info"}
                helperText={
                  formik.errors.class_name && formik.touched.class_name
                    ? formik.errors.class_name
                    : null
                }
                error={
                  formik.errors.class_name && formik.touched.class_name
                    ? true
                    : false
                }
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                name="class_name"
                placeholder="e.g. History (Grade 12)"
                maxWidth="100%"
                label="Class Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            {/* class description text field */}
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <Field
                as={TextField}
                className="create-class-class-info"
                helperText={
                  formik.errors.class_description &&
                  formik.touched.class_description
                    ? formik.errors.class_description
                    : null
                }
                error={
                  formik.errors.class_description &&
                  formik.touched.class_description
                    ? true
                    : false
                }
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
            <Grid item sm={12} style={{ padding: "12px 0" }}>
              <Accordion className="create-class-accordion">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h3 style={{ margin: "0px" }}>Add Some Terms (Optional)</h3>
                </AccordionSummary>
                <AccordionDetails style={{ padding: " 0 20px" }}>
                  <Grid container justifyContent="center">
                    <CreateClassTermFieldsBAK formik={formik} />
                    {/* Add term button */}
                    <Grid item sm={12}>
                      {/* <Button
                        onClick={() => setTermCount(termCount + 1)}
                        variant="contained"
                        color="secondary"
                        style={{ margin: "10px 0" }}
                      >
                        Add Another Term
                      </Button> */}
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
              {/* <CreateClassTermFieldsBAK formik={formik} /> */}
            </Grid>
          </Grid>
        </form>
        {/* <pre>{JSON.stringify(formik.errors, null, 2, 0)}</pre>
        <Divider width="100%" />
        <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre> */}
      </FormikProvider>
    </div>
  );
}

export default CreateClass;
