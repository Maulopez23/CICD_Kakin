import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../../supabase/client';
import {getUserIDbyEmail} from '../../functions/User/getUserIDbyEmail.js';
import {postPost} from '../../functions/Post/postPost.js';
import PostCard from '../../components/PostCard';
import {getAllUserRelation } from '../../functions/Relation/getAllUserRelation';

const FriendsHomepage = ({token}) => {

    const navigate = useNavigate()
    const [inputText, setInputText] = useState('');
    const [activeUser, setActiveUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const postsPerPage = 5;

    async function getAllPost() {
        try {
            //
            const user = await getUserIDbyEmail(token.user.email)
            setActiveUser(user[0].id)

            const followedUsers = await getAllUserRelation(user[0].id);

            if (followedUsers.length === 0) {
                setPosts([]); // No followed users, clear posts
                return;
            }

            const { data: Post, error: postError  } = await supabase
            .from('Post')
            .select('*')
            .in('PostUser', followedUsers)
            .order('Created_at', { ascending: false })
            .range(0, page * postsPerPage);

            if (postError) {
                throw postError;
            }

            setPosts(Post);

            if ((Post.length)/page < postsPerPage) {
                setHasMorePosts(false);
              }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleLogout(){
        sessionStorage.removeItem('token');
        navigate('/');
    }

    async function handlePostSubmit(e){
        e.preventDefault()
        const user = await getUserIDbyEmail(token.user.email)
        console.log('A new post has been submitted ' + inputText)
        await postPost(inputText, user[0].id)
        setInputText('');
        getAllPost()
    }

    useEffect(() => {
        getAllPost()
    }, [page])

    return (

    <div style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',  // This ensures that the background image stays fixed while scrolling
    height: '100vh',  
    }}>
        <div className='flex h-full w-full'> 
        
            <div className='fixed bg-white h-5/6 w-72 ml-16 mt-6 py-4 rounded-md flex flex-col items-center justify-between'>
                    <div className='flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                        <h1 className='font-semibold'> Bienvenido, {token.user.user_metadata.first_name}</h1>
                        <div id='navButtons' className='mt-6 flex flex-col justify-center'>
                            <button onClick={() => {navigate('/homepage');}} className="flex w-52 font-semibold py-1 px-6 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Pagina principal
                            </button>
                            <button onClick={() => {navigate('/friends');}} className="flex bg-blue-400 w-52 hover:bg-blue-500 text-white font-semibold py-1 px-6 rounded-lg text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            Amigos
                            </button>
                            <button onClick={() => {navigate('/findusers');}} className="flex w-52 font-semibold py-1 px-6 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                            Explora
                            </button>
                            <button onClick={() => {navigate('/profile');}} className="flex w-52 font-semibold py-1 px-6 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            Perfil
                            </button>
                        </div>
                    </div>
                    <button onClick={handleLogout} className='flex ml-2 w-52 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Cerrar sesión</button>
            </div>

            
            <div className='ml-96 w-3/5'>
                <div className='mt-6 bg-white rounded-md p-6  w-auto '>
                   Posts de Amigos
                </div>

                <div className='mt-4 h-1/2 w-full overflow-y-auto overflow-y-scroll overflow-hidden hover:overflow-y-scroll scrollbar scrollbar-thumb-grey-200 scrollbar-thin'>
                      
                        {posts.length === 0 ? (
                            <div className='bg-white h-50 w-2/2 p-6 mt-6 rounded-md'>
                                <p>No hay posts, sigue a alguien</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <PostCard key={post.id} PostUserID={post.PostUser} PostText={post.Text} PostTime={post.Created_at} PostID={post.id} ActiveUserID={activeUser} />
                            ))
                        )}
                
                </div>
                <div className="flex justify-center mt-2">
                {hasMorePosts && (
            <button
              className="bg-blue-400 hover-bg-blue-500 text-white font-semibold py-1 px-6 rounded-md"
              onClick={() => setPage(page + 1)}
            >
              Cargar
            </button>
          )}
          </div>

            </div>       
        </div>
    </div>
    )
}

export default FriendsHomepage

