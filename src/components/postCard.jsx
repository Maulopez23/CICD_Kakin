import { useEffect, useState } from 'react';
import {formatTimestamp} from '../functions/formatTimestamp';
import {getLikesCountByPostID} from '../functions/Like/getLikesCountByPostID.js';
import {getCommentsCountByPostID} from '../functions/Comment/getCommentsCountByPostID.js';
import {getLikeByPostIDandUserID} from '../functions/Like/getLikeByPostIDandUserID.js';
import {postLikeByPostID} from '../functions/Like/postLikeByPostID.js';
import {deleteLikeByPostID} from '../functions/Like/deleteLikeByPostID.js';
import {getUserByID} from '../functions/User/getUserByID.js';
import PostCommentSection from './PostCommentSection';

const PostCard = ({PostUserID, PostText, PostTime, PostID, ActiveUserID}) => {

    const [likes, setLikes] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [activeUsername, setActiveUsername] = useState('');
    const [activeComment, setActiveComment] = useState(false);
    
    async function getUsername(){
        setActiveUsername(await getUserByID(PostUserID))
    }
    
    async function getCountLikesAndComments() {
        try {
            setLikes(await getLikesCountByPostID(PostID));
            setCommentsCount(await getCommentsCountByPostID(PostID));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleLikeClick(PostID){
        const hasLiked = await getLikeByPostIDandUserID(PostID, ActiveUserID);

        if (hasLiked === false) {
            // Call the postLikeByPostID function
            await postLikeByPostID(PostID, ActiveUserID);
        } else {
            // Call the deleteLikeByPostID function
            await deleteLikeByPostID(PostID, ActiveUserID);
        }
        getCountLikesAndComments()
    }

    async function handleCommentClick(PostID){
        if(!activeComment){
            setActiveComment(true)
        }else{
            setActiveComment(false)
        }
    }
    
    useEffect(() => {
        getCountLikesAndComments()
        getUsername()
    }, [])

    return (
                <div className="bg-white h-50 w-2/2 p-6 ml-6 mr-6 mt-6 rounded-md transform transition-transform hover:scale-105">
                    <div className='flex' id='Superior'>
                        <div className='flex w-60'>
                            <h1 className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {activeUsername}
                            </h1>
                        </div>
                        <div className='flex justify-end w-full'>
                            <h1> Hace {formatTimestamp(PostTime)}</h1>
                        </div>
                    </div>
                    <div className='mt-4' id='Centro'>
                        <h1>{PostText}</h1>
                    </div>
                    <div className='flex mt-4' id='Inferior'>
                        <div className='flex  w-20 h-5'>
                            <button className='flex' onClick={() => handleLikeClick(PostID)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`mr-1 w-6 h-6 hover:text-green-500 ${likes ? 'text-green-500' : ''}`}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                {likes !== undefined ? likes : 'Loading...'}
                            </button>
                        </div>
                        <div>
                        <button className='flex' onClick={() => handleCommentClick(PostID)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`mr-1 w-6 h-6 hover:text-green-500`}>
                                    {/* <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" /> */}
                                </svg>
                                Commentarios: {commentsCount !== undefined ? commentsCount : 'Loading...'}
                            </button>
                        </div>
                    </div>
                    {activeComment ? <PostCommentSection PostID={PostID} UserCommentID={ActiveUserID} updateCommentsCount={getCountLikesAndComments}/> : ''}
                </div>
    )
}

export default PostCard