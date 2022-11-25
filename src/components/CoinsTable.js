import { Container, createTheme, CssBaseline, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'


const useStyles = makeStyles ( () => ({

    table :{
        background:"linear-gradient(to right, #cc5333, #23074d)"
    }
    ,
    pagination: {
        "& .MuiPaginationItem-root":{
            color:"white",
            fontFamily:"Montserrat",
            fontWeight:"bold",
            
        },

    },
    row:{
        backgroundColor : "",
        cursor:"pointer",
        "&:hover": {
            background:"linear-gradient(to right, #422a41, #422a41)"
            
        },
        fontFamily:"Montserrat"

    }
}) 
)

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsTable = () => {

    const [coins,setCoins] = useState([])
    const [loading,setLoading] = useState([])
    const [search,setSearch] = useState([])
    const [page, setPage] = useState(1)

    const {currency,symbol} = CryptoState()

    const fetchCoinTable = async () => {
      setLoading(true)
      const {data} =  await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
      console.log(data)
    }

    useEffect ( ()=> {fetchCoinTable() } , [currency])
  
    const  handleSearch = () => { 
        return coins.filter( 
            (coin) =>
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        )
    }

    
    const darkTheme = createTheme({
        palette: {
            type:"dark",
        },
      });
    
    const navigate = useNavigate()
    
    const classes = useStyles()

    return (
        <div className={classes.table}>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline>
            <Container  style = { {textAlign: "center" }} >
                <Typography variant='h4' 
                            style={{padding:"4rem", fontFamily:"montserrat"  }}>

                            Today's Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField label = "Search for a Crypto Currency.." variant="outlined" 
                            style= {{ width:"100%", marginBottom : 20 , color:"black"}}
                            onChange = { (e) => setSearch(e.target.value) } >
                </TextField>

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress color='secondary' />
                        ) : (
                            <Table>
                                <TableHead >
                                    <TableRow style = {{background:"linear-gradient(to right,#422a41,#422a41)",height:"5rem",}}>
                                        {
                                            ["Coin","Price","24 Change","Market Cap"].map((head) => (
                                                <TableCell
                                                    style = {{  fontWeight:"700",
                                                                fontFamily:"Montserrat",
                                                                color:"white"
                                                             }} 
                                                    key = {head} 
                                                    align = {head ==="Coin" ? "" : "right"  }
                                                >
                                                {head}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {
                                            handleSearch()
                                                .slice( (page-1) * 10 , (page - 1) * 10 + 10 )
                                                .map( (row) => {
                                                
                                                let profit = row.price_change_percentage_24h >=0
                                                return (
                                                 
                                                    <TableRow
                                                    onClick = {() => navigate(`/coins/${row.id}`) } 
                                                    className = {classes.row}
                                                    key = {row.name}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope = "row"
                                                            style={{display:"flex",gap: 15 , height:"5rem"          
                                                            }}
                                                        >
                                                        <img
                                                        src={row?.image}
                                                        alt = {row.name}
                                                        height = "45"
                                                        style={{marginBottom:10}}

                                                        />
                                                        <div style={{ display : "flex", flexDirection:"column"}}
                                                        >
                                                            <span style={{textTransform:"uppercase",
                                                                        fontSize: 22}}>
                                                            {row.symbol}  
                                                            </span>
                                                            <span style={{textTransform:"capitalize",
                                                                        color:"darkgrey"   }}>
                                                            {row.id}   
                                                            </span>
                                                            </div>  
                                                        </TableCell>

                                                        <TableCell
                                                        align="right" 
                                                        
                                                        >
                                                        <span style={{fontSize : 15}}>    
                                                        {numberWithCommas(row.current_price)}
                                                        </span>
                                                        &nbsp;
                                                        {symbol}
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            <span style={{ color : profit >0 ? "green" : "red",
                                                                           fontSize: 15
                                                                        }}>
                                                            {row.price_change_percentage_24h.toFixed(2)} %
                                                            </span>
                                                        </TableCell>
                                                            
                                                        <TableCell align="right">
                                                            <span style={{ fontSize : 15}}>
                                                            {numberWithCommas(row.market_cap.toString().slice(0,-6)) } M
                                                            </span>
                                                        </TableCell>

                                                    </TableRow>
                                                  )
                                                 }
                                            )
                                        }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    style = {{
                        padding : 30,
                        width : "100%",
                        display: "flex",
                        justifyContent : "center",
                    }}
                    classes ={{ ul:classes.pagination}}
                    count = {(handleSearch()?.length /10).toFixed(0)}
                    onChange = {
                            (_,value) => {setPage(value)
                            window.scroll(0,450) }
                        }
                />    
             
            </Container>
        </CssBaseline>
        </ThemeProvider>
        </div>
  )
}

export default CoinsTable
