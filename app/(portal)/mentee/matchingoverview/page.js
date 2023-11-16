import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMatchesByMenteeId } from '../../../../database/matches';
import { getUserById, getUserBySessionToken } from '../../../../database/users';
import MentoringEndFormComponent from '../../../components/MentoringEndFormComponent';
import TopMentorsComponent from './TopMentorsComponent';

export default async function matchingOverviewMentees() {
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const currentUser =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!currentUser) redirect('/signUp');

  // get all Match Requests

  const currentUserMatches = await getMatchesByMenteeId(Number(currentUser.id));
  const currentUserMatchesData = Promise.all(
    currentUserMatches.map((m) => {
      const mentor = getUserById(m.mentorUserId);
      return mentor;
    }),
  );

  // get only Accepted Matches
  const currentUserMatchAccepts = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentor accepted match',
  );

  const currentUserMatchAccceptsData = Promise.all(
    currentUserMatchAccepts.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  // get only Match Requests
  const currentUserMatchRequests = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentee requested mentor',
  );

  const currentUserMatchRequestsData = Promise.all(
    currentUserMatchRequests.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  // get only past matches
  const currentUserPastMatches = currentUserMatches.filter(
    (e) => e.statusInternal === 'mentorship ended',
  );

  const currentUserPastMatchesData = Promise.all(
    currentUserPastMatches.map((m) => {
      const mentee = getUserById(m.menteeUserId);
      return mentee;
    }),
  );

  /*   async function startAlgorithm() {
    'use server';
    const topThreeMentorsList = await getTopThreeMentors(currentUser);

    const topThreeMentorsArray = topThreeMentorsList.map((element) => {
      return element.mentorUserId;
    });

    await putMenteeBestMentorMatches(currentUser.id, topThreeMentorsArray);
  } */

  return (
    <main id="visibleMENTEES">
      <div id="pageHeaderSection" className="card blurry">
        <h1 className="h1-custom-primary">
          {' '}
          {currentUser.firstname}'s Matching Overview
        </h1>
      </div>
      {/*    <StartMatchingAlgorithmButtonComponent
        currentUser={currentUser}
        startAlgorithm={startAlgorithm}
      /> */}
      {currentUserMatchRequests.length > 0 ? (
        <div id="requestedMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">Request Mentor</h2>
          <div
            id="sentRequests"
            // filter matching list here. only active if no active mentor and if there is a mentor request
          >
            <p className="p-custom-primary">
              You requested a mentor! A mentor has one week to accept or reject
              your match request. In case they do not respond within the week,
              the request will automatically be rejected and you can request a
              new mentor.
            </p>
            <div
              id="exampleRequestedMatch"
              className="card sub-blurry"

              // filter matching list here. can only be one at a time
            >
              <p className="p-custom-primary">
                Match Request: {currentUserMatchRequests[0].mentorUserId} | |
                Mentor uni & subject & studylevel 1 | Mentor uni & subject &
                studylevel 2 | Mentor uni & subject & studylevel 3| Message to
                mentor | Date of request: DATE
              </p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {!currentUserMatchRequests.length ? (
        <div id="requestedMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">Request Mentor</h2>
          <div
            id="requestMentor"
            // filter matching list here. only active if no active mentor and if there is no active mentor request
          >
            <p className="p-custom-primary">
              Below you can find three mentors from our pool that are currently
              available and that fit best to your university and subject
              indications.
            </p>
            <TopMentorsComponent />
          </div>
        </div>
      ) : (
        ''
      )}
      {currentUserMatchAccepts.length > 0 ? (
        <div id="activeMatchesSection" className="card blurry">
          <h2 className="h2-custom-primary">Active Mentor</h2>
          {currentUserMatchAccepts.map((m) => {
            return (
              <div key={`mentee-${m.id}`} className="card sub-blurry">
                <p className="p-custom-primary">
                  Active Match Mentorphoto | {currentUserMatchAccepts[0]}|
                  Mentor contact info | Mentor uni & subject & studylevel 1 |
                  Mentor uni & subject & studylevel 2 | Mentor uni & subject &
                  studylevel 3 | Match active since: DATE
                </p>
                <MentoringEndFormComponent
                  match={m}
                  buttonText="I am no longer being mentored by this mentor"
                />
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </main>
  );
}
