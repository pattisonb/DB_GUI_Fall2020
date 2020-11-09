import React, { useState } from 'react';
import './Alert.css';
export default function Alert(props) {
    const styling = {
        backgroundColor: props.bgColor,
        top: props.top,
        textAlign: 'center',
    };
    return (
        <div style={styling} className='Alert w-50'>
            {props.message}
        </div>
    );
}
