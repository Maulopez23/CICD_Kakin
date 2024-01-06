import {supabase} from '../../supabase/client.js';

export async function getUsernameByID(UserID) {
    try {
        let { data: User, error } = await supabase
        .from('User')
        .select("Username")
        .eq('id', UserID)

      if (error) {
        throw new Error(`Error fetching comments: ${error.message}`);
      }

      console.log(User);
      return User;
    } catch (e) {
      console.error(e.message);
      return null
    }
  }