import { TextField } from "@material-ui/core";
import { FastField } from "formik";
import InputImageButton from "./InputImageButton";
// import { useEffect, useState } from "react";
// current question
// inputimagebutton

function EditTermQuestionInput(props) {
  // TODO hide inputImageButton when there is already an image

  return (
    <FastField
      as={TextField}
      variant="outlined"
      name={props.name}
      multiline
      fullWidth
      helperText="answer"
      className="edit-class-input-with-image"
      InputProps={{
        endAdornment: <InputImageButton />,
        startAdornment: (
          <img
            className="edit-class-image"
            src="https://via.placeholder.com/180x150/200"
          />
        ),
      }}
    />
  );
}

export default EditTermQuestionInput;
