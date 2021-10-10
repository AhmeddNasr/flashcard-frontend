import { Grid, TextField } from "@material-ui/core";
import { Field, useFormik, FormikProvider, FieldArray } from "formik";
import EditTerm from "./EditTerm";

function EditClassForm(props) {
  const formik = useFormik({
    initialValues: {
      terms: props.data,
    },
  });

  return (
    <FormikProvider value={formik}>
      <Grid
        container
        direction="column"
        style={{ maxWidth: "768px" }}
      >
        <FieldArray
          name="terms"
          render={(arrayHelpers) =>
            formik.values.terms.map((term, index) => {
              return (
                // term box
                <Grid className="term-box" item key={`term-${index}`}>
                  <EditTerm index={index} formik={formik} />
                </Grid>
              );
            })
          }
        />
      </Grid>
      <pre>{JSON.stringify(formik.values, null, 2, 0)}</pre>
    </FormikProvider>
  );
}

export default EditClassForm;
