import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";

beforeEach(async () => {
  render(<SearchBar />);
});

describe("SearchBar", () => {
  it("renders a search bar with a search button", async () => {
    const searchBar = await screen.findByRole("search");
    const searchButton = await screen.findByRole("button");

    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it("types a name in the search bar", async () => {
    const searchBar = screen.getByPlaceholderText("Search Learner Name");
    await userEvent.type(searchBar, "Lynde Ivoshin");

    expect(searchBar).toHaveValue("Lynde Ivoshin");
  });
});
