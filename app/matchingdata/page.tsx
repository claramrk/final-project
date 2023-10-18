export default function matchingdata() {
  return (
    <main>
      <div className="pageHeaderSection">
        <h1>Matching Information</h1>
      </div>
      <div id="universityInformationSectionMENTORS">
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
          <table className="audittable">
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
            <tbody className="table-body">
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
      </div>
    </main>
  );
}
