export default function loginPage() {
  return (
    <main>
      <div className="pageHeaderSection">
        <h1>SignIn Page</h1>
      </div>
      <div id="SignInSection">
        <h2>SignIn </h2>

        <form id="signInForm">
          <label htmlFor="emailInput">
            Email:<span id="required">*</span>
          </label>
          <input id="emailInput" required />
          <label htmlFor="passwordInput">
            Password:<span id="required">*</span>
          </label>
          <input id="passwordInput" required />
          <button id="signInButton">Sign in</button>
        </form>
        <a href="/#">Forgot your Password?</a>
      </div>
      <div id="SignUpSection">
        <h2>SignUp </h2>

        <form id="signUpForm">
          <legend>
            Sign up as:<span id="required">*</span>
          </legend>
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

          <label htmlFor="emailInput">
            Email:<span id="required">*</span>
          </label>
          <input id="emailInput" required />

          <label htmlFor="passwordInput">
            Password:<span id="required">*</span>
          </label>
          <input id="passwordInput" required />
          <label htmlFor="passwordInput">
            Confirm Password:<span id="required">*</span>
          </label>
          <input id="passwordInput" required />
          <button
            id="signUpButton"
            // Button text changes depending on radio button input
            // creates a new user with role "incomplete mentor" or "incomplete mentee" and redirects to profile input page
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
