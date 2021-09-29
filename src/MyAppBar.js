import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Info, AddBox, ExitToApp, Create } from "@material-ui/icons";
import { Link } from "react-router-dom";

function MyAppBar() {
  return (
    <AppBar position="initial" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{border: '2px solid', padding: '0 5px'}}>
          <Link to="/study">ModernCards</Link>
        </Typography>
        <ul id="appbar-navigation-large" className="appbar-navigation">
          <div className="appbar-control-group">
            <li>
              <Typography variant="h6" className="appbar-link">
                <div className="appbar-control-button">
                  <Link to="/study">
                    My Classes
                  </Link>
                </div>
              </Typography>
            </li>
            <li>
              <Typography variant="h6" className="appbar-link">
                <div className="appbar-control-button">
                  <Link to="/study/create-new-class">Create Class</Link>
                  <Create />
                </div>
              </Typography>
            </li>
          </div>
          <div className="appbar-control-group">
            <li>
              <Typography variant="h6" className="appbar-link">
                <div className="appbar-control-button">
                  <Link to="/about">About</Link>
                </div>
              </Typography>
            </li>
            <li>
              <Typography variant="h6" className="appbar-link">
                <div className="appbar-control-button">
                  <Link
                    onClick={() => {
                      window.location.href = "http://localhost:8080/logout";
                    }}
                    to="/study"
                  >
                    logout
                  </Link>
                  <ExitToApp />
                </div>
              </Typography>
            </li>
          </div>
        </ul>

        {/* Small screens */}
        <ul id="appbar-navigation-small" className="appbar-navigation">
          <li style={{ color: "black" }}>
            <IconButton color="inherit">
              <Link to="/study/create-new-class">
                <AddBox />
              </Link>
            </IconButton>
          </li>
          <li>
            <IconButton color="inherit">
              <Link to="/about">
                <Info />
              </Link>
            </IconButton>
          </li>
          <li>
            <IconButton color="inherit">
              <Link
                onClick={() => {
                  window.location.href = "http://localhost:8080/logout";
                }}
              >
                <ExitToApp />
              </Link>
            </IconButton>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
