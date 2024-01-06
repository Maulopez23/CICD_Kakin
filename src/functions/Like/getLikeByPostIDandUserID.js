import {supabase} from '../../supabase/client.js';

export async function getLikeByPostIDandUserID(PostID, UserID) {
    try {
      const { data: Like, error } = await supabase
        .from('Like')
        .select('*')
        .eq('PostID', PostID)
        .eq('UserLikeID', UserID);
    
        return Like.length === 1
    } catch (error) {
      return false;
    }
  }