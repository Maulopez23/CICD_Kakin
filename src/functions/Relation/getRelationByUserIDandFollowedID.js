import {supabase} from '../../supabase/client.js';

export async function getRelationByUserIDandFollowedID(UserID, FollowedUserID) {
    try {
      const { data: relation, error } = await supabase
        .from('Relation')
        .select('*')
        .eq('UserID', UserID)
        .eq('FollowedUserID', FollowedUserID);
  
      if (error) {
        throw new Error(`Error fetching relations: ${error.message}`);
      }
  
      // Check if any records were found
      const hasRelation = relation.length > 0;
  
      return hasRelation; // Return true if records found, false if not
    } catch (e) {
      console.error(e.message);
      return false; // Return false on error
    }
  }