import { UserAll } from '../../migrations/00008-createTableUsers';

type Props = { user: UserAll; background: any };
export default function TopMentorsComponent(props: Props) {
  return (
    <div className="card sub-blurry">
      <div>
        <div className="flex items-center space-x-3">
          <div className="avatar mr-4">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  props.user.photo
                    ? props.user.photo
                    : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png'
                }
                alt={props.user.email}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">props.user.firstname</div>
            <div className="text-sm opacity-50">
              props.user.countries[0].name
            </div>
          </div>
        </div>
      </div>
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
            <tr>
              <td>
                props.background.studylevelName.name
                <br />
                <p className="p-custom-primary">
                  props.background.attendncetype.name
                </p>
              </td>
              <td>
                props.background.universities[0].name
                <br />
                <p className="p-custom-primary">
                  props.background.universities[0].countryId
                </p>
              </td>
              <td>
                props.background.subjects[0].name.length
                <br />
                <p className="p-custom-primary">
                  props.background.subjects[0].discipline
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
