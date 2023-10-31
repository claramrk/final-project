export default function matchingOverviewMentees() {
  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="text-2xl">My Matching Overview</h1>
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="text-xl">Active Matches</h2>
        <div
          id="exampleActiveMatch"
          className="card sub-blurry"
          // filter matching list here. can only be one person!
        >
          <p>
            Active Match Mentorphoto | Mentorname | Mentor contact info | Mentor
            uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
            Mentor uni & subject & studylevel 3 | Match active since: DATE
          </p>
          <button className="btn max-w-xs		">
            EDIT? how is a mentorship ended?
          </button>
        </div>
      </div>
      <div id="requestedMatchesSection" className="card blurry">
        <div
          id="sentRequests"
          // filter matching list here. only active if no active mentor and if there is a mentor request
        >
          <h2 className="text-xl">Requested Matches</h2>
          <p>
            A mentor has one week to accept or reject your match request. If
            they have not answered, the request will automatically be rejected
            and you can request a new mentor.
          </p>

          <div
            id="exampleRequestedMatch"
            className="card sub-blurry"

            // filter matching list here. can only be one at a time
          >
            <p>
              Match Request: Mentorphoto | Mentorname | Mentor uni & subject &
              studylevel 1 | Mentor uni & subject & studylevel 2 | Mentor uni &
              subject & studylevel 3| Message to mentor | Date of request: DATE
            </p>
          </div>
        </div>
        <div
          id="requestMentor"
          // filter matching list here. only active if no active mentor and if there is no active mentor request
        >
          <h3>Mentor Suggestions</h3>
          <p>
            Below you can find three mentors from our pool that are currently
            available and that fit best to your university and subject
            indications.
          </p>
          <div
            id="exampleMentorRequestList"

            // filter matching list here. can only be one at a time
          >
            <p
              id="exampleMentorRequest"
              // stretch: profile is clickable and you get to a page showing more about this person
              className="card sub-blurry"
            >
              Mentor Suggestion #1: Mentorphoto | Mentorname | Mentor uni &
              subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
              Mentor uni & subject & studylevel 3| Further subject support
              indications
            </p>
            <p id="exampleMentorRequest" className="card sub-blurry">
              Mentor Suggestion #2: Mentorphoto | Mentorname | Mentor uni &
              subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
              Mentor uni & subject & studylevel 3| Further subject support
              indications
            </p>
            <p id="exampleMentorRequest" className="card sub-blurry">
              Mentor Suggestion #3: Mentorphoto | Mentorname | Mentor uni &
              subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
              Mentor uni & subject & studylevel 3| Further subject support
              indications
            </p>
            <form className="card sub-blurry">
              <h3>Send your Request</h3>
              <div className="card sub-blurry">
                <legend>
                  Which mentor would you like to request?
                  <span id="required">*</span>
                </legend>
                <label htmlFor="mentor1">Mentor Suggestion #1</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="radio"
                  id="mentor1"
                  name="requestMentor"
                  value="mentor1"
                />
                <label htmlFor="mentor2">Mentor Suggestion #2</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="radio"
                  id="mentor2"
                  name="requestMentor"
                  value="mentor2"
                />
                <label htmlFor="mentor3">Mentor Suggestion #3</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="radio"
                  id="mentor3"
                  name="requestMentor"
                  value="mentor3"
                />
              </div>
              <div className="card sub-blurry">
                <label htmlFor="mentorMessage">
                  Please write a short message what to MENTORNAME. Write about
                  1. where you need the most help with, 2. where you are
                  currently at and 3. why you would like them to become your
                  mentor:
                  <span id="required">*</span>
                </label>
                <input
                  id="mentorMessage"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <button className="btn max-w-xs		">Send mentor request</button>
            </form>
          </div>
        </div>
      </div>
      <div id="pastMatchesSection" className="card blurry">
        <h2 className="text-xl">Past Matches</h2>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #1: Mentorphoto | Mentorname | Mentor contact info | Mentor
          uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
          Mentor uni & subject & studylevel 3 | Match ended on: DATE
        </p>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #2: Mentorphoto | Mentorname | Mentor contact info | Mentor
          uni & subject & studylevel 1 | Mentor uni & subject & studylevel 2 |
          Mentor uni & subject & studylevel 3 | Match ended on: DATE
        </p>
      </div>
    </main>
  );
}
