import {supabase} from '../../supabase/client.js';

export async function getAllRelationByUserID(UserID) {
    try {
      const { data: relation, error } = await supabase
        .from('Relation')
        .select('*')
        .eq('UserID', UserID);

      if (error) {
        throw new Error(`Error fetching relations: ${error.message}`);
      }

      console.log(relation);
    } catch (e) {
      console.error(e.message);
    }
  }