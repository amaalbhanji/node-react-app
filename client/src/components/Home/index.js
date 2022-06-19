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


//Dev mode
const serverURL = ""; //enable for dev mode

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
    type: 'light',
    background: {
      default: "#00000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#00000",
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


// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userID: 1,
//       mode: 0
//     }
//   };

//   // componentDidMount() {
//   //   //this.loadUserSettings();
//   // }


//   // loadUserSettings() {
//   //   this.callApiLoadUserSettings()
//   //     .then(res => {
//   //       //console.log("loadUserSettings returned: ", res)
//   //       var parsed = JSON.parse(res.express);
//   //       console.log("loadUserSettings parsed: ", parsed[0].mode)
//   //       this.setState({ mode: parsed[0].mode });
//   //     });
//   // }

//   // callApiLoadUserSettings = async () => {
//   //   const url = serverURL + "/api/loadUserSettings";

//   //   const response = await fetch(url, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       //authorization: `Bearer ${this.state.token}`
//   //     },
//   //     body: JSON.stringify({
//   //       userID: this.state.userID
//   //     })
//   //   });
//   //   const body = await response.json();
//   //   if (response.status !== 200) throw Error(body.message);
//   //   console.log("User settings: ", body);
//   //   return body;
//   // }

//   render() {
//     const { classes } = this.props;


//     const mainMessage = (
//       <Grid
//         container
//         spacing={0}
//         direction="column"
//         justify="flex-start"
//         alignItems="flex-start"
//         style={{ minHeight: '100vh' }}
//         className={classes.mainMessageContainer}
//       >
//         <Grid item>

//           <Typography
//             variant={"h3"}
//             className={classes.mainMessage}
//             align="flex-start"
//           >
//             {this.state.mode === 0 ? (
//               <React.Fragment>
//                 Movie Review From!
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 Welcome back!
//               </React.Fragment>
//             )}
//           </Typography>

//         </Grid>
//       </Grid>
//     ) 


//     return (
//       <MuiThemeProvider theme={theme}>
//         <div className={classes.root}>
//           <CssBaseline />
//           <Paper
//             className={classes.paper}
//           >
//             {mainMessage}

//           </Paper>

//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }


// Home.propTypes = {
//   classes: PropTypes.object.isRequired
// };

//  export default withStyles(styles)(Home);

const MovieSelection = (classes) => {
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const changeMovie = (event) => {
    setSelectedMovie(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Movie</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedMovie}
          onChange={changeMovie}
          label="Select a Movie"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Avenger's: Endgame</MenuItem>
          <MenuItem value={2}>Spiderman: No Way Home</MenuItem>
          <MenuItem value={3}>The Lion King</MenuItem>
          <MenuItem value={4}>Top Gun Maverick</MenuItem>
          <MenuItem value={5}>Harry Potter and the Philosopher's Stone</MenuItem>
        </Select>
      </FormControl>
  )
}

const ReviewTitle = (classes) => {
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const changeTitle = (event) => {
    setEnteredTitle(event.target.value);
  };

  return (
  <form className={classes.root} noValidate autoComplete="off">
   <TextField id="outlined-basic" label="Enter Review Title" placeholder="..." variant="outlined" value={enteredTitle}
          onChange={changeTitle} />
  </form>
  )
}

const ReviewBody = (classes) => {
  const [enteredReview, setEnteredReview] = React.useState('');

  const changeReview = (event) => {
    setEnteredReview(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
    <TextField
          id="outlined-textarea"
          label="Enter Review"
          placeholder="..."
          multiline
          variant="outlined"
          value={enteredReview}
          onChange={changeReview}
          inputProps={{ maxLength: 200 }}
          helperText={`${enteredReview.length} / 200`}
        />
    </form>
  )
}

const ReviewRating = (classes) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Movie Rating</FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
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

const Review = (classes) => {
  const homePage = (
    <Grid
      container
      spacing={0}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ minHeight: '100vh' }}
      className={classes.mainMessageContainer}
    >
      <Grid Item>
        <Typography variant={"h3"}>
          <React.Fragment>
            Movie Review Form
          </React.Fragment>
        </Typography>
      </Grid>

      <Grid Item>
      <MovieSelection classes={classes} />
      </Grid>

      <Grid Item>
      <ReviewTitle classes={classes} />
      </Grid>

      <Grid Item>
      <ReviewBody classes={classes} />
      </Grid>

      <Grid Item>
      <ReviewRating classes={classes} />
      </Grid>

      <Grid Item>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Paper
          className={classes.paper}
        >
          {homePage}
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}

 export default withStyles(styles)(Review); 