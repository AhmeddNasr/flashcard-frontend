import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { FastField, Field, FieldArray, Formik } from "formik";
import React from "react";
import { Delete } from "@material-ui/icons";

function EditTerm(props) {
  let currentTerm = `terms.${props.index}`;
  const handleClick = function (arrayHelpers, index) {
    arrayHelpers.remove(index);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Typography variant="h4">{`#${props.index + 1}`}</Typography>
          <IconButton onClick={() => {props.arrayHelpers.remove(props.index)}}><Delete /></IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FastField
          as={TextField}
          variant="outlined"
          name={`${currentTerm}.termTitle`}
          fullWidth
          multiline
          helperText="Term"
        />
      </Grid>
      <Grid item xs={12}>
        {/* questions container */}
        <Grid container spacing={1}>
          <FieldArray
            name={`${currentTerm}.questions`}
            render={(arrayHelpers) => (
              <React.Fragment>
                {props.formik.values.terms[props.index].questions.map(
                  (question, questionIndex) => {
                    let currentQuestion = `${currentTerm}.questions.${questionIndex}`;
                    return (
                      <React.Fragment>
                        <Grid
                          item
                          xs={10}
                          lg={5}
                          className="edit-class-question"
                        >
                          <FastField
                            as={TextField}
                            variant="outlined"
                            name={`${currentQuestion}.question`}
                            multiline
                            fullWidth
                            helperText="question"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          lg={1}
                          className="edit-class-question-delete"
                        >
                          <IconButton
                            onClick={() =>
                              handleClick(arrayHelpers, questionIndex)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} lg={6} className="edit-class-answer">
                          <FastField
                            as={TextField}
                            variant="outlined"
                            name={`${currentQuestion}.answer`}
                            multiline
                            fullWidth
                            helperText="answer"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          lg={1}
                          className="edit-class-answer-delete"
                        >
                          <IconButton
                            onClick={() =>
                              handleClick(arrayHelpers, questionIndex)
                            }
                          >
                            <Delete />
                          </IconButton>
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
