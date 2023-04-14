import {Box} from "@mui/material"
// Box is a component provided by Material-UI that allows you to
// create a flexible box layout using CSS Flexbox or CSS Grid

import {styled} from "@mui/system";
// It allows you to define styles for your components
// using JavaScript instead of writing external CSS files.


// STYLE component se tomuhle rika
// good if you are reusing css as component
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;