import { TextField, Button, Grid } from "@material-ui/core";
import { Field, useFormik, FormikProvider } from "formik";
// import { white } from "@material-ui/core/colors";
import "./styles/create-class.css";
import * as Yup from "yup";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function formatValues(values) {
  // let termArray = [];
  // let questionArray = [];
  // for (let i = 0; i < values.terms.length; i++) {
  //   if (values.terms[i].term !== "") {
  //     termArray.push(values.terms[i].term);
  //     questionArray.push(values.terms[i].questions);
  //   }
  // }
  return {
    class_name: values.class_name,
    class_description: values.class_description,
    // terms: termArray,
    // questions: questionArray,
  };
}

//submit form
function handleSubmit(values, setSubmitting, history) {
  setSubmitting(true);
  fetch("http://localhost:8080/api/folders/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(formatValues(values)),
  })
    //TODO
    .then((result) => result.json())
    .then((data) => history.push(`/study/class/${data.folder_id}/edit`))
    .catch((err) => console.log(err));
}

function CreateClass() {
  const history = useHistory();
  // TODO custom textField
  // function isValidQuestionAnswer(message) {
  //   return this.test("isValidQuestionAnswer", message, function (value) {
  //     const { path, createError } = this;
  //     if (value.term) {
  //       //TODO check both answer and question at the same time
  //       for (let i = 0; i < value.questions.length; i++) {
  //         let currentQuestion = `${path}.questions[${i}]`;
  //         if (!value.questions[i].question) {
  //           return createError({
  //             path: `${currentQuestion}.question`,
  //             message: "Question can not be empty",
  //           });
  //         }
  //         if (!value.questions[i].answer) {
  //           return createError({
  //             path: `${currentQuestion}.answer`,
  //             message: "Answer can not be empty",
  //           });
  //         }
  //       }
  //     }
  //     return true;
  //   });
  // }
  // Yup.addMethod(Yup.object, "isValidQuestionAnswer", isValidQuestionAnswer);

  const [submitting, setSubmitting] = useState(false);

  const FormSchema = Yup.object().shape({
    class_name: Yup.string()
      .trim()
      .min(3, "Class Name Is Too Short!")
      .max(19, "Too Long")
      .required("class name can not be empty"),
    class_description: Yup.string().max(200, "Too Long! (Max 200 Character)"),
    // terms: Yup.array().of(Yup.object().isValidQuestionAnswer()),
  });
  //Formik setup
  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      class_name: "",
      class_description: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit(values, setSubmitting, history);
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
                    : " "
                }
                error={
                  formik.errors.class_name && formik.touched.class_name
                    ? true
                    : false
                }
                name="class_name"
                placeholder="e.g. History (Grade 12)"
                maxWidth="100%"
                label="Class Name*"
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
                name="class_description"
                placeholder="e.g. dates of major events"
                label="Class Description"
                variant="outlined"
              />
            </Grid>
            {/* Submit button */}
            <Grid item sm={12} align="center">
              {(() => {
                if (Object.keys(formik.errors).length === 0) {
                  return (
                    <Button type="submit" variant="contained" disabled={submitting ? true : false}>
                      Create Class
                    </Button>
                  );
                } else {
                  return (
                    <Button variant="contained" disabled>
                      Create Class
                    </Button>
                  );
                }
              })()}
            </Grid>
          </Grid>
        </form>
        {/* Debugging form values */}
        {/* <pre>{JSON.stringify(formik.errors, null, 2, 0)}</pre> */}
        {/* <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre> */}
      </FormikProvider>
    </div>
  );
}

export default CreateClass;
