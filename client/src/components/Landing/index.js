import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import Grid from "@material-ui/core/Grid";


const serverURL = ""; //enable for dev mode

const Landing = () => {

  return (
    <div >
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton >

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/')}
            >
              <Typography variant="h5" color="inherit" noWrap style={{ marginRight: 20 }}>
                Home
              </Typography>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Search')}
            >
              <Typography variant="h5" color="inherit" noWrap style={{ marginLeft: 20 }}  >
                Search
              </Typography>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Reviews')}
            >
              <Typography variant="h5" color="inherit" noWrap style={{ marginLeft: 40 }}  >
                Reviews
              </Typography>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/MovieLibrary')}
            >
              <Typography variant="h5" color="inherit" noWrap style={{ marginLeft: 40 }}  >
                Movie Library
              </Typography>
            </Link>

          </Toolbar>
        </AppBar>
      </Box>

      <Typography variant={"h2"} style={{ textAlign: 'center', marginTop: 20 }}>
        <React.Fragment>
          The Home of All Movies
        </React.Fragment>
      </Typography>
      <Grid
        container
        spacing={4}
        direction="Row"
        //justify="flex-start"
        alignItems="center"
        style={{ marginLeft: '50px' }}
      //className={classes.mainMessageContainer}
      >
        <Box
          sx={{
            width: 600,
            height: 270,
            backgroundColor: '#008080',
            marginLeft: "50px",
            marginTop: "30px"
          }}
          
        >
          <Typography variant={"h3"} style={{ textAlign: 'center', marginTop: 60, color: "#ffffff" }}>
        <React.Fragment>
          Create a Review or Browse Recommendations
        </React.Fragment>
      </Typography>

      <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Reviews')}
            >
              <img src = "https://www.pngmart.com/files/15/Arrow-Transparent-Images-PNG.png" style={{ width: "80px", alignItems: "center", marginTop: "20px", marginLeft: " 265px"}}/>
            </Link>

      </Box>

        <Box
          sx={{
            width: 600,
            height: 270,
            backgroundColor: '#B22222',
            marginLeft: "50px",
            marginTop: "30px"
          }}
        >
          <img src=
            "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/174C605829DEB3C79C2F6993EFA97B2ECBF21D6A152E6BB0CA00DDA987E94BAC/scale?width=1200&aspectRatio=1.78&format=jpeg" style={{ width: "450px", alignItems: "center", marginTop: "7px", marginLeft: " 85px"}} 
            />
        </Box>

        <Box
          sx={{
            width: 600,
            height: 270,
            backgroundColor: '#4682B4',
            marginLeft: "50px",
            marginTop: "20px"
          }}
        >
          <img src=
            "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/05/Harry-Potter-Movies-in-Order.jpg" style={{ width: "470px", alignItems: "center", marginTop: "20px", marginLeft: " 65px"}} />
        </Box>

        <Box
          sx={{
            width: 600,
            height: 270,
            backgroundColor: '#008080',
            marginLeft: "50px",
            marginTop: "20px"
          }}
        >
          <Typography variant={"h3"} style={{ textAlign: 'center', marginTop: 60, color: "#ffffff" }}>
          Search For Any Movie By Actor, Movie or Director
      </Typography>
      <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Search')}
            >
              <img src = "https://www.pngmart.com/files/15/Arrow-Transparent-Images-PNG.png" style={{ width: "80px", alignItems: "center", marginTop: "20px", marginLeft: " 265px"}}/>
            </Link>
        </Box>
      </Grid>
    </div>

  );
}

export default Landing;