import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";
import PostWidget from "./PostWidget";

const PostsWidgets = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token)


    const getPosts = async () => {
        const response = await fetch("http://localhost:8001/posts", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        })

        const data = await response.json();
        dispatch(setPosts({posts: data}))
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:8001/${userId}/posts`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        })

        const data = await response.json();
        dispatch(setPosts({posts: data}))
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []) // // eslint-disable-next-line react-hooks/exhaustive-deps
    // giving here an empty array so it only calls once

    // NEZOBRAZOVALO SE MI U USERU OBLICEJ V POSTECH VYRESIM TO ZDE
    return (
        <>
            {/*CREATING COMPONENT FOR EACH POST */}
            {posts.map(
                ({
                     _id,
                     userId,
                     firstName,
                     lastName,
                     description,
                     location,
                     picturePath,
                     userPicturePath,
                     likes,
                     comments,
                 }) => (
                    <PostWidget
                        // je tu treba key aby nam react nedal error
                        //  Warning: Each child in a list should have a unique "key" prop.
                        key={_id}
                        postId={_id}
                        // TADY SE NEZOBRAZOVAL OBRAZEK UZIVATELU VE FEEDU
                        // KDYZ TU BYLO userId = {userId} tak mi to hazelo friends.find is not a function
                        postUserId={userId}
                        name={`${firstName}${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsWidgets;