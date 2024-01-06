import {supabase} from '../../supabase/client.js';

export async function postFollowUser(UserID, FollowedUserID) {
    const { data: existingRelation, error: relationError } = await supabase
      .from('Relation')
      .select()
      .eq('UserID', UserID)
      .eq('FollowedUserID', FollowedUserID);

    if (relationError) {
      console.error(
        'Error checking existing relationship:',
        relationError.message
      );
      return;
    }

    if (existingRelation.length > 0) {
      console.log(`User ${UserID} already follows User ${FollowedUserID}.`);
      return;
    }

    // If the relationship doesn't exist, proceed with the insert
    const { data, error } = await supabase
      .from('Relation')
      .insert([{ UserID, FollowedUserID }])
      .select();

    if (error) {
      console.error('Error inserting new relationship:', error.message);
      return;
    }

    console.log(`User ${UserID} is now following User ${FollowedUserID}.`);
  }