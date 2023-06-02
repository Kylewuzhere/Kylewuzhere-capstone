const fs = require("fs");
const crypto = require("crypto");

// Import names lists from JSON files
const GroupNames = require("./names/cohort_names.json");
const FirstNames = require("./names/first_names.json");
const LastNames = require("./names/last_names.json");

// Main variables for storing data
let Cohorts = [];
let Learners = [];
let Activity_Log = [];
let Final_Grades = [];
let Iqualify_Data = [];

let totalEvents = 0;

// Default values for the flags
let save_method = "SQL";
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
  } = GenerateBaseData();

  // Export the data to a specified format
  Export(
    save_method,
    Cohorts_Data,
    Learners_Data,
    Activity_Log_Data,
    Final_Grades_Data,
    Iqualify_Data_Data
  );
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
        date
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
  return { Cohorts, Learners, Activity_Log, Final_Grades, Iqualify_Data };
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
// Generates a new cohort with a random number of learners between min_learners and max_learners
function GenerateCohort(cohort_id, subject_id, date) {
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

function Export(
  save_method,
  Cohorts_Data,
  Learners_Data,
  Activity_Log_Data,
  Final_Grades_Data,
  Iqualify_Data_Data
) {
  // Save the generated data into separate files for further processing
  console.log(`Exporting Data as ${save_method} Files..`);
  switch (save_method) {
    case "SQL":
      ExportToSQL(Activity_Log_Data, "activity_log", "activity_log");
      ExportToSQL(Cohorts_Data, "cohorts", "cohorts");
      ExportToSQL(Learners_Data, "learners", "learners");
      ExportToSQL(Final_Grades_Data, "final_grades", "final_grades");
      ExportToSQL(Iqualify_Data_Data, "iqualify_data", "iqualify_data");
      break;
    case "CSV":
      ExportToCSV(Activity_Log_Data, "activity_log", "activity_log");
      ExportToCSV(Cohorts_Data, "cohorts", "cohorts");
      ExportToCSV(Learners_Data, "learners", "learners");
      ExportToCSV(Final_Grades_Data, "final_grades", "final_grades");
      ExportToCSV(Iqualify_Data_Data, "iqualify_data", "iqualify_data");
      break;
  }
  console.log(`Successfully exported to ${save_method}!`);
}
function ExportToCSV(data, dataName) {
  const columnHeaders = Object.keys(data[0]);
  const csvData = [columnHeaders];

  data.forEach((item) => {
    const values = Object.values(item).map((value) => {
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      return value;
    });
    csvData.push(values);
  });
  const csvContent = csvData.map((row) => row.join(",")).join("\n");

  fs.writeFile(`./data/${dataName}.csv`, csvContent, "utf-8", (err) => {
    if (err) {
      console.log("An error occured while writing CSV file", err);
      return;
    }
  });
}
function ExportToSQL(data, dataName, tableName) {
  let initial_value = `INSERT INTO ${tableName} (${Object.keys(
    data[0]
  )}) VALUES `;

  let data_string = data
    .map(
      (item) =>
        `(${Object.values(item).map(
          (value) =>
            `'${
              typeof value === "object"
                ? `{${Object.keys(value).map((v) => `"${v}":"${value[v]}"`)}}`
                : value
            }'`
        )})`
    )
    .join(",\n");

  fs.writeFile(
    `./data/${dataName}.sql`,
    initial_value + data_string,
    "utf-8",
    (err) => {
      if (err) {
        console.log("An error occured while writing SQL file", err);
        return;
      }
    }
  );
}

// Returns a random integer between min and max
function getRandomInt(min, max) {
  const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  return Clamp(Math.floor(Math.random() * max), min, max);
}
// Returns a random UUID
function GenerateUUID() {
  return crypto.randomUUID();
}

Main();
