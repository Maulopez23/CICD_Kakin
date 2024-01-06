import {supabase} from '../../supabase/client.js';

export async function postPost(Text, PostUser) {
    try {
        const { data, error } = await supabase
          .from('Post')
          .insert([
            { Text: Text, PostUser: PostUser },
          ])
          .select();
      
        if (error) {
          // Handle the error here, for example:
          console.error('Error inserting data:', error);
        } else {
          // Handle successful insertion here if needed
          console.log('Data inserted successfully:', data);
        }
      } catch (error) {
        // Handle any unexpected errors here
        console.error('An unexpected error occurred:', error);
      }
      
}