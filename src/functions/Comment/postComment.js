import {supabase} from '../../supabase/client.js';

export async function postComment(PostID, UserCommentID, Text) {
    try {
      const { data, error } = await supabase
        .from('Comment')
        .insert([
          { PostID: PostID, UserCommentID: UserCommentID, Text: Text },
        ])
        .select();

      if (error) {
        throw new Error(`Error posting comment: ${error.message}`);
      }

      console.log('Comment posted successfully');
      console.log(data);
    } catch (e) {
      console.error(e.message);
    }
  }