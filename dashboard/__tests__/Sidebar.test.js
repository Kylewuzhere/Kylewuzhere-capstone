import { render } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");

const navs = [
  { text: "COHORTS", path: "/dashboard/cohorts" },
  { text: "LEARNERS", path: "/dashboard/learners" },
];

describe("Sidebar", () => {
  test.each(navs)("test $text button render", ({ text, path }) => {
    usePathname.mockReturnValueOnce(path);
    const { getByText } = render(<Sidebar />);

    const button = getByText(text);
    expect(button).toBeInTheDocument();
  });
  test.each(navs)(
    `calls usePathname when $text button is clicked`,
    ({ text, path }) => {
      usePathname.mockReturnValueOnce(path);
      const { getByText } = render(<Sidebar />);

      const button = getByText(text);
      button.click();
      expect(usePathname).toHaveBeenCalled();
    }
  );
});
