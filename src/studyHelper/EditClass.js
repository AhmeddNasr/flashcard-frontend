import React, { useState, useEffect } from "react";
import fetchTerms from "./fetchTerms";
import CenteredSpinner from "./CenteredSpinner";
import EditClassForm from "./EditClassForm";
import "./styles/edit-class.css"

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
      <h1>Folder Name</h1>
      <EditClassForm data={data} />
    </React.Fragment>
  );
}

export default EditClass;
