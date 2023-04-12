import User from "../models/User.js"

/* READ */
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({message: "GET USER ERR" + err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )

        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({message: "GET USER FRIENDS ERR" + err.message});
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            // removing when id is equal to friend id
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((idd) => idd !== id)
        } else {
            user.friends.push(friend);
            friend.friends.push(id);
        }
        // if one removes one another they both get removed !

        await user.save();
        await friend.save();

        // we want friend list to be formatted for frontend
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({message: "ADD REMOVE FRIEND ERR" + err.message});
    }
}