import MatchResponseComponent from '../(portal)/mentor/matchingoverview/MatchResponseComponent';
import { getDegreeTypeById } from '../../database/degreetype';
import { getMenteeApplicationsByUserIDWithUniAndSubjectInnerJoin } from '../../database/menteeTargetUniversitySubject';
import { Match } from '../../migrations/00015-createTableMatches';

type Props = {
  mentee: Match;
  id: number | undefined;
  badgetext: string | undefined;
  badgecolor: string | undefined;
  photo: string | null | undefined;
  email: string | undefined;
  firstname: string | null | undefined;
  countryId: string | null | undefined;
  messageToMentor: string | null | undefined;
};

export default async function MenteeTableComponent(props: Props) {
  if (!props.id) {
    return '';
  }

  const uniBackground =
    await getMenteeApplicationsByUserIDWithUniAndSubjectInnerJoin(props.id);

  if (!uniBackground) {
    return;
  }

  const studylevelName = getDegreeTypeById(Number(uniBackground.studylevel));

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
                      <th>Studylevel</th>
                      <th>University & Country</th>
                      <th>Subject & Discipline</th>
                      <th>Degree & Attendance Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p className="tablefont-custom-primary">
                          {studylevelName?.name}
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
                        <p className="tablefont-custom-primary"> </p>
                      </td>
                      <td>
                        <p className="tablefont-custom-primary">
                          {uniBackground.subjectOneName.length > 60
                            ? `${uniBackground.subjectOneName.slice(0, 60)}...`
                            : uniBackground.subjectOneName}
                        </p>

                        <p className="tablefont-custom-secondary">
                          {uniBackground.subjectOneDiscipline}
                        </p>
                      </td>
                      <td>
                        <p className="tablefont-custom-primary">
                          {uniBackground.subjectTwoName.length > 60
                            ? `${uniBackground.subjectTwoName.slice(0, 60)}...`
                            : uniBackground.subjectTwoName}
                        </p>

                        <p className="tablefont-custom-secondary">
                          {uniBackground.subjectTwoDiscipline}
                        </p>
                      </td>
                      <td>
                        <p className="tablefont-custom-primary">
                          {uniBackground.subjectThreeName.length > 60
                            ? `${uniBackground.subjectThreeName.slice(
                                0,
                                60,
                              )}...`
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
              <MatchResponseComponent match={props.mentee} />

              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        props.photo
                          ? props.photo
                          : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
                      }
                    />
                  </div>
                </div>
                <div className="chat-bubble">{props.messageToMentor}</div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
