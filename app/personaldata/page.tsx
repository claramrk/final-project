export default function personalData() {
  return (
    <main>
      <div className="pageHeaderSection">
        <h1>Personal Data Page</h1>
      </div>
      <div id="personalDataSection">
        <h2>Personal Data Section</h2>
        <p>Please enter your personal data here</p>
        <form
        // will need to be moved into use client component
        >
          <label htmlFor="firstName">
            Your first name:<span id="required">*</span>
          </label>
          <input id="firstName" required />
          <label htmlFor="lastName">
            Your last name:<span id="required">*</span>
          </label>
          <input id="lastName" required />
          <label htmlFor="phoneNumber">
            Your phone number:<span id="required">*</span>
          </label>
          <input id="phoneNumber" required />
          <label
            htmlFor="emailAdress"
            // will be shown from login --> this is your login data
          >
            Your email address:<span id="required">*</span>
          </label>
          <input id="emailAdress" required />
          <label htmlFor="birthDate">
            Your birthdate:<span id="required">*</span>
          </label>
          <input id="birthDate" required />
          <label htmlFor="countryOrigin">
            Your country of origin:<span id="required">*</span>
          </label>
          <input id="countryOrigin" required />
          <button id="submitPersonalDetails">Submit my details</button>
        </form>
      </div>
    </main>
  );
}
