export default function matchingdata() {
  return (
    <main id="visibleMENTEES">
      <div className="pageHeaderSection">
        <h1>Matching Information</h1>
      </div>
      <div id="universityInformationSection">
        <h2>Study Information</h2>
        <h3>Submit new University Background</h3>
        <legend>
          Indicate your application level:<span id="required">*</span>
        </legend>
        <label htmlFor="accepted">
          I know exactly where I want to study and am in the process of writing
          my application
        </label>
        <input
          type="radio"
          id="accepted"
          name="applicationStatus"
          value="undergraduate"
        />
        <label htmlFor="attending">
          I have a good idea of where I want to study but am not working on my
          application yet
        </label>
        <input
          type="radio"
          id="attending"
          name="degreeType"
          value="attending"
        />
        <label htmlFor="postgraduate_phd">
          I only have a broad idea of where I want to study and have only
          superficially engaged with the application process so far
        </label>
        <input
          type="radio"
          id="completed"
          name="degreeType"
          value="completed"
        />
        <label htmlFor="postgraduate_phd">
          I do not even know yet whether I want to study abroad but I am
          interested
        </label>
        <input
          type="radio"
          id="completed"
          name="degreeType"
          value="completed"
        />
        <p>
          The following information will also be used to match your mentor, so
          we encourage you to give your submission prior thought! In case you do
          not know some answers yet, just provide the information that is the
          most accurate.
        </p>
        <form
        // will need to be moved into use client component
        >
          <label htmlFor="universityName">
            Indicate your top three university choices:
            <span id="required">*</span>
          </label>
          <input
            id="universityName"
            required
            // will need to be a datalist or dropdown with multiple select! will need to provide list of data. min 1 max 3 choices
          />
          <label htmlFor="subjectName">
            Indicate your top three subject choices:
            <span id="required">*</span>
          </label>
          <input
            id="subjectName"
            required
            // will need to be a datalist or dropdown with multiple select. will need to provide list of data. min 1 max 3 choices
          />
          <legend>
            Indicate the degree type you will be applying for
            <span id="required">*</span>
          </legend>
          <label htmlFor="undergraduate">
            Undergraduate - Bachelors Degree
          </label>
          <input
            type="radio"
            id="undergraduate"
            name="degreeType"
            value="undergraduate"
          />
          <label htmlFor="postgraduate_masters">
            Postgraduate - Masters Degree
          </label>
          <input
            type="radio"
            id="postgraduate_masters"
            name="degreeType"
            value="postgraduate_masters"
          />
          <label htmlFor="postgraduate_phd">Postgraduate - PhD</label>
          <input
            type="radio"
            id="postgraduate_phd"
            name="degreeType"
            value="postgraduate_phd"
          />
          <button id="submitAllUniInformation">
            Submit all University Information
          </button>
        </form>
      </div>
      <div id="matchingInformationSection">
        <h2>Further Information</h2>
        <form>
          <h3>Mentee Guidelines</h3>
          <p>
            Our mentors take their time to help mentees on a voluntary basis. We
            hope you use this time respectfully. Therefore, we have set up
            mentee guidelines, that we expect you to adhere to.
          </p>
          <a
            // check how to download a pdf
            href="/#"
          >
            Mentee Guideline Contract Download
          </a>
          <label htmlFor="mentee_guideline_upload">
            Please download the mentee Guideline contract, read it carefully and
            upload a signed version here:
          </label>
          <input
            id="mentee_guideline_upload"
            // check how to upload a pdf
          />
          <button id="submitAllUniInformation">
            Submit further information
          </button>
        </form>
      </div>
      <p>
        After clicking the "Register" button below our team will review your
        registration. After your registration is approved, you will then be able
        to request one mentor from our suggestion of fitting mentors. After
        sending your request, mentors will have one week to accept your request
        to start your mentorship journey together. You will also be supported
        through additional support programs - stay tuned!
      </p>
      <button id="registerAsAMentee">
        Complete your registration as a mentee
      </button>
    </main>
  );
}
