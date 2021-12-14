import React from 'react'

const datentime = (date) => {

        let hours = date.getHours();
        let minutes = date.getMinutes();    
        const ampm = hours >= 12 ? 'pm' : 'am';
      
        hours %= 12;
        hours = hours || 12;    
        minutes = minutes < 10 ? `0${minutes}` : minutes;
      
        const strTime = `${hours}:${minutes} ${ampm}`;
        return strTime;
}

export default datentime;
