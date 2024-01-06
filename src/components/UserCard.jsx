import { useEffect, useState } from 'react';
import {getRelationByUserIDandFollowedID} from '../functions/Relation/getRelationByUserIDandFollowedID.js';
import {postFollowUser} from '../functions/Relation/postFollowUser.js';
import {postUnfollowUser} from '../functions/Relation/postUnfollowUser.js';
import {getUserIDbyEmail} from '../functions/User/getUserIDbyEmail.js';

const UserCard = ({username, id, token}) => {

    const [hasFollowed, setHasFollowed] = useState(false);

    async function handleFollow(UserID){
        const user = await getUserIDbyEmail(token.user.email);

        if (!hasFollowed) {
            await postFollowUser(user[0].id, UserID);
            setHasFollowed(true);
        } else {
            await postUnfollowUser(user[0].id, UserID);
            setHasFollowed(false);
        }
    }

    useEffect(() => {
        async function checkRelation() {
            const user = await getUserIDbyEmail(token.user.email);
            const relation = await getRelationByUserIDandFollowedID(user[0].id, id);

            if (relation) {
                setHasFollowed(true);
            } else {
                setHasFollowed(false);
            }
        }

        checkRelation()
    }, [id, token.user.email])

    return (
        
        <div className='w-full mt-3 bg-white rounded-md p-6 h-fit flex justify-between'>
          <h1 className='text-xl'> {username}</h1>
          <button className='bg-blue-300 w-46 p-1 rounded-3xl flex items-center justify-center hover:bg-blue-400 px-4 py-2' onClick={() => { handleFollow(id) }}> 
            {hasFollowed ? 'Following' : 'Follow'} 
          </button>
        </div>
     
    )
}

export default UserCard