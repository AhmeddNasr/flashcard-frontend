import { Button, Grid, TextField } from "@material-ui/core";
import { Field, FieldArray } from "formik";
import React from "react";

function CreateClassTermFields(props) {
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
                    <h3 style={{ margin: "0, 0, 4px, 0" }}>{`Term  ${
                      index + 1
                    }`}</h3>
                    {formik.values.terms.length === 1 ? null : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                      >
                        Remove Term
                      </Button>
                    )}
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
                                  {/* question field */}
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
                                  {/* answer field */}
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
                                    placeholder={
                                      qIndex % 2 === 0
                                        ? "e.g. September 1, 1939"
                                        : "e.g. September 2, 1945"
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
                        <Button
                          style={{ marginBottom: "55px" }}
                          variant="contained"
                          color="primary"
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
                questions: [{ question: "", answer: "" }],
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
export default CreateClassTermFields;
