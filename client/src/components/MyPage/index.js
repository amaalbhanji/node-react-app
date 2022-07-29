import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import Grid from "@material-ui/core/Grid";
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { CardContent, ListItem, Typography } from "@material-ui/core";
import ReactPlayer from "react-player"


const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3072"; //enable for dev mode


const MyPage = () => {

    const [topMovies, setTopMovies] = React.useState([]);

    const topMoviesList = () => {
        callApiTopMoviesList()
            .then(res => {
                var parsed = JSON.parse(res.result)
                setTopMovies(parsed)
            })
    }

    const callApiTopMoviesList = async () => {
        const url = serverURL + "/api/topMoviesList";
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Found recipes: ", body);
        return body;
    }

    console.log(topMovies)

    const CardPaper = styled(Paper)(({ theme }) => ({
        width: '900px',
        opacity: 0.7,
        backgroundColor: 'lightGrey',
        padding: 8,
        borderRadius: 4,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }));

    const ListOfTopMovies = (props) => {

        return (
            <ul>
                {props.list.map((item) => {
                    if (item.trailer_link){
                        return (
                        
                            <div>
                                <CardPaper>
                                    <CardContent>
                                        <Typography variant={"h4"} color="Black">
                                            {item.name}
                                        </Typography>
    
    
                                        <Typography variant={"h4"} color="Black" >
                                            Rating: {item.avgScore}
                                        </Typography>
    
    
                                    </CardContent>
                                </CardPaper>
                                <ReactPlayer
                                    url={item.trailer_link}
                                    allowFullScreen
    
                                />
                            </div>
                        );
                    }
                    
                })}
            </ul>

        )
    }

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

            <Typography style= {{fontsize: "30px"}}>
                My myPage will return the movies with the top average score rating as a reccommendation and will show the trailer of that movie.
                I have inserted a couple movie trailers and those will be the only movies that show up as they have a 5 star rating right now
            </Typography>

            <Typography variant={"h2"} style={{ textAlign: 'center', marginTop: 50 }}>
                <React.Fragment>
                    Welcome to the Movie Library
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
                <Grid Item style={{ marginTop: 30, textAlign: "center" }}>
                    <Button style={{ width: "300px", cursor: "pointer" }} variant="contained" color="primary" onClick={topMoviesList}  >
                        <Typography style={{ fontsize: '35px' }}>
                            View Top Movie Recommendations and Trailers
                        </Typography>

                    </Button>
                </Grid>
                <ListOfTopMovies list={topMovies} />
                <Grid Item>

                </Grid>
            </Grid>

            

        </div>
    )

}

export default MyPage;