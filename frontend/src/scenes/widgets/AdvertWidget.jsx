import {typography, useTheme} from "@mui/system";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import {Typography} from "@mui/material";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                color={dark}
                variant={"h5"}
                fontWeight={"500"}
                >Sponsored</Typography>
                <Typography
                    color={medium}
                >Create ad</Typography>
            </FlexBetween>
            <img width={"100%"}
                 height={"auto"}
                 alt={"advert"}
                 src={"http://localhost:8001/assets/info4.jpeg"}
                 style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>HerbertCosmetics</Typography>
                <Typography color={main}>Trpimherpesem.cz</Typography>
            </FlexBetween>
            <Typography color={medium} margin={"0.5rem 0"}>
                Your pathway to stunning and immaculate skin!
            </Typography>

        </WidgetWrapper>
    )
}



export default AdvertWidget;