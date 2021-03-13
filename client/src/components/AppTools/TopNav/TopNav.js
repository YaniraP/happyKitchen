import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "flex",
    color: "black"
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "170px",
    height: "45px",
    marginTop: "18px",
    marginBottom: "15px",
  }
}));


function TopNav () {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (path) => {
    history.push(path);
    setAnchorEl(null);
  };

  return (
    <div data-testid="TopNavtest" className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ background: '#EEE' }}>
          <img
            src={"/Logo-easykitchen.png"}
            alt="logo"
            className={classes.logo} />
          <Typography
            variant="h6"
            className={classes.title}>
          </Typography>
          <div>
            <IconButton
              data-testid="Menutest"
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuClick('/add_dish')}>Add a dish</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/create_menu')}>Create a menu</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/menu')}>See menus</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/order')}>See orders</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(TopNav);


