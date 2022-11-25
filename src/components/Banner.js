import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles ( () => ({
    
    banner:{
        background:"linear-gradient(to right, #cc5333, #23074d)"
    },
    bannerContent: {
        height:400,
        display:"flex",
        flexDirection : "column",
        paddingTop:25,
        justifyContent: "space-around",

    },
    tagline:{
        height:"40%",
        display:"flex",
        flexDirection : "column",
        textAlign:"center",
        justifyContent: "center",

    }
}) 
)

const Banner = () => {

  const classes = useStyles()

  return (
    <div  className={classes.banner}>
      <Container className= {classes.bannerContent}>
     
        <div className= {classes.tagline }>
            <Typography 
            variant= "h2"
            style={{
                fontWeight:"bold",
                fontFamily:"Montserrat",
                marginBottom:15,
                color:"white"
            }}>
            Coin Tracking
            </Typography>

            <Typography 
            variant= "subtitle2"
            style={{
                fontWeight:"darkgrey",
                fontFamily:"Montserrat",
                textTransform:"capitalize",
                marginBottom:15, 
                color:"white"
            }}>
           Get a quick peek at all the trending crypto coin stats.
            </Typography>
            
        </div>
        
        <Carousel/>
      
      </Container>
    
    </div>
  )
}

export default Banner
