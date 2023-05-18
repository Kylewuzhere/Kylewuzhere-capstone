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
  return (
    <div className="flex h-fulll justify-center items-center">
      <ul className="grid grid-cols-2 gap-10 bg-grey-md w-full justify-items-center p-10 m-10 w-5/6">
        {content.map((item, index) => (
          <li
            key={index}
            className="pl-20 pr-20 pt-10 pb-10 bg-blue-light border-2 border-black rounded-md"
          >
            <p className="grid justify-center">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
