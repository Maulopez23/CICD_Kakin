import {supabase} from '../../supabase/client.js';

export async function countFollowedUsers(UserID) {
    try {
      const { count, error } = await supabase
        .from('Relation')
        .select('FollowedUserID', { count: 'exact', head: true })
        
  
      if (error) {
        throw new Error(`Error counting followed users: ${error.message}`);
      }
  
      
      console.log(`Number of followed users for UserID ${UserID}: ${count}`);
      return count;
    } catch (error) {
      console.error('Error counting followed users:', error);
      throw error; 
    }
  }