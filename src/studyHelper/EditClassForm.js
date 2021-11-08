import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Field,
  useFormik,
  FormikProvider,
  FieldArray,
  FastField,
} from "formik";
import React from "react";
import EditTerm from "./EditTerm";

const handleSubmit = (values) => {
  // format values before submitting
  let questionsArray = [];
  let answersArray = [];
  let termsArray = [];

  if (values.terms.length === 0) {
    alert('no');
  } else {
    for (let i = 0; i < values.terms.length; i++) {
      termsArray.push(values.terms[i].termTitle);
      for(let y = 0; y < values.terms[i].questions.length; y++) {
        questionsArray.push(values.terms[i].questions[y].question);
        answersArray.push(values.terms[i].questions[y].answer)
      }
    }
  }
};

function EditClassForm(props) {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      folderName: "Folder name",
      folderDescription: "folder dedscription lorem impsum",
      terms: props.data,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(props.data);

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <FormikProvider value={formik}>
        <Grid
          container
          direction="column"
          style={{ marginTop: "40px" }}
          spacing={3}
        >
          <Grid item>
            <Typography variant="h2">Edit Class</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">Class info</Typography>
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
            <Typography variant="h4" style={{ marginTop: "15px" }}>
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
                    <Grid className="term-box" item key={`term-${index}`}>
                      <EditTerm
                        index={index}
                        formik={formik}
                        arrayHelpers={arrayHelpers}
                      />
                    </Grid>
                  </React.Fragment>
                );
              })
            }
          />
          <Grid item style={{ margin: "10px auto" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit Changes
            </Button>
          </Grid>
        </Grid>
        <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre>
      </FormikProvider>
    </form>
  );
}

export default EditClassForm;
