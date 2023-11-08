import SignInFormComponent from './SignInFormComponent';

export default function signInPage() {
  return (
    <main>
      <div id="SignInSection" className="card blurry">
        <h1 className="h1-custom-primary">Sign In</h1>
        <SignInFormComponent />;
      </div>
    </main>
  );
}
