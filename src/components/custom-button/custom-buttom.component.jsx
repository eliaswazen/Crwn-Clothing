import React from 'react';
import './custom-button.styles.scss';


const CustonButton =({children, isGoogleSignIn, inverted,...otherProps})=>(

    <button className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustonButton;