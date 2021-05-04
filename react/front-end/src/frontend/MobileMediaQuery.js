import React from 'react';
import background from "./images/front-page-background.png"
import mobileBackground from "./images/front-page-background-mobile.png"

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(max-width:540px)');
    if (matches){
        return <div className="background" style={{ backgroundImage:`url(${mobileBackground})` }}></div>

    } else {
        return <div className="background" style={{ backgroundImage:`url(${background})` }}></div>

}};