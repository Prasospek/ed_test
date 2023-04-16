import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined, More,
} from "@mui/icons-material";

import {
    Box, Divider, Typography,
    InputBase, useTheme, Button,
    IconButton, useMediaQuery
}
    from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";

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


    const handlePost = async () => {
        // so we can pass image
        const formData = new FormData();
        formData.append("userID", _id);
        formData.append("description", post);

        //u app.post("/posts") mame upload.single("picture") takze to bere jako key ten picture
        if (image) {
            formData.append("picture", image);

            // image name path
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:8001/posts`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost("");
        // this will reset once we make an api call
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath}/>
                <InputBase
                    placeholder={"Whats on your mind ?"}
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>

            {isImage && (
                <Box
                    borderRadius={"5px"}
                    border={`1px solid ${medium}`}
                    mt={"1rem"}
                    padding={"1rem"}
                >
                    <Dropzone
                        acceptedFiles={".jpg,.jpeg,.png"}
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({getRootProps, getInputProps}) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    padding={"1rem"}
                                    width={"100%"}
                                    sx={{"&:hover": {cursor: "pointer"}}}
                                >
                                    <input {...getInputProps()}/>
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined/>
                                        </FlexBetween>
                                    )}
                                </Box>
                                {/*adding trash button if they want to remove */}
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{width: "15%"}}
                                    >
                                        <DeleteOutlined/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{margin: "1.25rem 0"}}/>

            <FlexBetween>
                <FlexBetween
                    gap={"0.25rem"}
                    onClick={() => setImage(!isImage)}
                >
                    <ImageOutlined sx={{color: mediumMain}}/>
                    <Typography
                        color={mediumMain}
                        sx={{"&:hover": {cursor: "pointer", color: medium}}}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap={"0.25rem"}>
                            <GifBoxOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap={"0.25rem"}>
                            <AttachFileOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap={"0.25rem"}>
                            <MicOutlined sx={{color: mediumMain}}/>
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>

                    </>
                ) : (
                    <FlexBetween gap={"0.25rem"}>
                        <MoreHorizOutlined sx={{color: mediumMain}}/>
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )

}


export default MyPostWidget;