import {supabase} from '../../supabase/client.js';
 // Make sure to import your Supabase configuration

export async function getUserByID(UserID) {
    try {
        let { data: User, error } = await supabase
          .from('User')
          .select('Username')
          .eq('id', UserID);

        if (error) {
          throw new Error(`Error fetching users: ${error.message}`);
        }

        if (User && User.length > 0) {
            return User[0].Username;
        } else {
            return null; // Return null if no user with the given UserID is found
        }
      } catch (e) {
        // Log the error to the console
        console.error(e.message);
        return null; 
      }
}
