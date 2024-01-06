import {supabase} from '../../supabase/client.js';

export async function getLikesCountByPostID(PostID) {
    try {
      const { data: Like, error } = await supabase
        .from('Like')
        .select('*')
        .eq('PostID', PostID);

      if (error) {
        console.error('Error retrieving likes:', error.message);
        return -1; // Return -1 or any other appropriate error indicator
      }

      const totalLikes = Like ? Like.length : 0;
      // console.log(`Total likes for PostID ${PostID}: ${totalLikes}`);
      return totalLikes;
    } catch (error) {
      console.error('Error retrieving likes:', error);
      return -1;
    }
  }