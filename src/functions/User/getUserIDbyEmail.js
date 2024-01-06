import {supabase} from '../../supabase/client.js';


export async function getUserIDbyEmail( Email) {
    let { data: User, error } = await supabase
        .from('User')
        .select('id')
        .eq('Email', Email)

    return User;
}

