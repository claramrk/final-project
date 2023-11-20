import { getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject } from '../database/menteeTargetUniversitySubject';
import { University } from '../migrations/00004-createTableUniversities';
import { UserIdEmailRole } from '../migrations/00008-createTableUsers';

export default async function checkUniMatchColor(
  uni: University,
  currentUser: UserIdEmailRole,
) {
  const userWithUniversityApplication =
    await getUserWithMenteeUniversityApplicationsbyIdWithUniAndSubject(
      currentUser.id,
    );

  const userUniversityApplication =
    userWithUniversityApplication?.userMenteeUniversityApplications;

  const userUniversityApplicationOnly = userUniversityApplication?.at(0);

  let overlapArray;

  if (!userUniversityApplicationOnly) {
    console.log('error - no university application');
  }

  if (
    uni.id === userUniversityApplicationOnly?.firstUniversityId ||
    uni.id === userUniversityApplicationOnly?.secondUniversityId ||
    uni.id === userUniversityApplicationOnly?.thirdUniversityId
  ) {
    overlapArray = true;
  } else {
    overlapArray = false;
  }

  return overlapArray;
}
