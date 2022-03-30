import React from 'react';

const Liked = (props) => {
    let classes = "fa fa-heart";
    if (props.like) classes += "-o"
    return ( 
            <i className= {classes} aria-hidden="true" onClick={props.onClick}/>
     );
}
 
export default Liked;