import { Grid, TextField } from "@material-ui/core";
import { Field, FieldArray, Formik } from "formik";
import React from "react";

function EditTerm(props) {
  let currentTerm = `terms.${props.index}`;
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Field
          as={TextField}
          variant="outlined"
          name={`${currentTerm}.termTitle`}
        />
      </Grid>
      <Grid item xs={12}>
        {/* questions container */}
        <Grid container>
          <FieldArray
            name={`${currentTerm}.questions`}
            render={(arrayHelpers) => (
              <React.Fragment>
                {props.formik.values.terms[props.index].questions.map(
                  (question, questionIndex) => {
                    let currentQuestion = `${currentTerm}.questions.${questionIndex}`;
                    return (
                      <React.Fragment>
                        <Grid item xs={12} lg={6}>
                          <Field
                            as={TextField}
                            variant="outlined"
                            name={`${currentQuestion}.question`}
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field
                            as={TextField}
                            variant="outlined"
                            name={`${currentQuestion}.answer`}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  }
                )}
              </React.Fragment>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EditTerm;
