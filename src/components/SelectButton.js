import React from 'react'

const SelectButton = ({children,selected,onClick}) => {

  return (
    <div style={{
        border: "1px solid #fc6767",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "black",
            color: "black",
          },
          width: "22%",
        backgroundColor: selected ? "#fc6767" : "",
        color: selected ? "white" : "",
        fontWeight: selected ? 700 : 500,  
    }}  
    onClick={onClick}>
      {children}
    </div>
  )
}

export default SelectButton
