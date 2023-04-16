import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {Box, Divider, Typography,
    InputBase, useTheme, Button,
    IconButton, useMediaQuery}
    from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "state";

// It is expecting an object as an argument
// and directly extracting the picturePath property from it.
// Tim ze ten arugment je v {}
const MyPostWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const {palette} = useTheme();

    // The destructuring assignment syntax {_id}
    // is used to extract the _id property from the state.user
    // takze diky tomu staci jen state.user a nemusim psat state.user._id
    const {_id} = useSelector((state) => state.user);
    // {} u tokenu by znamenalo state.token is not an object
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
}

export default MyPostWidget;