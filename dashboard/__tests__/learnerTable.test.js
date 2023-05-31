import { render, screen } from "@testing-library/react";
import LearnerTable from "@/components/learnerTable";

beforeEach(async () => {
  render(<LearnerTable />);
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
