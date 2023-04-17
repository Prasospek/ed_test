import {Box, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import userWidget from "../widgets/UserWidget";
import UserWidget from "../widgets/UserWidget";
import AdvertWidget from "../widgets/AdvertWidget";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:8001/users/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })

        // neukazoval se mi obrazek uzivatelu a bylo to protoze jsem tu nemel await
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) {
        return null;
    }

    // zkopiruju z homepage a upravim
    return (
        <Box>
            <Navbar/>
            <Box
                width={"100%"}
                padding={"2rem 6%"}
                display={isNonMobileScreens ? "flex" : "block"}
                gap={"2rem"}
                justifyContent={"center"}
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box margin={"2rem 0"} />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                     mt={isNonMobileScreens ? undefined : "2rem"}
                >

                    <MyPostWidget picturePath={user.picturePath} />
                    <Box margin={"2rem "} />
                    <PostsWidget userId={userId} isProfile />

                </Box>

            </Box>
        </Box>

    )
}

export default ProfilePage;