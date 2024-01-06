import React, { useEffect, useState } from 'react';
import { countFollowedUsers } from '../functions/Relation/Count';
import { supabase } from '../supabase/client';

const Counter = (UserID) => {
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const count = await countFollowedUsers(UserID);
          setFollowerCount(count);
        }
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{followerCount}</h1>
    </div>
  );
};

export default Counter;
