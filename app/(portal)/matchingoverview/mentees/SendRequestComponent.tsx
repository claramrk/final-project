'use client';
export default function SendRequestComponent() {
  return (
    <form>
      <div className="card sub-blurry">
        <label htmlFor="mentorMessage">
          Please write a short message what to your selected mentor. Write
          about: <span id="required">*</span>
          <ul className="list-inside	list-disc	">
            <li>where you need the most help with</li>
            <li>where you are currently at </li>
            <li>why you would like them to become your mentor:</li>
          </ul>
        </label>
        <textarea
          id="mentorMessage"
          className="textarea textarea-bordered"
          placeholder="Your message ..."
        />
      </div>
      <button className="btn max-w-xs		">Send mentor request</button>
    </form>
  );
}
