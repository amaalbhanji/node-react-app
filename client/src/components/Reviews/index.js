import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import { SearchOff } from '@mui/icons-material';




//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3072"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#222222"
    },
    // primary: {
    //   light: "757ce8",
    //   main: "#ff0000",
    // },
    // secondary: {
    //   main: "#0000FF",
    // },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#ff0000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 10,
    paddingBottom: theme.spacing(2),
  },

});


//Creating Movie Selection Component
const MovieSelection = (props) => {
  const changeMovie = (event) => {
    props.onChange(event.target.value);
  };

  return (

    <FormControl style={{minWidth: "400px", width : "auto"}} variant="outlined" className={props.classes.formControl}>
      <InputLabel>
      Select a Movie
      </InputLabel>
      <Select
        value={props.selectedMovie}
        onChange={changeMovie}
        label="Select a Movie"
      
      >
        <MenuItem >
          </MenuItem>
        {props.movies.map((movieValue) => (
        <MenuItem 
          value = {movieValue.name}>{movieValue.name}
        </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

//Creating Review Title Component
const ReviewTitle = (props) => {

  const changeTitle = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <form className={props.classes.root}>
      <TextField  style = {{width : "400px"}} label="Enter Review Title" placeholder="Review for ..." variant="outlined"
        value={props.enteredTitle}
        onChange={changeTitle} />
    </form>
  )
}

//Creating Review Body Component
const ReviewBody = (props) => {
  const changeReview = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <form className={props.classes.root}>
      <TextField style = {{width : "400px"}}
        label="Enter Review"
        placeholder="I really enjoyed ..."
        multiline
        variant="outlined"
        value={props.enteredReview}
        onChange={changeReview}
        inputProps={{ maxLength: 200 }}
        helperText={`${props.enteredReview.length} / 200`}
      />
    </form>
  )
}

//Creating Review Rating Component
const ReviewRating = (props) => {

  const changeRating = (event) => {
    props.onChange(event.target.value);
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{fontWeight: "bold", color: "black"}}>Movie Rating</FormLabel>
      <RadioGroup row aria-label="position" value={props.selectedRating} onChange={changeRating}>
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="1"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="2"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="3"
        />
        <FormControlLabel
          value="4"
          control={<Radio color="primary" />}
          label="4"
        />
        <FormControlLabel
          value="5"
          control={<Radio color="primary" />}
          label="5"
        />
      </RadioGroup>
    </FormControl>
  )
}
//Creating Parent Component Review
const Review = (classes) => {
  //Managing 4 states from parent component
  const [enteredReview, setEnteredReview] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [selectedMovieId, setSelectedMovieId] = React.useState();

  const [selectedRating, setSelectedRating] = React.useState(0)
  const [movies, setMovies] = React.useState([])
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogTitle, setOpenDialogTitle] = React.useState(false);
  const [openDialogReview, setOpenDialogReview] = React.useState(false);
  const [openDialogRating, setOpenDialogRating] = React.useState(false);
  const [openDialogMovie, setOpenDialogMovie] = React.useState(false);

  const getMovies = () => {
    callApiGetMovies()
    .then(res => {
    var parsed = JSON.parse(res.express);
    //console.log(parsed);
    setMovies(parsed);
    })
    }

    const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);
    const response = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
    }

    React.useEffect(() => {
      getMovies();
    }, []);

  const addReview = (review) => {
    callApiAddReview(review)
      .then(res => {
      })
  }

  const callApiAddReview = async (review) => {
    const url = serverURL + "/api/addReview";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        data: review
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    //console.log("Found recipes: ", body);
    return body;
  }



  const changeReview = (value) => {
    setEnteredReview(value);
  };

  const changeTitle = (value) => {
    setEnteredTitle(value);
  };

  const changeMovie = (value) => {
    setSelectedMovie(value);
    var id = 0;
    for(var i=0; i<movies.length;i++){
      if (movies[i].name === value){
        id = movies[i].id
      }
    }
    setSelectedMovieId(id)
  };

  const changeRating = (value) => {
    setSelectedRating(value);
  }

  const closeDialog = () => {
    setOpenDialog(false);
  }

  const closeDialogTitle = () => {
    setOpenDialogTitle(false);
  }

  const closeDialogReview = () => {
    setOpenDialogReview(false);
  }

  const closeDialogRating = () => {
    setOpenDialogRating(false);
  }

  const closeDialogMovie = () => {
    setOpenDialogMovie(false);
  }
 

  //Data validation with submit button
  const validateSubmit = () => {
    if (enteredTitle.length === 0) {
      setOpenDialogTitle(true);
    } 
    
    if (enteredReview.length === 0) {
      console.log("Please enter your review");
      setOpenDialogReview(true);
    } 
    
    if (selectedRating === 0) {
      console.log("Please select the rating");
      setOpenDialogRating(true);
    } 
    
    if (selectedMovie.length === 0) {
     setOpenDialogMovie(true);
    } 
    
    if (enteredTitle.length > 0 && enteredReview.length > 0 && selectedRating > 0 && selectedMovie.length > 0) {

      var sqlDisplay = {
        "movieID": selectedMovieId,
        "userID": 1,
        "title": enteredTitle,
        "body": enteredReview,
        "rating": parseInt(selectedRating)
      }
      setOpenDialog(true);
      addReview(sqlDisplay);

    }
  }

  const titleStyle = {
    marginTop: "40px",
    marginBottom: "20px",
    marginLeft: "20px",
    textAlign: "center",
  }

  const selector = {
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "20px",
  }

  const reviewBox = {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
  }

  const reviewBodyBox = {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
  }

  const rating = {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
  }

  const submit = {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
  }

const homePage = (
<div>
    
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
        <Typography variant="h5" color="inherit" noWrap style = {{ marginRight: 20}}>
        Home
        </Typography>
        </Link>
        
        <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/Search')}
        >
        <Typography variant="h5" color="inherit" noWrap style = {{ marginLeft: 20}}  >
        Search
        </Typography>
        </Link>

        <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/Reviews')}
        >
        <Typography variant="h5" color="inherit" noWrap style = {{ marginLeft: 40}}  >
        Reviews
        </Typography>
        </Link>

        <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => history.push('/MovieLibrary')}
        >
        <Typography variant="h5" color="inherit" noWrap style = {{ marginLeft: 40}}  >
        Movie Library
        </Typography>
        </Link>
             
            </Toolbar>
          </AppBar>
        </Box>
  <Grid
    container
    spacing={0}
    direction="column"
    //justify="flex-start"
    alignItems="center"
    //style={{ minHeight: '100vh'}}
    //className={classes.mainMessageContainer}
  >
    <Grid Item style={titleStyle}>
      <Typography variant={"h3"}>
        <React.Fragment>
          Movie Review Form     
       </React.Fragment>
      </Typography>
    </Grid>

    <Grid Item style = {selector}>
      <MovieSelection selectedMovie={selectedMovie} movies={movies} onChange={changeMovie} classes={classes} />
    </Grid>

    <Grid Item style = {reviewBox}>
      <ReviewTitle enteredTitle={enteredTitle} onChange={changeTitle} classes={classes} />
    </Grid>

    <Grid Item style = {reviewBodyBox}>
      <ReviewBody enteredReview={enteredReview} onChange={changeReview} classes={classes} />
    </Grid>

    <Grid Item style = {rating}>
      <ReviewRating selectedRating={selectedRating} onChange={changeRating} classes={classes} />
    </Grid>

    <Grid >
      <Button  style = {{ width: "200px" }}variant="contained" color="primary" onClick={validateSubmit}>
        Submit Review
      </Button>
    </Grid>
 
  </Grid>
  <Dialog open={openDialog}>
        <DialogTitle>
          {"Sucesssfully Submitted"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your review has been submitted:
            <p>Movie: {selectedMovie}</p>
            <p>Review Title: {enteredTitle}</p>
            <p>Review: {enteredReview}</p>
            <p>Rating: {selectedRating}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialog}>
          OK  
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={openDialogTitle}>
        <DialogTitle>
          {"Incomplete Submission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your Movie Review Title
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialogTitle}>
          OK  
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={openDialogMovie}>
        <DialogTitle>
          {"Incomplete Submission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Select A Movie
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialogMovie}>
          OK  
          </Button>
        </DialogActions>
        </Dialog>


        <Dialog open={openDialogReview}>
        <DialogTitle>
          {"Incomplete Submission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your Movie Review
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialogReview}>
          OK  
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={openDialogRating}>
        <DialogTitle>
          {"Incomplete Submission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your Movie Rating
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeDialogRating}>
          OK  
          </Button>
        </DialogActions>
        </Dialog>
  </div>

)

return (
  <MuiThemeProvider>
    <div>
     

        {homePage}
    
    </div>
  </MuiThemeProvider>
);
}

export default withStyles(styles)(Review); 