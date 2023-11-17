import { UserAll } from '../../migrations/00008-createTableUsers';

type Props = { user: UserAll; background: any };
export default function MentorTableComponent(props: Props) {
  return (
    <div className="card sub-blurry">
      <div>
        <div className="flex items-center space-x-3">
          <div className="avatar mr-4">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://res.cloudinary.com/dqmhbukkm/image/upload/v1699615635/dy8a7psy7ltcm3bqm5zl.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="font-bold">Name</div>
            <div className="text-sm opacity-50">Country </div>
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
                <p className="p-custom-primary">
                  props.background.studylevelName.name
                </p>
                <br />
                <p className="p-custom-secondary">
                  props.background.attendncetype.name
                </p>
              </td>
              <td>
                <p className="p-custom-primary">
                  props.background.studylevelName.name
                </p>
                <br />
                <p className="p-custom-secondary">
                  props.background.attendncetype.name
                </p>
              </td>
              <td>
                <p className="p-custom-primary">
                  props.background.studylevelName.name
                </p>
                <br />
                <p className="p-custom-secondary">
                  props.background.attendncetype.name
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
