const fs = require("fs");

function ToSQL(data, dataName, tableName) {
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

  console.log("Saving data to SQL file " + dataName + ".sql");

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

function ToCSV(data, dataName) {
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

module.exports = function Save(data, dataName, tableName, format) {
  if (format === "csv") {
    ToCSV(data, dataName);
  } else if (format === "sql") {
    ToSQL(data, dataName, tableName);
  }
};
