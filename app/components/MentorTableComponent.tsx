import { getAttendanceTypeById } from '../../database/attendancetype';
import { getDegreeTypeById } from '../../database/degreetype';
import { getMentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin } from '../../database/mentorUniversityBackground';

type Props = {
  id: number;
  badgetext: string;
  badgecolor: string;
  photo: string;
  email: string;
  firstname: string;
  countryId: string;
};

export default async function MentorTableComponent(props: Props) {
  const uniBackground =
    await getMentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin(
      props.id,
    );
  console.log(uniBackground);
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
                          props.photo
                            ? props.photo
                            : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
                        }
                        alt={props.email}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {props.firstname}{' '}
                      <div className={props.badgecolor}>{props.badgetext}</div>
                    </div>
                    <div className="text-sm opacity-50">{props.countryId} </div>
                  </div>
                </div>
              </div>
            </summary>
            <div className="collapse-content">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>University & Country</th>
                      <th>Subject & Discipline</th>
                      <th>Degree & Attendance Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniBackground.map((e) => {
                      const studylevelName = getDegreeTypeById(
                        Number(e.studylevel),
                      );
                      const attendancetypeName = getAttendanceTypeById(
                        Number(e.attendanceType),
                      );

                      return (
                        <tr key={`uniqueID-${e.id}`}>
                          <td>
                            <p className="tablefont-custom-primary">
                              {e.universityName}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {e.universityCountryId}
                            </p>
                          </td>

                          <td>
                            <p className="tablefont-custom-primary">
                              {e.subjectName.length > 60
                                ? `${e.subjectName.slice(0, 60)}...`
                                : e.subjectName}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {e.subjectDiscipline}
                            </p>
                          </td>
                          <td>
                            <p className="tablefont-custom-primary">
                              {studylevelName?.name}
                            </p>

                            <p className="tablefont-custom-secondary">
                              {attendancetypeName?.name}
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
