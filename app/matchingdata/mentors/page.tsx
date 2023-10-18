export default function matchingdata() {
  return (
    <main id="visibleMENTORS">
      <div className="pageHeaderSection">
        <h1>Matching Information</h1>
      </div>
      <div id="universityInformationSection_visibleMENTORS">
        <h2>University Information</h2>

        <div id="submitNew">
          <h3>Submit new University Background</h3>

          <p>
            Please submit this form for each degree you have completed or have
            been accepted to{' '}
          </p>
          <form
          // will need to be moved into use client component
          >
            <label htmlFor="universityName">
              Name of the university<span id="required">*</span>
            </label>
            <input
              id="universityName"
              required
              // will need to be a datalist or dropdown. will need to provide list of data
            />
            <label htmlFor="subjectName">
              Name of the subject<span id="required">*</span>
            </label>
            <input
              id="subjectName"
              required
              // will need to be a datalist or dropdown. will need to provide list of data
            />
            <legend>
              DegreeType<span id="required">*</span>
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
            <legend>
              ApplicationStatus<span id="required">*</span>
            </legend>
            <label htmlFor="accepted">
              I was accepted to this degree but did not attend
            </label>
            <input
              type="radio"
              id="accepted"
              name="applicationStatus"
              value="undergraduate"
            />
            <label htmlFor="attending">
              I am currently attending this degree
            </label>
            <input
              type="radio"
              id="attending"
              name="degreeType"
              value="attending"
            />
            <label htmlFor="postgraduate_phd">I completed this degree</label>
            <input
              type="radio"
              id="completed"
              name="degreeType"
              value="completed"
            />
            <label htmlFor="graduationYear">
              (Expected) Year of Graduation:<span id="required">*</span>
            </label>
            <input
              id="graduationYear"
              required
              type="number"
              min="1900"
              max="2099"
              step="1"
              defaultValue={new Date().getFullYear()}
            />

            <button id="submitPersonalDetails">Submit my details</button>
          </form>
        </div>
        <div id="showSubmitted">
          <h3>Submitted University Background</h3>
          <p>To add more, submit another degree in the form above</p>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>University</th>
                <th>Degree</th>
                <th>Degree Type</th>
                <th>Status</th>
                <th>Graduation Year</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>UniX</td>
                <td>DegreeY</td>
                <td>PG - Masters</td>
                <td>Completed</td>
                <td>2020</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="moreSubjectSupport">
          <label htmlFor="moreSubjectSupport">
            Are there other subjects that you could support a mentee's
            application in? If yes, please select them here:
          </label>
          <input id="moreSubjectSupport" required />
        </div>
        <button id="submitAllUniInformation">
          Submit all University Information
        </button>
      </div>
      <div id="matchingInformationSection_visibleMENTORS">
        <h2>Matching Information</h2>
        <form>
          <h3>Maximum Capacity</h3>
          <p>
            We expect mentors to commit around 1-2 hours per month per mentee.
          </p>
          <label htmlFor="maximum_capacity">
            Please indicate the maximum number of mentees you would like to
            mentor at the same time. You can change this number any time:
          </label>
          <input id="maximum_capacity" type="number" min="1" defaultValue={1} />
          <h3>Safeguarding</h3>
          <p>
            The safety of our mentees is incredibly important to us. Therefore,
            every mentor has to strictly adhere to our safeguarding guidelines.
          </p>
          <a
            // check how to download a pdf

            href="/#"
          >
            Safeguarding Contract Download
          </a>
          <label htmlFor="safeguarding_upload">
            Please download the safeguarding contract, read it carefully and
            upload a signed version here:
          </label>
          <input
            id="safeguarding_upload"
            // check how to upload a pdf
          />
          <button id="submitAllUniInformation">
            Submit further matching Information
          </button>
        </form>
      </div>
      <p>
        After clicking the "Register" button below our team will review your
        registration. After your registration is approved, you will join the
        active mentor pool. Mentees will then be able to request you as their
        mentor after you have been suggested as a fitting mentor. After a
        mentee's request, you will have one week to accept the request to start
        your mentorship journey together. You can always set your mentorship to
        inactive in the future, in case you would like to take a break or
        discontinue mentoring.
      </p>
      <button id="registerAsAMentor">
        Complete your registration as a mentor
      </button>
    </main>
  );
}
