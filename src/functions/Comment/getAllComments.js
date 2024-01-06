import {supabase} from '../../supabase/client.js';

export async function getAllComments() {
    try {
      const { data: comments, error } = await supabase
        .from('Comment')
        .select('*');

      if (error) {
        throw new Error(`Error fetching comments: ${error.message}`);
      }

      console.log(comments);
    } catch (e) {
      console.error(e.message);
    }
  }