import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu, Info, AddBox, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";

function MyAppBar() {
  return (
    <AppBar position="initial" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">
          <Link to="/study">Home</Link>
        </Typography>
        <ul id="appbar-navigation-large" className="appbar-navigation">
          <li>
            <Link to="/study">
              <Typography variant="h6">My Classes</Typography>
            </Link>
          </li>
          <li>
            <Link to="/study/create-new-class">
              <Typography variant="h6">Create</Typography>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Typography variant="h6">About</Typography>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                window.location.href = "http://localhost:8080/logout";
              }}
            >
              <Typography variant="h6">logout</Typography>
            </Link>
          </li>
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
