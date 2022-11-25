import { Container, Toolbar, Typography, Select, MenuItem, makeStyles, } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const useSyles = makeStyles ( () =>  ({
    navbar:{
        background:"linear-gradient(to right, #422a41, #422a41)",
        height : "4rem"
    },
    title:{
        flex: 1,
        color: "white",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor:"pointer",
    }
}) )




const Header = () => {

    const navigate = useNavigate()
    const classes = useSyles()
    const {currency,setCurrency }  = CryptoState()

    console.log(currency)
    return (
    <div className={classes.navbar}>
            <Container>
                <Toolbar>
                    <Typography 
                            onClick = {() => navigate("/") } 
                            className={classes.title }>
                            Coin Marketcap
                    </Typography>
                   
                    <Select variant='outlined' 
                            style={{
                                width:100,
                                height:40,
                                marginRight:15,
                        
                                
                    }} 
                    value = {currency}
                    onChange = {(e) => setCurrency(e.target.value) }
                    >
                    
                        <MenuItem value={'USD'}>  USD </MenuItem>
                        <MenuItem value={'INR'}>  INR </MenuItem>
                    </Select>

                    
                </Toolbar>
            </Container>
    </div>
  )
}

export default Header
