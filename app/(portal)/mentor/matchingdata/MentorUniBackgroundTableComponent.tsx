import { getAttendanceTypeById } from '../../../../database/attendancetype';
import { getDegreeTypeById } from '../../../../database/degreetype';
import { getMentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin } from '../../../../database/mentorUniversityBackground';

type Props = {
  id: number | undefined;
};

export default async function MentorUniBackgroundTableComponent(props: Props) {
  if (!props.id) {
    return '';
  }

  const uniBackground =
    await getMentorUniversityBackgroundbyUserIDWithUniAndSubjectInnerJoin(
      props.id,
    );
  return (
    <div className=" card blurry">
      <h3 className="h3-custom-primary pt-0 pb-5">
        Submitted University Background
      </h3>

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
            const studylevelName = getDegreeTypeById(Number(e.studylevel));
            const attendancetypeName = getAttendanceTypeById(
              Number(e.attendanceType),
            );

            return (
              <tr key={`uniqueID-${e.id}`}>
                <td>
                  <p className="tablefont-custom-primary">{e.universityName}</p>

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
  );
}
