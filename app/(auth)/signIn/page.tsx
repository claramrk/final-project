export default function signInPage() {
  return (
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
  );
}
