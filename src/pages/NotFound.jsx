import {useState} from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {

  return (
    <div className='flex justify-center items-center h-screen'>
        <img src='../../404.svg' alt='404 Not Found' className='h-64 w-64'/>
        <div id='text' className='ml-16'>
          <h1 className='font-bold text-4xl'> 404 <br/> You're lost</h1>
          <p className='font-light mb-8'> The page you are looking for does not exist. <br/> How you got here is a mystery. But you can click the button <br/> below to go back to the homepage.</p>
            <Link className='w-12 h-fit px-4 py-1 rounded-full border-2 text-sm hover:bg-gray-200 hover:text-white hover:font-semibold transition duration-200 ease-in-out' to={'/'}> Go to  Home</Link> 
        </div>
    </div>
  );
  
}

export default NotFound