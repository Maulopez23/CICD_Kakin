import {supabase} from '../../supabase/client.js';

export async function getCommentsCountByPostID(PostID) {
    try {
      const { data: comments, error } = await supabase
        .from('Comment')
        .select('*')
        .eq('PostID', PostID);
  
      if (error) {
        throw new Error(`Error fetching comments: ${error.message}`);
      }
  
      return comments ? comments.length : 0; // Return the number of comments
    } catch (e) {
      console.error(e.message);
      return -1; // Return -1 or any other appropriate error indicator
    }
  }