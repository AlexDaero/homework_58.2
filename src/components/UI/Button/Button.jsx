import React, { useEffect } from "react";
import './Button.css'
import { memo } from "react";

const Button = (props) => {
    console.log('button')
    return (
        <button
            onClick={props.click}>{props.text}</button>
    )
}

export default memo(Button, () => true)