import {supabase} from '../../supabase/client.js';

export async function getAllUserRelation(UserID) {
    try {
        let { data: Relation, error } = await supabase
          .from('Relation')
          .select('FollowedUserID')
          .eq('UserID', UserID);

        const followedUserIDs = [];

        // Use a loop to extract FollowedUserID values
        for (const item of Relation) {
            followedUserIDs.push(item.FollowedUserID);
        }

        console.log(followedUserIDs);
        return followedUserIDs;
    } catch (error) {
        console.error('Error fetching user relations:', error);
        throw error; // Re-throw the error to handle it in the calling code if needed
    }
}