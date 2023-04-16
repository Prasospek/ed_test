import {Box} from "@mui/material"
// Box is a component provided by Material-UI that allows you to
// create a flexible box layout using CSS Flexbox or CSS Grid

import {styled} from "@mui/system";
// It allows you to define styles for your components
// using JavaScript instead of writing external CSS files.



// celou dobu jsem tu mel chybu a nebylo to dopre odpadingovany a bylo to prilepeny
// prtoze jsem mel 1.5 rem a ne 1.5rem
const WidgetWrapper = styled(Box) (({theme}) => ({
    padding: "1.3rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}));

export default WidgetWrapper;