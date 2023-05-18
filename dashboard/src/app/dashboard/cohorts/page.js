"use client";
export default function Cohorts() {
  const content = [
    "Cohort 1",
    "Cohort 2",
    "Cohort 3",
    "Cohort 4",
    "Cohort 5",
    "Cohort 6",
    "Cohort 7",
    "Cohort 8",
  ];
  // dummy cohorts
  return (
    <>
      <ul className="grid grid-cols-2 gap-10 m-10">
        {content.map((item, index) => (
          <li
            key={index}
            className="px-24 py-12 bg-blue-light border-2 border-black mx-16 rounded-md"
          >
            <p className="grid justify-center">{item}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
