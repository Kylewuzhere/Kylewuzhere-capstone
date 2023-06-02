CREATE TABLE cohorts(
  id VARCHAR NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  programme_start VARCHAR NOT NULL
);

INSERT INTO
  cohorts (id, name, email, programme_start)
VALUES
  (
    '3657df0f-e81f-413e-8e51-9619b258dda6',
    'rolfsonbahringer',
    'rolfsonbahringer@developersinstitute.ac.nz',
    '21/08/2021'
  ),
  (
    '9571adad-b3ad-487c-886f-5248abe6ddde',
    'kilback tromp',
    'kilback.tromp@developersinstitute.ac.nz',
    '21/06/2021'
  ),
  (
    '65e48876-9a4c-4d82-bb62-21efc3f2e1d7',
    'lockman dicki',
    'lockman.dicki@developersinstitute.ac.nz',
    '21/04/2021'
  ),
  (
    '88d69f7a-8090-42fc-a900-3733784a22d3',
    'raulynch',
    'raulynch@developersinstitute.ac.nz',
    '21/02/2021'
  ),
  (
    'f0731dc1-90de-449b-9b94-1186f07584ca',
    'glover gislason',
    'glover.gislason@developersinstitute.ac.nz',
    '21/10/2020'
  ),
  (
    '1e70655c-948e-44e6-a60f-43b72a0ad7bd',
    'dickinsonsons',
    'dickinsonsons@developersinstitute.ac.nz',
    '21/08/2020'
  ),
  (
    'ac74d36b-1b1a-4b86-ad2f-5feff98b39ce',
    'feilschoen',
    'feilschoen@developersinstitute.ac.nz',
    '21/06/2020'
  ),
  (
    'a43508e5-19a6-49b0-a564-96afa0c84159',
    'west towne',
    'west.towne@developersinstitute.ac.nz',
    '21/04/2020'
  ),
  (
    '74241b7b-be97-41ec-b0de-c689dbcadde7',
    'feeney inc',
    'feeney.inc@developersinstitute.ac.nz',
    '21/02/2020'
  )