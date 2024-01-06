import {supabase} from '../../supabase/client.js';

export async function postLikeByPostID(PostID, UserLikeID) {
    const { data: existingRecords, error } = await supabase
      .from('Like')
      .select('*')
      .eq('PostID', PostID)
      .eq('UserLikeID', UserLikeID);

    if (error) {
      console.error('Error checking for existing records:', error.message);
      return;
    }

    if (existingRecords.length > 0) {
      console.log(
        'A record with the same PostID and UserLikeID already exists.'
      );
      return;
    }

    // If no existing record found, proceed with the insert
    const { data, error: insertError } = await supabase
      .from('Like')
      .insert([{ PostID, UserLikeID }])
      .select();

    if (insertError) {
      console.error('Error inserting new record:', insertError.message);
    } else {
      console.log('New like record inserted successfully.');
    }
  }