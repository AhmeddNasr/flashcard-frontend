import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useFormik, FormikProvider, FieldArray, FastField } from "formik";
import React from "react";
import EditTerm from "./EditTerm";

// function formatValues(values) {
//   let termArray = [];
//   let questionArray = [];
//   // for (let i = 0; i < values.terms.length; i++) {
//   //   if (values.terms[i].term !== "") {
//   //     termArray.push(values.terms[i].term);
//   //     questionArray.push(values.terms[i].questions);
//   //     answersArray.push(values.terms[i].)
//   //   }
//   // }
//   for (let i = 0; i < values.terms.length; i++) {
//     let currentTerm = values.terms[i];
//     console.log(currentTerm);
//     termArray.push(currentTerm.termTitle.trim());
//     for (let y = 0; y < currentTerm.questions.length; y++) {
//       questionArray.push(currentTerm.questions[y]);
//     }
//   }

//   return {
//     class_name: values.folderName.trim(),
//     class_description: values.folderDescription.trim(),
//     terms: termArray,
//     questions: questionArray,
//   };
// }

function handleSubmit(values) {
  fetch("http://localhost:8080/api/terms/1", {
    credentials: "include",
    method: "POST",
    headers: { "Content-type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  })
    //TODO
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

const emptyTerm = {
  termTitle: "",
  questions: [{ question: "", answer: "" }],
};
function EditClassForm(props) {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      folderName: "Folder name",
      folderDescription: "folder dedscription lorem impsum",
      terms: props.data.length === 0 ? [emptyTerm] : props.data,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function addEmptyTerm(arrayHelpers) {
    arrayHelpers.push(emptyTerm);
    console.log(formik.values);
  }

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <Grid
          container
          direction="column"
          style={{ marginTop: "40px" }}
          spacing={3}
        >
          <Grid item>
            <Typography variant="h3">Edit Class</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">Class info</Typography>
          </Grid>
          <Grid item>
            <FastField
              name="folderName"
              as={TextField}
              variant="outlined"
              helperText="Class Name"
            />
          </Grid>
          <Grid item>
            <FastField
              name="folderDescription"
              as={TextField}
              variant="outlined"
              multiline
              helperText="Class Description"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" style={{ marginTop: "15px" }}>
              Edit Terms
            </Typography>
          </Grid>
          <FieldArray
            name="terms"
            render={(arrayHelpers) =>
              formik.values.terms.map((term, index) => {
                return (
                  // term box
                  <React.Fragment>
                    {index === 0 && (
                      <Grid>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{ padding: "10px" }}
                          onClick={() => addEmptyTerm(arrayHelpers)}
                        >
                          Add new term
                        </Button>
                      </Grid>
                    )}
                    <Grid className="term-box" item key={`term-${index}`}>
                      <EditTerm
                        arrayHelpers={arrayHelpers}
                        index={index}
                        formik={formik}
                      />
                    </Grid>
                  </React.Fragment>
                );
              })
            }
          />
          <Grid item style={{ margin: "10px auto" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit Changes
            </Button>
          </Grid>
        </Grid>
        <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre>
      </form>
    </FormikProvider>
  );
}

export default EditClassForm;
