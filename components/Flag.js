import React from 'react';

function Flag(props) {
    let flag = props.country.toLowerCase();

    if(flag == 'uk') flag = 'gb';

    return (
        <span className={`flag-icon flag-icon-${flag}`}></span>
    );
}

export default Flag;
