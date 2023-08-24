import React from 'react'
import styles from "./Button.module.scss";
const Button = (props) => {
   const { variant = "primary", type = "button", children, ...otherProps } = props
   return (
      <button
         type={type}
         className={`${styles.common_btn} ${styles[`variant-${variant}`]}`}
         {...otherProps}>{children}
      </button>
   )
}

export default Button;