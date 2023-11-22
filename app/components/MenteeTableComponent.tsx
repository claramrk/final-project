import { getDegreeTypeById } from '../../database/degreetype';
import { getMenteeApplicationsByUserIDWithUniAndSubjectInnerJoin } from '../../database/menteeTargetUniversitySubject';
import { getUserById } from '../../database/users';

type Props = {
  menteeMatchId: number;
  badgetext: string | undefined;
  badgecolor: string | undefined;

};

export default async function MenteeTableComponent(props: Props) {
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
    <details className="collapse collapse-arrow">
      <summary className="collapse-title text-xl font-medium">
        <div className="flex items-center space-x-3">
          <div className="avatar mr-4">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  userData.photo
                    ? userData.photo
                    : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
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
                  <p className="tablefont-custom-primary font-bold">
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
                  <p className="tablefont-custom-primary font-bold">Subjects</p>
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
      </div>
    </details>
  );
}
