import {supabase} from '../../supabase/client.js';

export async function postUnfollowUser(UserID, FollowedUserID) {
    // Check if the relationship exists
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

    if (existingRelation.length === 0) {
      console.log(`User ${UserID} doesn't follow User ${FollowedUserID}.`);
      return;
    }

    // If the relationship exists, proceed with the delete
    const { error } = await supabase
      .from('Relation')
      .delete()
      .eq('UserID', UserID)
      .eq('FollowedUserID', FollowedUserID);

    if (error) {
      console.error('Error deleting the relationship:', error.message);
      return;
    }

    console.log(`User ${UserID} has unfollowed User ${FollowedUserID}.`);
  }