import { getAttendanceTypeById } from '../../database/attendancetype';
import { getDegreeTypeById } from '../../database/degreetype';
import { getMentorUniversityBackgroundbyUserID } from '../../database/mentorUniversityBackground';
import { getSubjectById } from '../../database/subjects';
import { getUniversityById } from '../../database/universities';
import { getUserById } from '../../database/users';
import { UserAll } from '../../migrations/00008-createTableUsers';

type Props = {
  id: number;
};

export default async function MentorTableComponent(props: Props) {
  const currentUserMatchRequestsData = await getUserById(props.id);
  const uniBackground = await getMentorUniversityBackgroundbyUserID(props.id);

  return (
    <div id="requestedMatchesSection">
      <div id="requestMentor">
        <div>
          <details className="collapse card blurry collapse-arrow">
            <summary className="collapse-title text-xl font-medium">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="avatar mr-4">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          currentUserMatchRequestsData.photo
                            ? props.user.photo
                            : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
                        }
                        alt={props.user.email}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{props.user.firstname}</div>
                    <div className="text-sm opacity-50">
                      {props.user.countryId}
                    </div>
                  </div>
                </div>
              </div>
            </summary>
            <div className="collapse-content">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>University & Degreetype</th>
                      <th>Subject & Discipline</th>
                      <th>Attendance Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniBackground.map(async (e) => {
                      const studylevelName = getDegreeTypeById(
                        Number(e.studylevel),
                      );
                      const attendancetypeName = getAttendanceTypeById(
                        Number(e.attendanceType),
                      );
                      const university = await getUniversityById(
                        e.universityId,
                      );
                      const subject = await getSubjectById(e.universityId);

                      return (
                        <tr key={`uniqueID-${e.id}`}>
                          <td>
                            <p className="tablefont-custom-primary">
                              {studylevelName?.name}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {attendancetypeName?.name}
                            </p>
                          </td>
                          <td>
                            <p className="tablefont-custom-primary">
                              {university?.name}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {university?.countryId}
                            </p>
                          </td>
                          <td>
                            <p className="tablefont-custom-primary">
                              {subject.name.length > 60
                                ? `${subject?.name.slice(0, 60)}...`
                                : subject?.name}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {subject?.discipline}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
