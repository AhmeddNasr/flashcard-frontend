import React, { useState, useEffect } from "react";
import fetchTerms from "./fetchTerms";
import CenteredSpinner from "./CenteredSpinner";
import EditClassForm from "./EditClassForm";
import "./styles/edit-class.css"
import { FastField } from "formik";

function EditClass(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchTerms(props.match.params.folderID, setData);
    // eslint-disable-next-line
  }, []);

  console.log(data);

  if (data === null) {
    return <CenteredSpinner />;
  }

  return (
    <React.Fragment>
      <EditClassForm data={data} style={{margin: '200px !important'}}/>
    </React.Fragment>
  );
}

export default EditClass;
