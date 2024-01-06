import { supabase } from '../../supabase/client.js';

export async function postUser(Username, Email) {
  try {
    // First, check if a user with the same email exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('User')
      .select('id')
      .eq('Email', Email);

    if (existingUserError) {
      throw new Error('An error occurred while checking for an existing user');
    }

    if (existingUser.length > 0) {
      // User with the same email already exists, display a customized modal
      showCustomModal('Ya existe un usuario con ese email, ingrese otro porfavor');
      return; // Exit the function
    }

    // If no user with the same email exists, proceed with the insert
    const { data, error } = await supabase
      .from('User')
      .insert([{ Username: Username, Email: Email }])
      .select();

    if (error) {
      throw error;
    }

    console.log('User inserted successfully');
    // Continue with any other actions you need to perform after insertion
  } catch (error) {
    console.error(error);
    // Display a customized modal for other errors
    showCustomModal(error.message);
  }
}

function showCustomModal(message) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'fixed top-0 left-0 w-full h-full flex items-top justify-center';
  const modal = document.createElement('div');
  modal.className = 'bg-red-200 h-20 w-96 p-6 rounded shadow-md';
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-600 hover:text-red-500 float-right';
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => modalContainer.remove());
  const messageParagraph = document.createElement('p');
  messageParagraph.textContent = message;
  modal.appendChild(closeButton);
  modal.appendChild(messageParagraph);
  modalContainer.appendChild(modal);
  document.body.appendChild(modalContainer);
}
