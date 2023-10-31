export default function dashboardMentees() {
  return (
    <main>
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="text-3xl">My Dashboard</h1>
      </div>
      <div id="matchingHighlightsSection" className="card blurry">
        <h2 className="text-2xl">My Matching Highlights</h2>
        <p>
          Active Match #1: Menteephoto | Menteename | Match active since: DATE
        </p>
        <a href="/matchingoverview/mentors">Go to Matching Page</a>
      </div>
      <div id="profileSection" className="card blurry">
        <h2 className="text-2xl">My Profile Highlights</h2>
        <p>User Photo | User Name | User Role | User activity status</p>
        <a href="/users">Go to Profile Page</a>
      </div>
      <div id="communicationSection" className="card blurry">
        <h2 className="text-2xl">More Information</h2>
        <p>Info 1</p>
        <p>Info 2</p>
        <p>Info 3</p>
      </div>
    </main>
  );
}
