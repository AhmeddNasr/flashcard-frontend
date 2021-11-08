import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import {
  Field,
  useFormik,
  FormikProvider,
  FieldArray,
  FastField,
} from "formik";
import React from "react";
import EditTerm from "./EditTerm";

function EditClassForm(props) {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      folderName: "Folder name",
      folderDescription: "folder dedscription lorem impsum",
      terms: props.data,
    },
  });

  console.log("render");

  return (
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
                    <EditTerm index={index} formik={formik} />
                  </Grid>
                </React.Fragment>
              );
            })
          }
        />
        <Grid item style={{ margin: "10px auto" }}>
          <Button variant="contained" color="primary">
            Submit Changes
          </Button>
        </Grid>
      </Grid>
      {/* <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre> */}
    </FormikProvider>
  );
}

export default EditClassForm;
