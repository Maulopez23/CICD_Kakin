import {useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {Link, useNavigate} from 'react-router-dom';


const Login = ({setToken}) => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '', Password: ''
  });

  console.log(formData)

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData, 
        [e.target.name]: e.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      // CHECK THIS PART
      const { data: userExistsData, error: userExistsError } = await supabase
      .from('User') // Replace 'users' with your actual table name
      .select('id')
      .eq('Email', formData.Email)

      if (userExistsError) {
        throw new Error('An error occurred while checking for user existence');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.Email,
        password: formData.Password,
      })

      if (error) {
        throw error;
      }

      console.log(data)
      setToken(data)
      navigate('./homepage');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/12/18/14/31/lake-1915846_1280.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',  // This ensures that the background image stays fixed while scrolling
    height: '100vh',  
  }}>
      <form onSubmit={handleSubmit} className='flex justify-center items-center w-full h-screen'>
        <div className='w-96 h-86 p-6 shadow-lg bg-white rounded-md'>
          <h1 className='text-3xl font-semibold flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Iniciar sesion
          </h1>
  
          <div className='mt-6'>
            <label className='block text-base mb-2' htmlFor="Email">Email</label>
            <input className='border border-2 rounded-md w-full text-base px-2 py-1 focus:outline-none focus:ring-2 focus:border-gray-300' placeholder='email' name='Email' onChange={handleChange}/>
          </div>
  
          <div className='mt-4'>
            <label className='block text-base mb-2' htmlFor="Password">Contraseña</label>
            <input className='border border-2 rounded-md w-full text-base px-2 py-1 focus:outline-none focus:ring-2 focus:border-gray-300' placeholder='contraseña' name='Password' type='password' onChange={handleChange}/>
          </div>
  
          <div className='mt-4'>
            <a href=''><Link to={'/signup'}>¿Aun no tienes una cuenta?</Link></a>
          </div>
  
          <div className='mt-6 flex items-center justify-center'>
            <button className='bg-blue-300 w-full rounded-md flex items-center justify-center hover:bg-blue-400 py-1' type='submit'> Ingresar </button>
          </div>
        </div>
      </form>
    </div>
  );
  
}

export default Login