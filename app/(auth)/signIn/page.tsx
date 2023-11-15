import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getRoles } from '../../../database/roles';
import { getUserBySessionToken } from '../../../database/users';
import { getRedirectPage } from '../../../util/pageNavigation';
import SignInFormComponent from './SignInFormComponent';

export default async function signInPage() {
  const roles = await getRoles();
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  if (currentUser) {
    const currentUserRoleId = currentUser.roleId;
    const currentUserRole = roles.find((r) => r.id === currentUserRoleId);

    if (!currentUserRole) {
      redirect(`../signIn`);
    }
    const reroute: any = getRedirectPage(currentUserRole);
    redirect(reroute);
  }

  return (
    <main>
      <div className="hero py-2 sm:py-15 lg:py-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In</h1>
            <p className="p-custom-primary">
              You want to apply to a top university? The Project Access programs
              are providing free mentorships helping less privileged students
              apply for degrees at leading universities. When you join the
              program you will be paired with a mentor who studies at your dream
              university and guides you through the application process.
              <br />
              <br />
              Your mentor will give you 1-1 advice on picking the right course
              and university for you, personal statements, references,
              interviews, and all other aspects of your application. You will
              also get access to our collection of resources for all steps of
              the application and join an awesome community of inspiring
              applicants from all around the world.
            </p>
          </div>
          <SignInFormComponent roles={roles} />
        </div>
      </div>
    </main>
  );
}
