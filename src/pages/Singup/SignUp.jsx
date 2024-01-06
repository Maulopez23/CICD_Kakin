import {useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {Link} from 'react-router-dom'
import {postUser} from '../../functions/User/postUser.js';

const SignUp = () => {

  const [formData, setFormData] = useState({
    Fullname: '', Email: '', Password: ''
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
      postUser(formData.Fullname, formData.Email);
      const { data, error } = await supabase.auth.signUp({
        email: formData.Email,
        password: formData.Password,
        options: {
          data: {
            first_name: formData.Fullname,
          }
        }
      })
      showSuccessNotification('Chequee su correo para verificar su usuario')

    } catch (error) {
      console.log("error");
    }
  }

  function showSuccessNotification(message) {
    const successContainer = document.createElement('div');
    successContainer.className = 'fixed top-0 left-0 w-full h-full flex items-top justify-center';
    const successNotification = document.createElement('div');
    successNotification.className = 'bg-green-500 text-white h-20 w-96 p-6 rounded shadow-md';
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    successNotification.appendChild(messageParagraph);
    successContainer.appendChild(successNotification);
    document.body.appendChild(successContainer);
  
    setTimeout(() => {
      successContainer.remove();
    }, 7000); 
  }

  return (
    <div style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2013/03/04/20/59/valley-90388_1280.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',  
    height: '100vh',  
  }}> 
      <form onSubmit={handleSubmit} className='flex justify-center items-center w-full h-screen'>
      <div className='w-96 h-86 p-6 shadow-lg bg-white rounded-md'>
          <h1 className='text-3xl font-semibold flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
            Crear cuenta</h1>
        <p className='mt-4'>Llene los siguientes campos con su informacion</p>
       <div className='mt-6'>
          <label className='block text-base mb-2' htmlFor="Fullname">Usuario</label>
          <input className='border border-2 rounded-md w-full text-base px-2 py-1 focus:outline-none focus:ring-2 focus:border-gray-300' placeholder='usuario' name='Fullname' onChange={handleChange}/>
       </div>
       <div className='mt-4'>
          <label className='block text-base mb-2' htmlFor="Email">Email</label>
          <input className='border border-2 rounded-md w-full text-base px-2 py-1 focus:outline-none focus:ring-2 focus:border-gray-300' placeholder='email' name='Email' onChange={handleChange}/>
       </div>
       <div className='mt-4'>
          <label className='block text-base mb-2' htmlFor="Password">Contraseña</label>
          <input className='border border-2 rounded-md w-full text-base px-2 py-1 focus:outline-none focus:ring-2 focus:border-gray-300' placeholder='contraseña' name='Password' type='password' onChange={handleChange}/>
       </div>
       <div className='mt-4'>
            <a href=''><Link to={'/'}>¿Ya tienes una cuenta?</Link></a>
          </div>
    <div className='mt-6 flex items-center justify-center'>
      <button className='bg-blue-300 w-full rounded-md flex items-center justify-center hover:bg-blue-400 py-1' type='submit'>Registrar</button>
    </div>
    </div>
      </form>
    </div>
  )
}

export default SignUp