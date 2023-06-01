import { render, screen } from "@testing-library/react";
import LearnerTable from "@/components/learnerTable";

beforeEach(async () => {
  render(<LearnerTable content={single} />);
});

const columns = [
  "Name",
  "Id",
  "Cohort",
  "Start Date",
  "End Date",
  "iQualify (Last log in)",
  "Slack (Last active)",
  "More",
];
const single = [
  {
    first_name: "Amii",
    last_name: "Juan",
    id: 5,
    name: "consequat",
    programme_start: "2022-12-29 05:29:12",
    last_updated: "2023-02-09 20:22:44",
  },
];
const multi = [
  {
    first_name: "Win",
    last_name: "De Mattia",
    id: 146,
    name: "sed",
    programme_start: "2022-09-27 10:56:58",
    last_updated: "2023-03-04 06:39:58",
  },
  {
    first_name: "Kirby",
    last_name: "De Caville",
    id: 182,
    name: "vestibulum",
    programme_start: "2022-10-22 19:24:00",
    last_updated: "2023-05-09 05:06:33",
  },
];
describe("LearnerTable", () => {
  it("renders a table with the correct columns", async () => {
    const table = await screen.findByRole("table");
    const columnHeaders = await screen.findAllByRole("columnheader");

    expect(table).toBeInTheDocument();
    expect(columnHeaders).toHaveLength(columns.length);
    columnHeaders.forEach((column, index) => {
      expect(column).toHaveTextContent(columns[index]);
    });
  });
  // TODO: test that table renders learners in data.json
});
