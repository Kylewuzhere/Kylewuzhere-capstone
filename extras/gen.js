const Save = require("./utils/Save");
const { GenerateCohort, GenerateRandomEvent } = require("./utils/generators");
const { GenerateUUID, getRandomInt } = require("./utils/utils");

// Main variables for storing data
let Cohorts = [];
let Learners = [];
let Activity_Log = [];
let Final_Grades = [];
let Iqualify_Data = [];
let Meetings = [];
let Attendance = [];

let totalEvents = 0;

// Default values for the flags
let save_method = "sql";
let min_learners_per_cohort = 20;
let max_learners_per_cohort = 34;
let number_of_working_days = 365;
let max_user_events_per_day = 30;

// Flags for changing default values
const commands = [
  {
    long: "--save-method",
    short: "-sm",
    default: "SQL",
    description: "Sets the exported file type",
  },
  {
    long: "--min-learners-per-cohort",
    short: "-min",
    default: "20",
    description: "Sets the minimum learners a cohort can have",
  },
  {
    long: "--max-learners-per-cohort",
    short: "-max",
    default: "34",
    description: "Sets the maximum learners a cohort can have",
  },
  {
    long: "--number-of-working-days",
    short: "-wd",
    default: "365",
    description: "How many days (Mon-Fri) should be calculated",
  },
  {
    long: "--max-user-events-per-day",
    short: "-me",
    default: "30",
    description: "The maximum number of events a learner can generate per day",
  },
];

// Main function that runs on start
function Main() {
  // Format flags into an object for easier use
  const flags = process.argv.slice(2).reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {});

  // Log the help table to the console
  if (
    Object.keys(flags).includes("--help") ||
    Object.keys(flags).includes("-h")
  ) {
    console.table(
      commands.map((command) => {
        return {
          "Long Option": command.long,
          "Short Option": command.short,
          "Default Value": command.default,
          Description: command.description,
        };
      })
    );
    console.table([
      {
        example:
          "node gen.js --save-method=CSV --min-learners-per-cohort=30 --max-learners-per-cohort=60 --number-of-working-days=730",
      },
    ]);
    return;
  }

  // Check each flag value and set the appropriate variables
  if (flags["--save-method"]) save_method = flags["--save-method"];
  if (flags["-sm"]) save_method = flags["-sm"];

  if (flags["--min-learners-per-cohort"])
    min_learners_per_cohort = flags["--min-learners-per-cohort"];
  if (flags["-min"]) min_learners_per_cohort = flags["-min"];

  if (min_learners_per_cohort > max_learners_per_cohort)
    throw Error(
      "Min Users Per Cohort cannot be GREATER than Max Users Per Cohort"
    );

  if (flags["--max-learners-per-cohort"])
    max_learners_per_cohort = flags["--max-learners-per-cohort"];
  if (flags["-max"]) max_learners_per_cohort = flags["-max"];

  if (flags["--number-of-working-days"])
    number_of_working_days = flags["--number-of-working-days"];
  if (flags["-wd"]) number_of_working_days = flags["-wd"];

  if (flags["--max-user-events-per-day"])
    max_user_events_per_day = flags["--max-user-events-per-day"];
  if (flags["-me"]) max_user_events_per_day = flags["-me"];

  console.log(`Generating Data..`);
  // Generate the base data
  const {
    Cohorts: Cohorts_Data,
    Learners: Learners_Data,
    Activity_Log: Activity_Log_Data,
    Final_Grades: Final_Grades_Data,
    Iqualify_Data: Iqualify_Data_Data,
    Meetings: Meetings_Data,
    Attendance: Attendance_Data,
  } = GenerateBaseData();

  // Save the generated data into separate files for further processing
  console.log(`Exporting Data as ${save_method} Files..`);
  Save(Activity_Log_Data, "activity_log", "activity_log", save_method);
  Save(Cohorts_Data, "cohorts", "cohorts", save_method);
  Save(Learners_Data, "learners", "learners", save_method);
  Save(Final_Grades_Data, "final_grades", "final_grades", save_method);
  Save(Iqualify_Data_Data, "iqualify_data", "iqualify_data", save_method);
  Save(Meetings_Data, "meetings", "meetings", save_method);
  Save(Attendance_Data, "attendance", "attendance", save_method);
  console.log(`Successfully exported to ${save_method}!`);
}

// Generate the data for each table and return them
function GenerateBaseData() {
  // List of subjects learners complete over the period of their programme
  const subjects = [
    { id: 0, name: "Client-Side Development" },
    { id: 1, name: "Server-Side Development" },
    { id: 2, name: "Full-Stack Development" },
    { id: 3, name: "Agile Development & DevOps" },
    { id: 4, name: "Application Security" },
    { id: 5, name: "Mobile Application Development" },
    { id: 6, name: "Introduction into Machine Learning" },
    { id: 7, name: "Capstone (Enterprise) Project" },
    { id: 999, name: "None" },
  ];

  // Starting date for generating the data
  let date = new Date("January 1 2020");

  /* Generate Data for each working day (Mon-Fri)
   * Rules:
   * 1. no activity on Weekends;
   * 2. no activity for 3 weeks at the end of each semester;
   * 3. no activity for 3 months after the end of the 4th semester;
   */

  // Loop over each day, skipping weekends, and generate data for each learner.
  for (let i = 0; i < number_of_working_days; i++) {
    // Skip Christmas Break
    if (date.getMonth() === 10) {
      // Set the date forwards 3 months (90 days)
      date.setDate(date.getDate() + 7 + 7 * 4 * 3);
      // Skip the rest of the loop
      continue;
    }

    // tmpDate is used to test weather a given date is currently on the last day of the month
    // by checking if the next day is the first of the next month
    let tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + 1);

    // Skip Semester Breaks, calculate final grades for each learner, and move them to the next subject
    if (tmpDate.getDate() === 1 && (date.getMonth() + 1) % 2 === 1) {
      Learners.forEach((learner) => {
        if (learner.current_subject_id === 999) return;

        // Calculate the final grade for the learner (random number between 50 and 100)
        Final_Grades.push({
          id: Final_Grades.length,
          learner_id: learner.id,
          subject_id: learner.current_subject_id,
          final_grade: getRandomInt(50, 100),
        });

        // Move the learner to the next subject, or give them the key 999 which means None (they have completed all subjects)
        learner.current_subject_id =
          learner.programme === 5
            ? learner.current_subject_id === 5
              ? 999
              : learner.current_subject_id + 1
            : learner.current_subject_id === 7
            ? 999
            : learner.current_subject_id + 1;
      });

      // Skip 3 weeks for the semester break
      date.setDate(date.getDate() + 7 * 3);

      // Generate a new cohort and set of learners, assigning them the Client-Side Development subject
      const { cohort, learners } = GenerateCohort(
        GenerateUUID(),
        subjects[0].id,
        date,
        min_learners_per_cohort,
        max_learners_per_cohort
      );

      // Add the new cohort and set of learners to the base data
      Cohorts.unshift(cohort);
      Learners.push(...learners);

      // Skip the rest of the loop
      continue;
    }

    // Skip weekends
    if (date.getDay() === 6 || date.getDay() === 0) {
      // Set the date forwards 1 day
      date.setDate(date.getDate() + 1);
      // Skip the rest of the loop
      continue;
    }

    // Generate a meeting twice a day for each cohort, except on Fridays
    // Student attendance is recorded for each meeting, each student has a 20% chance of not attending
    if (date.getDay() < 5) {
      GenerateMeetings(date, "Morning");
      GenerateMeetings(date, "Afternoon");
    }

    // Generate Activity Logs for each user
    Learners.forEach((learner) => {
      // Skip learners who have completed all subjects
      if (learner.current_subject_id === 999) return;

      // Find the index of the learner in the Iqualify_Data array
      let iqualify_index = Iqualify_Data.findIndex(
        (item) =>
          item.learner_id === learner.id &&
          item.subject_id === learner.current_subject_id
      );

      // Create a new entry in the Iqualify_Data array if one does not exist
      if (iqualify_index === -1)
        iqualify_index = CreateIqualifyEntry(learner, date);

      // Update the Iqualify_Data entry completion value with a random value for their grade
      Iqualify_Data[iqualify_index].completion = getRandomInt(50, 100);
      Iqualify_Data[iqualify_index].last_updated = date.toLocaleDateString();

      // Select a random number of events for the learner to make
      let number_events = getRandomInt(
        0,
        getRandomInt(5, max_user_events_per_day)
      );
      totalEvents += number_events;

      // Generate activity_log events for the learner
      for (let x = 0; x < number_events; x++) {
        let { source, event_type, event_data } = GenerateRandomEvent(date);
        Activity_Log.push({
          id: GenerateUUID(),
          learner_id: learner.id,
          source,
          event_type,
          event_time: date.toLocaleDateString(),
          event_data,
          subject_id: learner.current_subject_id,
        });
      }
    });

    // Move to the next day
    date.setDate(date.getDate() + 1);
  }
  // End of the main loop

  // Log out the total events generated and return the all base data
  console.log(totalEvents.toLocaleString() + " events generated.");
  return {
    Cohorts,
    Learners,
    Activity_Log,
    Final_Grades,
    Iqualify_Data,
    Meetings,
    Attendance,
  };
}
// Creates a new entry into the Iqualify_Data array
function CreateIqualifyEntry(learner, date) {
  Iqualify_Data.push({
    id: Iqualify_Data.length,
    learner_id: learner.id,
    subject_id: learner.current_subject_id,
    completion: 0,
    last_updated: date.toLocaleDateString(),
  });

  return Iqualify_Data.findIndex(
    (item) =>
      item.learner_id === learner.id &&
      item.subject_id === learner.current_subject_id
  );
}

function GenerateMeetings(date, when) {
  //
  Cohorts.forEach((cohort) => {
    CreateMeeting(cohort, date, when);

    // Filter all the learners to only those in the current cohort
    const learners = Learners.filter(
      (learner) => learner.cohort_id === cohort.id
    );

    // Add attendance for each learner in the cohort
    learners.forEach((learner) => {
      if (learner.current_subject_id === 999) return;
      AttendMeeting(learner.id, Meetings[Meetings.length - 1]);
    });
  });
}

function CreateMeeting(cohort, date, when) {
  let time = when === "Morning" ? 9 : 13;
  Meetings.push({
    id: Meetings.length,
    timestamp: `${date.getFullYear()}-${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }-${date.getDate()}T${time}:30:00.000Z`,
    cohort_id: cohort.id,
  });
}

function AttendMeeting(learner_id, meeting) {
  let random_number = getRandomInt(0, 5);
  // 20% chance of a learner not attending a meeting
  if (random_number === 3) return;

  Attendance.push({
    id: Attendance.length,
    learner_id: learner_id,
    meeting_id: meeting.id,
  });
}

Main();
