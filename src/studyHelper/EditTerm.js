import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { FastField, FieldArray } from "formik";
import React from "react";
import { Delete } from "@material-ui/icons";
import InputImageButton from "./InputImageButton";
import EditTermQuestionInput from "./EditTermQuestionInput";

function EditTerm(props) {
  let currentTerm = `terms.${props.index}`;

  // one function for removing either terms or questions depending on arrayhelpers passed.
  const handleClick = function (arrayHelpers, index) {
    arrayHelpers.remove(index);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Typography variant="h4">{`#${props.index + 1}`}</Typography>

          {/* only render delete button if more than 1 term exists */}
          {props.formik.values.terms.length > 1 && (
            <IconButton
              onClick={() => handleClick(props.arrayHelpers, props.index)}
              size="large"
            >
              <Delete />
            </IconButton>
          )}
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
                {/* for each question in the term */}
                {props.formik.values.terms[props.index].questions.map(
                  (question, questionIndex) => {
                    let currentQuestion = `${currentTerm}.questions.${questionIndex}`;
                    return (
                      <React.Fragment>
                        <Grid
                          item
                          xs={1}
                          lg={1}
                          // TODO prevent repeating me
                          className={`edit-class-answer-delete ${
                            props.formik.values.terms[props.index].questions
                              .length === 1
                              ? "hidden"
                              : ""
                          }`}
                        >
                          <IconButton
                            onClick={() =>
                              handleClick(arrayHelpers, questionIndex)
                            }
                            size="large"
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                          lg={5}
                          className="edit-class-question"
                        >
                          <EditTermQuestionInput name={`${currentQuestion}.question`}/>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          lg={1}
                          // TODO prevent repeating me
                          className={`edit-class-question-delete ${
                            props.formik.values.terms[props.index].questions
                              .length === 1
                              ? "hidden"
                              : ""
                          }`}
                        >
                          <IconButton
                            onClick={() =>
                              handleClick(arrayHelpers, questionIndex)
                            }
                            size="large"
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                        
                        <Grid item xs={10} lg={5} className="edit-class-answer">
                          <EditTermQuestionInput name={`${currentQuestion}.answer`}/>
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            onClick={() =>
                              arrayHelpers.push({ question: "", answer: "" })
                            }
                          >
                            Add
                          </Button>
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
