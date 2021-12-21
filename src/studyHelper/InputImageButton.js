import { IconButton, InputAdornment } from "@material-ui/core";
import { InsertPhoto } from "@material-ui/icons";
import { useRef, useState } from "react";

function InputImageButton(props) {
  const imageInput = useRef();
  const [hover, setHover] = useState(false);

  return (
    <InputAdornment>
      {/* Display search icon if TextField is empty */}
      <input
        type="file"
        ref={imageInput}
        accept="image/*"
        style={{ display: "none", padding: '20px' }}
      />
      <IconButton
        onClick={() => imageInput.current.click()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? { opacity: 1 } : {opacity: 0.7}}
      >
        <InsertPhoto />
      </IconButton>
    </InputAdornment>
  );
}

export default InputImageButton;
