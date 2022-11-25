import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import {TrendingCoins} from '../../src/config/api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

const useSyles = makeStyles ( () =>  ({
    title:{
        height: "50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        textTransform:"uppercase",
        cursor:"pointer",
        color:"white"
    }
}) )

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Carousel = () => {

  const [trending,setTrending] = useState([]) 

  const classes = useSyles() 
  
  const {currency,symbol} = CryptoState()

  const fetchTrendingCoins = async () => {
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data)
    console.log(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
    },[currency])

  

  const items = trending.map((coin) => {
    
    let profit = coin.price_change_percentage_24h >=0

    return (
            <Link 
            className={classes.carouselItem} 
            to={`/coins/${coin.id}`}
            >
            <img
                src = {coin?.image}
                alt = {coin.name}
                height = "80"
                style = {{marginBottom :10}}
            />
            <span>
                {coin?.symbol}  
                &nbsp;&nbsp;
                <span
                style={{
                    color : profit > 0 ? "greenyellow" : "red",
                    
                }}
                >
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>

            <span> 
                {numberWithCommas(coin?.current_price.toFixed(2))}  
                &nbsp;&nbsp;
                {symbol}    
            </span> 
           
        </Link>
    )
    } )

  const responsive = {
    0:{
        items:2,
    },
    512: {
        items:6
    }
  }  

  return (
    <div className={classes.Carousel}>
      <AliceCarousel  
      mouseTracking
      infinite
      autoPlayInterval={1500}
      animationDuration={1500}
      disableButtonsControls
      disableDotsControls
      responsive = {responsive}
      autoPlay
      items={items}
      >
        
      </AliceCarousel>
    </div>
  )
}

export default Carousel
