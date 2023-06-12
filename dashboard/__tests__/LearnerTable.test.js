import { render, screen } from "@testing-library/react";
import LearnerTable from "@/components/LearnerTable";
import { rows } from "../data/learnerData.json";

beforeEach(async () => {
  const onSort = jest.fn();
  const getSortIcon = jest.fn();

  render(
    <LearnerTable content={rows} onSort={onSort} getSortIcon={getSortIcon} />
  );
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
  it("renders a table with the correct rows length based on data.json", async () => {
    // +1 row because of table headers
    const table = await screen.findByRole("table");
    const rows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(6);
    expect(rows[1]).toHaveTextContent("Amii Juan");
  });
});
