import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import parse, { domToReact } from 'html-react-parser';

export function parseWithLinks(text) {
    const options = {
      replace: ({ name, attribs, children }) => {
        if (name === 'a' && attribs.href) {
          return <Link to={attribs.href}>{domToReact(children)}</Link>;
        }
      }
    };
        
    return parse(text, options);
  }

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
const useStyles = makeStyles ( (theme) => ({
      container:{
        display:"flex",
        background:"linear-gradient(to right, #cc5333, #23074d)",
        [theme.breakpoints.down("md")]:{
          flexDirection : "column",
   
        } 
      },
      sidebar :{
        display:"flex",
        width:"100%",
        flexDirection :"column",
        alignItems:"center",
        [theme.breakpoints.down("md")]:{
            width:"100%"
     
          } 
      },
      heading : { 
        color:"white",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        textAlign:"center"
      },
      desc :{
        color:"white",
        width:"100%",
        fontFamily : "Montserrat",
        padding:20,
        alignItems:"center",
        textAlign:"center"
      },
      marketData:{
          color:"white",
          alignSelf:"center",
          padding:15,
          paddingTop:10,
          paddingBottom:30,
          alignItems:"center",
          textAlign:"justify",

        [theme.breakpoints.down("md")]: {
          flexDirection : "column",
          alignItems :"center"
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection : "column",
            alignItems :"center"
        },
        [theme.breakpoints.down("xs")]: {
           alignItems:"start"
        }

      }
}) )

const CoinInfo = () => {

  const {id} =  useParams()
  const [loading,setLoading] = useState([])
  const [coin,setCoin] = useState()
  const {currency,symbol} = CryptoState()

  const fetchSingleCoin = async () => {
    setLoading(true)
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
    setLoading(false)
    console.log(data)
  }

  useEffect ( ()=> {fetchSingleCoin() } , [id])

  const classes = useStyles()
  
  if(!coin) return <LinearProgress color='secondary' />

  return (
    <div className={classes.container}>
      <div className= {classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height = "200"
          style={{
            padding:30,
          }}
        />
        <Typography 
        variant="h4"
        className = {classes.heading}>
        {coin?.name}
        </Typography>

        <Typography className={classes.desc}>
            {parseWithLinks(coin?.description.en.split(". ")[0])}       
        </Typography>
        
        <div className={classes.marketData}>
            <span style={{display :"flex" }}>
                <Typography variant="h6" className = {classes.heading}>
                Rank - 
                </Typography>
                &nbsp; 
                <Typography variant="h6" style={{ fontFamily:"Montserrat" }}
                >
                {coin?.market_cap_rank}
                </Typography>
            </span> 

            <span style={{display :"flex" }}>
                <Typography variant="h6" className = {classes.heading}>
                Market cap - 
                </Typography>
                &nbsp; 
                <Typography variant="h6" style={{ fontFamily:"Montserrat" }}
                >
                {symbol}&nbsp;   
                {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))} M
                </Typography>
            </span> 

            <span style={{display :"flex" }}>
                <Typography variant="h6" className = {classes.heading}>
                Current price - 
                </Typography>
                &nbsp; 
                <Typography variant="h6"  style={{ fontFamily:"Montserrat" }}
                >
                {coin?.market_data.current_price[currency.toLowerCase()]}
                </Typography>
            </span> 
        
        </div> 
      </div>
    </div>
  )
}

export default CoinInfo
