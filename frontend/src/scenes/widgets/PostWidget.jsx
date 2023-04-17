import {
    ChatBubbleOutlined,
    FavoriteOutlined,
    FavoriteBorderOutlined, ShareOutlined, RepeatOnSharp, Chat
} from "@mui/icons-material";
import {Box, Divider, IconButton, Typography, useTheme} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPost, setPosts} from "../../state";


const PostWidget = ({
                        postId,
                        userId,
                        name,
                        description,
                        location,
                        picturePath,
                        userPicture,
                        likes,
                        comments,
                    }) => {
    // determine if we opened the comments list or not
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    // pokud se podivam do models v BE, a likes -> type: Map of Boolean
    // represents likes = likes {
    // "userid1: true,
    // "userid2": true
    //}
    // muzeme takto zkontrolovat zda dal like nebo ne abysme vedeli jestli to ma current user likenute nebo ne
    // nelikenute prazdne srdicko likenute vyplnene sridkco
    const isLiked = Boolean(likes[loggedInUserId]);


    const likeCount = Object.keys(likes).length;
    // this grabs number of likes

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:8001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            //
            body: JSON.stringify({userId: loggedInUserId})
        });
        const updatedPost = await response.json();
        dispatch(setPosts({post: updatedPost}));
    };

    return (
        <WidgetWrapper margin={"2rem 0"}>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />

            <Typography color={main} sx={{mt: "1rem"}}>
                {description}
            </Typography>

            {picturePath && (
                <img
                    width={"100%"}
                    height={"auto"}
                    alt="post"
                    style={{borderRadius: "0.75rem, marginTop: 0.75rem"}}
                    src={`http://localhost:8001/assets/${picturePath}`}
                />

            )}

            <FlexBetween mt={"0.25rem"}>
                <FlexBetween gap={"1rem"}>

                    {/*LIKE*/}
                    <FlexBetween gap={"0.3rem"}>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color: primary}}/>
                            ) : (
                                <FavoriteBorderOutlined/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    {/*COMMENT*/}
                    <FlexBetween gap={"0.3rem"}>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlined/>
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined/>
                </IconButton>
            </FlexBetween>


            {isComments && (
                <Box mt={"0.5rem"}>
                    {comments.map((comment, i) => (
                        <Box key={`${name} - ${i}`}>
                            <Divider />
                                <Typography
                                    sx={{color: main, m: "0.5rem 0", paddingLeft: "1rem"}}
                                >
                                    {comment}
                                </Typography>
                        </Box>
                    ))}
                    <Divider/>
                </Box>
            )}
        </WidgetWrapper>
    )


}

export default PostWidget;