import {supabase} from '../../supabase/client.js';

export async function deleteLikeByPostID(PostID, UserLikeID) {
    // Check if a record with the specified PostID and UserLikeID exists
    const { data: existingRecords, error } = await supabase
      .from('Like')
      .select()
      .eq('PostID', PostID)
      .eq('UserLikeID', UserLikeID);

    if (error) {
      console.error('Error checking for existing records:', error.message);
      return;
    }

    if (existingRecords.length === 0) {
      console.log(
        'No record with the specified PostID and UserLikeID found. Delete action canceled.'
      );
      return;
    }
    // If an existing record is found, proceed with the delete
    const { error: deleteError } = await supabase
      .from('Like')
      .delete()
      .eq('PostID', PostID)
      .eq('UserLikeID', UserLikeID);

    if (deleteError) {
      console.error('Error deleting the record:', deleteError.message);
    } else {
      console.log('Like deleted successfully');
    }
  }