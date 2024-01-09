import { getDegreeTypeById } from '../../../../database/degreetype';
import { getMenteeApplicationsByUserIDWithUniAndSubjectInnerJoin } from '../../../../database/menteeTargetUniversitySubject';
import { getUserById } from '../../../../database/users';
import { Match } from '../../../../migrations/00015-createTableMatches';
import MatchResponseComponent from './MatchResponseComponent';

type Props = {
  menteeMatchId: number;
  badgetext: string | undefined;
  badgecolor: string | undefined;
  match: Match;
};

export default async function MenteeCardComponent(props: Props) {
  async function getUserData(id: number) {
    const user = await getUserById(id);
    return user;
  }

  async function getUniBackground(id: number) {
    const uniBackground =
      await getMenteeApplicationsByUserIDWithUniAndSubjectInnerJoin(id);
    return uniBackground;
  }

  const userData = await getUserData(props.menteeMatchId);
  const uniBackground = await getUniBackground(props.menteeMatchId);

  if (!userData) {
    return '';
  }
  if (!uniBackground) {
    return '';
  }
  const studylevelName = getDegreeTypeById(Number(uniBackground.studylevel));

  return (
    <details className="collapse collapse-arrow card blurry">
      <summary className="text-xl font-medium collapse-title">
        <div className="flex items-center space-x-3">
          <div className="mr-4 avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  userData.photo
                    ? userData.photo
                    : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1700478300/ytlqy4gubosyfp9vpts7.png'
                }
                alt={userData.email}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {userData.firstname}{' '}
              <p className={props.badgecolor}>{props.badgetext}</p>
            </div>
            <p className="text-sm opacity-50">
              {userData.countryId} | {studylevelName?.name}{' '}
            </p>
          </div>
          <div className="flex justify-end">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
          </div>
        </div>
      </summary>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th> </th>
                <th>First choice</th>
                <th>Second Choice</th>
                <th>Third Choice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="font-bold tablefont-custom-primary">
                    Universities
                  </p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.universityOneName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.universityOneCountryId}
                  </p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.universityTwoName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.universityTwoCountryId}
                  </p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.universityThreeName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.universityThreeCountryId}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="font-bold tablefont-custom-primary">Subjects</p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.subjectOneName.length > 40
                      ? `${uniBackground.subjectOneName.slice(0, 40)}...`
                      : uniBackground.subjectOneName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.subjectOneDiscipline}
                  </p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.subjectTwoName.length > 40
                      ? `${uniBackground.subjectTwoName.slice(0, 40)}...`
                      : uniBackground.subjectTwoName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.subjectTwoDiscipline}
                  </p>
                </td>
                <td>
                  <p className="tablefont-custom-primary">
                    {uniBackground.subjectThreeName.length > 40
                      ? `${uniBackground.subjectThreeName.slice(0, 40)}...`
                      : uniBackground.subjectThreeName}
                  </p>

                  <p className="tablefont-custom-secondary">
                    {uniBackground.subjectThreeDiscipline}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <MatchResponseComponent match={props.match} />
        </div>
      </div>
    </details>
  );
}
