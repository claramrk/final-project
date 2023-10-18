export default function matchingOverviewMentors() {
  return (
    <main>
      <div className="pageHeaderSection">
        <h1>Matching Information</h1>
      </div>
      <div id="activeMatchesSection">
        <h2>Active Matches</h2>
        <p>Indicated max. capacity: XYZ</p>
        <div
          id="exampleActiveMatch"
          // filter matching list here
        >
          <p>
            Active Match #1: Menteephoto | Menteename | Mentee contact info |
            Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel
            | Match active since: DATE
          </p>
          <button>EDIT? how is a mentorship ended?</button>
          <p>
            Active Match #2: Menteephoto | Menteename | Mentee contact info |
            Mentee targetunis | Mentee targetsubjects | mentee targetstudylevel
            | Match active since: DATE
          </p>
          <button>EDIT? how is a mentorship ended?</button>
        </div>
      </div>
      <div id="requestedMatchesSection">
        <h2>Requested Matches</h2>
        <p>
          You have one week to respond to a match request. Afterwards, the
          request will automatically be rejected.
        </p>

        <div
          id="exampleRequestedMatch"
          // filter matching list here
        >
          <p>
            Match Request#1: Menteephoto | Menteename | Mentee targetunis |
            Mentee targetsubjects | mentee targetstudylevel | Message from
            mentee | Date of request: DATE
          </p>
          <button>Accept match request</button>
          <button>Reject match request</button>
          <label htmlFor="reasonRejection">
            Please briefly indicate the reason for your rejection:
            <span id="required">*</span>
          </label>
          <input id="reasonRejection" />

          <p>
            Match Request#2: Menteephoto | Menteename | Mentee targetunis |
            Mentee targetsubjects | mentee targetstudylevel | Message from
            mentee | Date of request: DATE
          </p>
          <button>Accept match request</button>
          <button>Reject match request</button>
          <label htmlFor="reasonRejection">
            Please briefly indicate the reason for your rejection:
            <span id="required">*</span>
          </label>
          <input id="reasonRejection" />
        </div>
      </div>
      <div id="rejectedMatchesSection">
        <h2>Rejected Matches</h2>
        <p>
          Rejected Match #1: Menteephoto | Menteename | Mentee targetunis |
          Mentee targetsubjects | mentee targetstudylevel | Rejection Reason |
          Match rejected on : DATE
        </p>
        <p>
          Rejected Match #2: Menteephoto | Menteename | Mentee targetunis |
          Mentee targetsubjects | mentee targetstudylevel | Rejection Reason |
          Match rejected on : DATE
        </p>
      </div>
      <div id="pastMatchesSection">
        <h2>Past Matches</h2>
        <p>
          Past Match #1: Menteephoto | Menteename | Mentee contact info | Mentee
          targetunis | Mentee targetsubjects | mentee targetstudylevel | Match
          ended on: DATE
        </p>
        <p>
          Past Match #2: Menteephoto | Menteename | Mentee contact info | Mentee
          targetunis | Mentee targetsubjects | mentee targetstudylevel | Match
          ended on: DATE
        </p>
      </div>
    </main>
  );
}