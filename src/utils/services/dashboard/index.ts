import type { UserLessonDataType } from '../../types';
import { supabase } from '../../functions/supabase';

export async function fetchUserUpcomingData(
  profileId: string | null
): Promise<UserLessonDataType[] | []> {
  if (!profileId) {
    return [];
  }

  const { data: userUpcomingData } = await supabase.rpc(
    'get_user_upcoming_lessons',
    {
      profile_id_arg: profileId,
    }
  );

  console.log(`userUpcomingData`, userUpcomingData);

  if (!Array.isArray(userUpcomingData)) {
    return [];
  }

  return userUpcomingData;
}