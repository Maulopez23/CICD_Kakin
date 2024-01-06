import {supabase} from '../../supabase/client.js';
 // Make sure to import your Supabase configuration

export async function getAllUsers() {
  try {
    const { data: users, error } = await supabase
      .from('User')
      .select('*');

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    console.log(users);
  } catch (e) {
    // Log the error to the console
    console.error(e.message);

    // Display a styled error message on the UI
    showErrorNotification(e.message);
  }
}
