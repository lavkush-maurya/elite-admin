import React from 'react';
import "./styles/Typography.scss";

const variantMap = {
   h1: "h1",
   h2: "h2",
   h3: "h3",
   h4: "h4",
   h5: "h5",
   h6: "h6",
   subtitle: "h2",
   body: "p",
   small: "p",
   widgetAmount: "h2",
   smBold700: "h2",
   widgetCount: "p",
   widgetTitle: "p",
   dataGridTitle: "h2",
   dataGridSubTitle: "p",
   dataGridSmall: "p",


}

const Typography = ({ variant, color = "primary", children, ...otherProps }) => {
   const Component = variant ? variantMap[variant] : "p";
   return (
      <Component
         className={`typography__variant_${variant} typography__color_${color}`}
         {...otherProps}
      >
         {children}
      </Component>
   )
}

export default Typography