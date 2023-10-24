import { getRoles } from '../../../database/roles';
import SignUpForm from './SignUpFormComponent';

export default async function signUpPage() {
  const roles = await getRoles();

  return (
    <main>
      <SignUpForm roles={roles} />;
    </main>
  );
}
