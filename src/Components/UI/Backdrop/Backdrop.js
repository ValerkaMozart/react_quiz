import React from 'react'
import classes from './Backdrop.module.css'

let Backdrop = (props) => <div className={classes.Backdrop} onClick={props.isOpen}/>

export default Backdrop