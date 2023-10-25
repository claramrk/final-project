import { attendancetype } from '../../../../database/attendancetype';
import { degreetype } from '../../../../database/degreetype';
import { getSubjects } from '../../../../database/subjects';
import { getUniversities } from '../../../../database/universities';

export default async function matchingdata() {
  const subjects = await getSubjects();
  const universities = await getUniversities();

  return (
    <main id="visibleMENTORS">
      <div className="pageHeaderSection">
        <h1>My Matching Information</h1>
      </div>
      <div id="universityInformationSection_visibleMENTORS">
        <h2>University Information</h2>

        <div id="submitNew">
          <h3>Submit new University Background</h3>

          <p>
            Please submit each degree you have completed or have been accepted
            to{' '}
          </p>
          <form
          // will need to be moved into use client component
          >
            <label htmlFor="selectUniversity">
              Name of the university<span id="required">*</span>
            </label>
            <select id="selectUniversity" name="selectUniversity" required>
              <option key="dataID-default-select" value="default-select">
                --Please choose your university--
              </option>

              {universities.map((d) => {
                return (
                  <option key={`dataID-select-${d.id}`} value={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>

            <label htmlFor="selectSubject">
              Name of the subject<span id="required">*</span>
            </label>

            <select id="selectSubject" name="selectSubject" required>
              <option key="dataID-default-select" value="default-select">
                --Please choose your subject--
              </option>

              {subjects.map((d) => {
                return (
                  <option key={`dataID-select-${d.id}`} value={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>
            <legend>
              DegreeType<span id="required">*</span>
            </legend>
            <select id="selectDegreetype" name="selectDegreetype" required>
              <option key="dataID-default-select" value="default-select">
                --Please choose your degreetype--
              </option>

              {degreetype.map((d) => {
                return (
                  <option key={`dataID-select-${d.id}`} value={d.name}>
                    {d.name}
                  </option>
                );
              })}
            </select>
            <legend>
              ApplicationStatus<span id="required">*</span>
            </legend>
            <select
              id="selectAttendancetype"
              name="selectAttendancetype"
              required
            >
              <option key="dataID-default-select" value="default-select">
                --Please choose your attendancetype--
              </option>

              {attendancetype.map((d) => {
                return (
                  <option key={`dataID-select-${d.id}`} value={d.name}>
                    {d.name}
                  </option>
                );
              })}
            </select>

            <button id="submitPersonalDetails">Submit my details</button>
          </form>
        </div>
        <div id="showSubmitted">
          <h3>Submitted University Background</h3>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>University</th>
                <th>Degree</th>
                <th>Degree Type</th>
                <th>Status</th>
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
              </tr>
            </tbody>
          </table>
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
