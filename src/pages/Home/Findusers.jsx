import {useEffect, useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {Link, useNavigate} from 'react-router-dom';
import {getUserIDbyEmail} from '../../functions/User/getUserIDbyEmail.js';
import {getRelationByUserIDandFollowedID} from '../../functions/Relation/getRelationByUserIDandFollowedID.js';
import {postFollowUser} from '../../functions/Relation/postFollowUser.js';
import {postUnfollowUser} from '../../functions/Relation/postUnfollowUser.js';
import UserCard from '../../components/UserCard'

const Findusers = ({token}) => {

    const navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem('token');
        navigate('/');
    }

    function handleHomePage(){
        navigate('/homepage');
    }

  //this is a test
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Implement a debounce function to delay the API request
    const fetchCurrentUser = async () => {
      try {
        const user = await getUserIDbyEmail(token.user.email);
        setCurrentUser(user[0].id);
      } catch (error) {
        console.error('Error fetching current user:', error.message);
      }
    };

    fetchCurrentUser();

    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    // Function to fetch search results
    const fetchSearchResults = async (input) => {
      setLoading(true);
      try {
        const { data: users, error } = await supabase
          .from('User')
          .select('*')
          .ilike('Username', `%${input}%`); // Adjust column name as needed

        if (error) {
          throw error;
        }

        const filteredUsers = users.filter((user) => user.id !== currentUser);
        setSearchResults(filteredUsers || []);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching search results:', error.message);
        setLoading(false);
      }
    };

    const debouncedFetch = debounce(fetchSearchResults, 300); // Adjust the delay as needed

    if (inputValue.trim() !== '') {
      debouncedFetch(inputValue);
    } else {
      setSearchResults([]);
    }
  }, [inputValue, currentUser, token.user.email]);
    //end of test

    const handleShowAllUsers = async () => {
      try {
        const { data: allUsers, error } = await supabase
          .from('User')
          .select('*');
  
        if (error) {
          throw error;
        }
        const filteredUsers = allUsers.filter((u) => u.id !== currentUser);
        setSearchResults(filteredUsers || []);
      } catch (error) {
        console.error('Error fetching all users:', error.message);
      }
    };

    async function handleFollow(UserID){
      // console.log( 'The user ' + user[0].id + ' started to follow ' + UserID);
      const hasLiked = await getRelationByUserIDandFollowedID(currentUser, UserID);

      if (hasLiked === false) {
          // Call the postLikeByPostID function
          await postFollowUser(currentUser, UserID);
      } else {
          // Call the deleteLikeByPostID function
          await postUnfollowUser(currentUser, UserID);
      }
    }

  return (
<>
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
                            <button onClick={() => {navigate('/homepage');}} className="flex w-52 font-semibold py-1 px-6 text-left rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Pagina principal
                            </button>
                            <button onClick={() => {navigate('/friends');}} className="flex w-52 font-semibold py-1 px-6 text-left rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            Amigos
                            </button>
                            <button onClick={() => {navigate('/findusers');}} className="flex bg-blue-400 w-52 hover:bg-blue-500 text-white font-semibold py-1 px-6 rounded-md text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                            Explora
                            </button>
                            <button onClick={() => {navigate('/profile');}} className="flex w-52 font-semibold py-1 px-6 text-left rounded-md">
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
            <div className='ml-96 mr-2 w-3/5'>
          
          <div className=' mt-6 bg-white rounded-md p-6 h-fit w-full'>
                  <div>
                    <h1 className='flex font-semibold'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                      Agregar amigos</h1>
                  </div>
                  <div className='mt-2'>
                      <input
                      className='border border-2 rounded-md w-full text-base  focus:outline-none focus:ring-1 focus:border-gray-300'
                      type="text"
                      placeholder=" Escriba el usuario del amigo que desea agregar"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      />
                  </div>

                  <div  className='flex justify-end mt-3'>
                      <button className='bg-blue-300 w-46 p-1 rounded-md flex items-center justify-center hover:bg-blue-400 px-4 py-2 text-sm' onClick={handleShowAllUsers}>Enseñar todos los usuarios</button>
                  </div>
          </div>

          <div className=' mt-4 h-2/3 w-full overflow-y-auto overflow-y-scroll overflow-hidden hover:overflow-y-scroll scrollbar scrollbar-thumb-grey-200 scrollbar-thin'>
            <div className=''>
              {loading && <div>Loading...</div>}
              {searchResults.length === 0 && !loading && (
                <div className='bg-white h-50 w-full  p-6 mt-6 rounded-md'>
                  <p>Este usuario no existe</p>
                </div>
              )}
              {searchResults.length > 0 && (
                <div>
                  {searchResults.map((user) => (
                    <UserCard key={user.id} id={user.id} username={user.Username} token={token}></UserCard>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
    </div>
      </>
   
  );
  
}

export default Findusers