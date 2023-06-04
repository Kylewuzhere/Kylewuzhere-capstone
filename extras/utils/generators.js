const { GenerateUUID, getRandomInt } = require("./utils");

// Import names lists from JSON files
const GroupNames = require("../names/cohort_names.json");
const FirstNames = require("../names/first_names.json");
const LastNames = require("../names/last_names.json");

// Generates a new cohort with a random number of learners between min_learners and max_learners
function GenerateCohort(
  cohort_id,
  subject_id,
  date,
  min_learners_per_cohort,
  max_learners_per_cohort
) {
  let { name } = GroupNames[getRandomInt(0, GroupNames.length)];
  let cohort_name = name.toLowerCase();

  let cohort = {
    id: cohort_id,
    name: cohort_name,
    email: `${cohort_name.split(" ").join(".")}@developersinstitute.ac.nz`,
    programme_start: date.toLocaleDateString(),
  };

  let learners = GenerateLearners(
    getRandomInt(min_learners_per_cohort, max_learners_per_cohort),
    cohort_id,
    subject_id,
    date
  );

  return { cohort, learners };
}
// Generates a new set of learners that will be assigned a cohort and subject
function GenerateLearners(n, cohort_id, subject_id, date) {
  let newLearners = [];

  for (let i = 0; i < n; i++) {
    let first_name =
      FirstNames[getRandomInt(0, FirstNames.length)].toLowerCase();
    let last_name = LastNames[getRandomInt(0, LastNames.length)].toLowerCase();

    newLearners.push({
      id: GenerateUUID(),
      first_name: first_name,
      last_name: last_name,
      email: `${first_name}.${last_name}@developersinstitute.ac.nz`,
      role: "Learner",
      cohort_id: cohort_id,
      current_subject_id: subject_id,
      created_at: date.toLocaleDateString(),
      programme: getRandomInt(0, 100) % 2 == 0 ? 5 : 6,
    });
  }

  return newLearners;
}

// Generates a random event
function GenerateRandomEvent(date) {
  const event_sources = ["github", "slack", "zoom", "iqualify"];
  const events = {
    github: [
      { event: "opened issue", data: { issue_id: 1 } },
      { event: "closed issue", data: { issue_id: 1 } },
      { event: "pushed commit", data: { commit_id: 1 } },
      { event: "opened pull request", data: { pull_request_id: 1 } },
      { event: "closed pull request", data: { pull_request_id: 1 } },
      { event: "logged in", data: { date: date.toLocaleDateString() } },
    ],
    slack: [
      { event: "reacted to post", data: { post_id: 1 } },
      { event: "posted message", data: { message_id: 1 } },
      { event: "joined huddle", data: { huddle_id: 1 } },
      { event: "left huddle", data: { huddle_id: 1 } },
      { event: "logged in", data: { date: date.toLocaleDateString() } },
    ],
    zoom: [
      { event: "joined meeting", data: { meeting_id: 1 } },
      { event: "left meeting", data: { meeting_id: 1 } },
    ],
    iqualify: [
      { event: "viewed offering", data: { offering_id: 1 } },
      { event: "submitted assignment", data: { offering_id: 1 } },
      { event: "logged in", data: { date: date.toLocaleDateString() } },
    ],
  };

  let source = event_sources[getRandomInt(0, event_sources.length)];
  let event_type = events[source][getRandomInt(0, events[source].length)];
  let event_data = event_type.data;

  return { source, event_type: event_type.event, event_data };
}

module.exports = { GenerateCohort, GenerateRandomEvent };
