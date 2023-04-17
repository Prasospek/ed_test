import {PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {setFriends} from "../state";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import {useNavigate} from "react-router-dom";

const Friend = ({friendId, name, subtitle, userPicturePath}) => {
    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    // user has friends arary attached

    const isFriend = friends.find((friend) => friend._id === friendId);


    const patchFriend = async () => {
        const response = await fetch(`http://localhost:8001/users/${id}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        dispatch(setFriends({friends: data}));
    }

    return (
        <FlexBetween>
            <FlexBetween gap={"1rem"}>
                <UserImage image={userPicturePath}/>

                <Box onClick={() => {
                    navigate(`/profile/${friendId}`);
                    // je tu bug kdyz jdes k userovi a jejich profile page a kliknes na jiny profile
                    // url se updatne ale ne componenty

                    navigate(0);
                }}
                >
                    <Typography
                        color={main}
                        variant={"h5"}
                        fontWeight={"500"}
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    > {name}
                    </Typography>

                    <Typography color={medium} fontSize={"0.75rem"}>
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            <IconButton
                onClick={() => patchFriend()}
                sx={{backgroundColor: primaryLight, padding: "0.6rem"}}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{color: primaryDark}}/>
                ) : (
                    <PersonAddOutlined sx={{color: primaryDark}}/>
                )}

            </IconButton>

        </FlexBetween>
    )

}


export default Friend;