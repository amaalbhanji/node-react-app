import * as React from 'react';
import { CardContent, ListItem, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';


const serverURL = ""; //enable for dev mode

const Search = () => {
    const [searchForMovie, setSearchForMovie] = React.useState('');
    const [searchForActor, setSearchForActor] = React.useState('');
    const [searchForDirector, setSearchForDirector] = React.useState('');
    const [displaySearch, setDisplaySearch] = React.useState([])
    const [displaySearchContent, setDisplaySearchContent] = React.useState([])



    const addSearch = (searchContent) => {
        callApiAddSearch(searchContent)
            .then(res => {
                var parsed = JSON.parse(res.result)
                setDisplaySearch(parsed)
            })
    }

    const callApiAddSearch = async (searchContent) => {
        const url = serverURL + "/api/addSearch";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                data: searchContent
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        //console.log("Found recipes: ", body);
        return body;
    }

    const addSearchContent = (searchContent) => {
        callApiAddSearchContent(searchContent)
            .then(res => {
                var parsed = JSON.parse(res.result)
                setDisplaySearchContent(parsed)
            })
    }

    const callApiAddSearchContent = async (searchContent) => {
        const url = serverURL + "/api/addSearchContent";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                data: searchContent
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        //console.log("Found recipes: ", body);
        return body;
    }
    React.useEffect(() => {
        addSearch();
    }, []);

    const validateSearch = () => {

        var searchData = {
            "movieTitle": searchForMovie,
            "actorName": searchForActor,
            "directorName": searchForDirector,
        }

        addSearch(searchData);
        addSearchContent(searchData);

    }

    console.log(displaySearch)
    console.log(displaySearchContent)

    const searchMovieName = (value) => {
        setSearchForMovie(value);
    };

    const searchActorName = (value) => {
        setSearchForActor(value);
    };

    const searchDirectorName = (value) => {
        setSearchForDirector(value);
    };

    return (

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
            <Typography variant={"h2"} style={{ textAlign: 'center', marginTop: 50 }}>
                <React.Fragment>
                    Search For Any Movie
                </React.Fragment>
            </Typography>

            <Grid
                container
                spacing={0}
                direction="column"
                justify="flex-start"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid Item style={{ marginTop: 40 }} >
                    <SearchMovie searchMovie={searchForMovie} onChange={searchMovieName} />
                </Grid>

                <Grid Item style={{ marginTop: 20 }} >
                    <SearchActor searchActor={searchForActor} onChange={searchActorName} />
                </Grid>

                <Grid Item style={{ marginTop: 20 }} >
                    <SearchDirector searchDirector={searchForDirector} onChange={searchDirectorName} />
                </Grid>

                <Grid Item style={{ marginTop: 30, textAlign: "center" }}>
                    <Button style={{ width: "200px", cursor: "pointer" }} variant="contained" color="primary" onClick={validateSearch}  >
                        Search
                    </Button>
                </Grid>
                <Grid Item>
                    <ListOfSearch list={displaySearch} />
                </Grid>

                <Grid Item >
                    <ListOfSearchContent list={displaySearchContent} />
                </Grid>
            </Grid>

        </div>

    );
}

const lightTheme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#ffffff"
      },
      primary: {
        main: '#ef9a9a',
        light: '#ffcccb',
        dark: '#ba6b6c',
        background: '#eeeeee'
      },
      secondary: {
        main: "#b71c1c",
        light: '#f05545',
        dark: '#7f0000'
      },
    },
  });
  
  
  const CardPaper = styled(Paper)(({ theme }) => ({
    width: '900px',
    opacity: 0.7,
    backgroundColor: 'lightGrey',
    padding: 8,
    borderRadius: 4,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }));

const ListOfSearch = (props) => {

    return (
        <ul>
            {props.list.map((item) => {
                return (
                    <CardPaper>
                        <CardContent>
                            <Typography variant={"h4"} color = "Black">
                                {item.name}
                            </Typography>

                            <Typography style = {{fontsize: '20px'}} >
                                Director : {item.Director_Name}
                            </Typography>

                            <Typography style = {{fontsize: '20px'}} >
                                Average Score : {item.averageScore}
                            </Typography>
                        </CardContent>
                        </CardPaper>
                

                );
            })}
        </ul>

    )
}

const ListOfSearchContent = (props) => {

    return (
        
        <ul>
            {props.list.map((item) => {
                return (
                <div>
                    <Typography variant='h5'>
                        Review:
                    </Typography>
                    <CardPaper>
                    <CardContent>
                        <Typography variant={"h4"} color = "Black">
                            {item.name}
                        </Typography>

                        <Typography style = {{fontsize: '20px'}} >
                         {item.reviewContent}
                        </Typography>
                    </CardContent>
                    </CardPaper>
                    </div>

                );
            })}
        </ul>

    )
}


const SearchMovie = (props) => {

    const searchMovieName = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <form >
            <TextField style={{ width: "400px" }} label="Enter Movie Name" placeholder="Movie Name..." variant="outlined"
                value={props.searchForMovie}
                onChange={searchMovieName} />
        </form>

    )
}

const SearchActor = (props) => {

    const searchActorName = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <form >
            <TextField style={{ width: "400px" }} label="Enter Actor Name" placeholder="Actor Full Name..." variant="outlined"
                value={props.searchForActor}
                onChange={searchActorName} />
        </form>

    )
}

const SearchDirector = (props) => {

    const searchDirectorName = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <form >
            <TextField style={{ width: "400px" }} label="Enter Director Name" placeholder="Director Full Name..." variant="outlined"
                value={props.searchForDirector}
                onChange={searchDirectorName} />
        </form>

    )
}

export default Search;