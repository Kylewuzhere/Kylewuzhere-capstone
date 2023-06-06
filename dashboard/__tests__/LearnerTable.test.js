import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LearnerTable from "@/components/LearnerTable";
import { rows } from "../data/learnerData.json";

beforeEach(async () => {
  render(<LearnerTable content={rows} />);
});

const columns = [
  "Name",
  "Cohort",
  "Start Date",
  "Programme Level",
  "iQualify (Last log in)",
  "Slack (Last active)",
  "More",
];

describe("LearnerTable", () => {
  it("renders a table with the correct columns", async () => {
    const table = await screen.findByRole("table");
    const columnHeaders = screen.queryAllByRole("columnheader");

    expect(table).toBeInTheDocument();
    expect(columnHeaders).toHaveLength(columns.length);
    columnHeaders.forEach((column, index) => {
      expect(column).toHaveTextContent(columns[index]);
    });
  });
  // TODO: test that table renders learners in data.json
  it("renders a table with the correct rows length based on data.json", async () => {
    // +1 row because of table headers
    const table = await screen.findByRole("table");
    const rows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(6);
    expect(rows[1]).toHaveTextContent("Amii Juan");
  });
  it("renders a table with data and sorts by name in descending order", async () => {
    const table = await screen.findByRole("table");
    const nameHeader = screen.getAllByRole("columnheader")[0];
    const sortIcon = screen.getByText("▲");

    expect(table).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(sortIcon).toBeInTheDocument();
    await userEvent.click(nameHeader);

    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Mariam Saura");
  });
});
