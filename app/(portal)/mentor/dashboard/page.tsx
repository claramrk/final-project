import Link from 'next/link';
import ButtonGoBack from '../../../components/ButtonGoBack';

export default function dashboardMentors() {
  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">My Dashboard</h1>
      </div>
      <div id="matchingHighlightsSection" className="card blurry">
        <h2 className="h2-custom-primary">My Matching Highlights</h2>
        <h3 className="h3-custom-primary">My Pending Requests: </h3>
        <p className="p-custom-primary">
          ACTION NEEDED - Match Request #1: Menteephoto | Menteename | Date of
          request: DATE
        </p>
        <button
          className="btn-custom-primary"
          // leads to matching page
        >
          Respond to match request
        </button>
        <h3 className="h3-custom-primary">My Active Matches:</h3>
        <p className="p-custom-primary">
          Active Match #1: Menteephoto | Menteename | Match active since: DATE
        </p>

        <Link className="link-custom-primary" href="/mentor/matchingoverview">
          Go to Matching Page
        </Link>
      </div>
      <div id="profileSection" className="card blurry">
        <h2 className="h2-custom-primary">My Profile Highlights</h2>
        <p className="p-custom-primary">
          User Photo | User Name | User Role | User activity status
        </p>

        <Link className="link-custom-primary" href="/personaldata">
          Go to Profile Page
        </Link>
      </div>
      <div id="communicationSection" className="card blurry">
        <h2 className="h2-custom-primary">More Information</h2>
        <p className="p-custom-primary">Info 1</p>
        <p className="p-custom-primary">Info 2</p>
      </div>
    </main>
  );
}
