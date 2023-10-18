export default function dashboardMentees() {
  return (
    <main>
      <div className="pageHeaderSection">
        <h1>My Dashboard</h1>
      </div>
      <div id="matchingHighlightsSection">
        <h2>My Matching Highlights</h2>
        <p>
          Active Match #1: Menteephoto | Menteename | Match active since: DATE
        </p>
        <a href="/matchingoverview/mentors">Go to Matching Page</a>
      </div>
      <div id="profileSection">
        <h2>My Profile Highlights</h2>
        <p>User Photo | User Name | User Role | User activity status</p>
        <a href="/personaldata">Go to Profile Page</a>
      </div>
      <div id="communicationSection">
        <h2>More Information</h2>
        <p>Info 1</p>
        <p>Info 2</p>
        <p>Info 3</p>
      </div>
    </main>
  );
}
