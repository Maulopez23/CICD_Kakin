import {supabase} from '../../supabase/client.js';

export async function deleteComment(PostID, UserCommentID, Text) {
    try {
      const { error } = await supabase
        .from('Comment')
        .delete()
        .eq('PostID', PostID)
        .eq('UserCommentID', UserCommentID)
        .eq('Text', Text);

      if (error) {
        throw new Error(`Error deleting comment: ${error.message}`);
      }

      console.log('Comment deleted successfully');
    } catch (e) {
      console.error(e.message);
    }
  }