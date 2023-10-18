export default function LoginPage() {
  return (
    <main>
      <div id="SignInSection">
        <form id="signInForm">
          <legend>Sign In</legend>
          <label htmlFor="emailInput">Email:</label>
          <input id="emailInput" required />
          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" required />
          <button id="signInButton">Sign in</button>
        </form>
        <a href="/#">Forgot your Password?</a>
      </div>
      <div id="SignUpSection">
        <form id="signUpMenteeOrMentor">
          <legend>Sign Up</legend>
          <button id="showMentorSignupForm">
            As a Mentor: Help someone to get into their dream uni
          </button>
          <button id="showMenteeSignupForm">
            As a Mentee: Get help to get into your dream uni
          </button>
        </form>
        <form id="signUpForm">
          <label htmlFor="emailInput">Email:</label>
          <input id="emailInput" required />
          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" required />
          <button id="signInButtonMentor">Sign up as a Mentor</button>
          <button id="signInButtonMentee">Sign up as a Mentee</button>
        </form>
      </div>
    </main>
  );
}
