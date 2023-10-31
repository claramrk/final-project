export default function matchingOverviewMentors() {
  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="text-3xl">My Matching Overview</h1>
      </div>
      <div id="activeMatchesSection" className="card blurry">
        <h2 className="text-2xl">Active Matches</h2>
        <p>Indicated max. capacity: XYZ</p>
        <div
          id="exampleActiveMatchesList"
          // filter matching list here
        >
          <p id="exampleActiveMatch" className="card sub-blurry">
            Active Match #1: Menteephoto | Menteename | Mentee contact info |
            Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel
            | Match active since: DATE
            <button className="btn max-w-xs		">
              EDIT? how is a mentorship ended?
            </button>
          </p>
          <p id="exampleActiveMatch" className="card sub-blurry">
            {' '}
            Active Match #2: Menteephoto | Menteename | Mentee contact info |
            Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel
            | Match active since: DATE
            <button className="btn max-w-xs		">
              EDIT? how is a mentorship ended?
            </button>
          </p>
        </div>
      </div>
      <div id="requestedMatchesSection" className="card blurry">
        <h2 className="text-2xl">Requested Matches</h2>
        <p>
          You have one week to respond to a match request. Afterwards, the
          request will automatically be rejected.
        </p>

        <div
          id="exampleRequestedMatchesList"
          // filter matching list here
        >
          <p id="exampleRequestedMatch" className="card sub-blurry">
            Match Request#1: Menteephoto | Menteename | Mentee targetunis |
            Mentee targetsubjects | mentee targetstudylevel | Message from
            mentee | Date of request: DATE
            <button className="btn max-w-xs		">Accept match request</button>
            <button className="btn max-w-xs		">Reject match request</button>
            <label htmlFor="reasonRejection">
              Please briefly indicate the reason for your rejection:
              <span id="required">*</span>
            </label>
            <input
              id="reasonRejection"
              className="input input-bordered w-full max-w-xs"
            />
          </p>

          <p id="exampleRequestedMatch" className="card sub-blurry">
            Match Request#2: Menteephoto | Menteename | Mentee targetunis |
            Mentee targetsubjects | mentee targetstudylevel | Message from
            mentee | Date of request: DATE
            <button className="btn max-w-xs		">Accept match request</button>
            <button className="btn max-w-xs		">Reject match request</button>
            <label htmlFor="reasonRejection">
              Please briefly indicate the reason for your rejection:
              <span id="required">*</span>
            </label>
            <input
              id="reasonRejection"
              className="input input-bordered w-full max-w-xs"
            />
          </p>
        </div>
      </div>
      <div id="rejectedMatchesSection" className="card blurry">
        <h2 className="text-2xl">Rejected Matches</h2>
        <p id="exampleRejectedMatch" className="card sub-blurry">
          Rejected Match #1: Menteephoto | Menteename | Mentee targetunis |
          Mentee targetsubjects | mentee targetstudylevel | Rejection Reason |
          Match rejected on : DATE
        </p>
        <p id="exampleRejectedMatch" className="card sub-blurry">
          Rejected Match #2: Menteephoto | Menteename | Mentee targetunis |
          Mentee targetsubjects | mentee targetstudylevel | Rejection Reason |
          Match rejected on : DATE
        </p>
      </div>
      <div id="pastMatchesSection" className="card blurry">
        <h2 className="text-2xl">Past Matches</h2>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #1: Menteephoto | Menteename | Mentee contact info | Mentee
          targetunis | Mentee targetsubjects | mentee targetstudylevel | Match
          ended on: DATE
        </p>
        <p id="examplePastMatch" className="card sub-blurry">
          Past Match #2: Menteephoto | Menteename | Mentee contact info | Mentee
          targetunis | Mentee targetsubjects | mentee targetstudylevel | Match
          ended on: DATE
        </p>
      </div>
    </main>
  );
}
