import { CircularProgress, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Line } from 'react-chartjs-2'
import { chartDays } from '../config/data'
import SelectButton from './SelectButton'
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

const useStyles = makeStyles((theme) => ({
    container: {
      background:"linear-gradient(to right, #23074d, #23074d)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding:"3rem",
   
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
      button:{
        "&:hover":  {
          background: "#FFE000"
        },
      }
      ,
      
    },
  }))

const CoinChart = () => {

    const{id} = useParams()
    const [historicalData,setHistoricalData] = useState()
    const [loading,setLoading] = useState()
    const [days,setDays] = useState(1)
    const [flag,setFlag] = useState(false)

    const {currency,symbol} = CryptoState()

    const fetchHistoricalData = async () => {
        setLoading(true)
        const {data} = await axios.get(HistoricalChart(id,days,currency))
        setHistoricalData(data.prices)
        setLoading(false)
        console.log("data",data.prices)
      }
    
    useEffect( () => {fetchHistoricalData()},[days,currency] )  
    
    const data = {
        labels: historicalData?.map((coin) => {
            let date = new Date(coin[0]);
            let time = date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
            {
            data: historicalData?.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "#fc6767",
            
            },
        ],
        }

      const options = {
        plugins: {  
          legend: {
            labels: {
              color: "white",
              font: {
                size: 14,
                fontFamily:"Montserrat", 
             
                
              }
            }
          }
        },
        scales: {
          y: {  
            ticks: {
              color: "white",
              font: {
                size: 10, 
                fontFamily:"Montserrat", 
              },
            }
          },
          x: { 
            ticks: {
              color: "white",
              font: {
                size: 10,
                fontFamily:"Montserrat", 
              },
              stepSize: 1,
              beginAtZero: true
            }
          }
        }
      }
      
    const classes = useStyles()  

    return (
     <div>
            <div className={classes.container}>
            {!historicalData ? (
                    <CircularProgress
                    style={{ color: "#FFE000" }}
                    size={250}
                    thickness={1}
                  />
                ): (
                   <Line 
                    data={data} options={options}
                   />
                )
            }
            <div style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
            {chartDays.map( (day) => (
              <SelectButton 
              onClick={ () => setDays(day.value)} 
              selected = {day.value === days}
              >
              {day.label}
            </SelectButton>
            ) )
            }
            </div>
            </div>  
     </div>   
    )
}

export default CoinChart


