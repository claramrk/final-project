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
        <form id="signUpForm">
          <legend>Sign Up as:</legend>
          <label htmlFor="mentor">
            A Mentor: Help someone to get into their dream uni
          </label>
          <input
            type="radio"
            id="mentor"
            name="signup_as"
            value="incomplete_mentor"
          />
          <label htmlFor="mentee">
            A Mentee: Get help to get into your dream uni
          </label>
          <input
            type="radio"
            id="mentee"
            name="signup_as"
            value="incomplete_mentee"
          />
          <br />

          <label htmlFor="emailInput">Email:</label>
          <input id="emailInput" required />

          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" required />
          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" required />
          <button
            id="signInButtonMentor"
            // Button text changes depending on radio button input
            // creates a new user with role "incomplete mentor" or "incomplete mentee" and redirects to profile input page
          >
            Sign up as a Mentor
          </button>
        </form>
      </div>
    </main>
  );
}
