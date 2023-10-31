import { getRoles } from '../../../database/roles';
import SignUpForm from './SignUpFormComponent';

export default async function signUpPage() {
  const roles = await getRoles();

  return (
    <main>
      <div id="SignUpSection" className="card blurry">
        <h1 className="text-2xl">Sign Up</h1>
        <SignUpForm roles={roles} />
      </div>
    </main>
  );
}
