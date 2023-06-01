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
    'a8581c97-1564-4042-a1be-c70e00f58cc2',
    'streich harris',
    'streich.harris@developersinstitute.ac.nz',
    '21/08/2021'
  ),
  (
    'b547433c-89ad-4735-afb0-d34edc702367',
    'dachpowlowski',
    'dachpowlowski@developersinstitute.ac.nz',
    '21/06/2021'
  ),
  (
    '4eb66769-f91c-4c45-87f3-f4887d600b1d',
    'cruickshanksons',
    'cruickshanksons@developersinstitute.ac.nz',
    '21/04/2021'
  ),
  (
    'ba9aa372-858b-40fd-82bf-2ee567731854',
    'satterfield group',
    'satterfield.group@developersinstitute.ac.nz',
    '21/02/2021'
  ),
  (
    'e9d8a6d7-7bee-43d1-a434-3b6e7804200f',
    'moenskiles',
    'moenskiles@developersinstitute.ac.nz',
    '21/10/2020'
  ),
  (
    '9d82e027-1e4f-49b2-88ef-9ffb1224022e',
    'pacochasons',
    'pacochasons@developersinstitute.ac.nz',
    '21/08/2020'
  ),
  (
    '0632f4ea-9d57-47be-a641-d87ccbc137da',
    'auer kertzmann',
    'auer.kertzmann@developersinstitute.ac.nz',
    '21/06/2020'
  ),
  (
    '112a3f0d-b10d-4afb-8e10-b704dc180cb5',
    'watsicasons',
    'watsicasons@developersinstitute.ac.nz',
    '21/04/2020'
  ),
  (
    'e628075b-e270-4f3d-a722-4646dc1a42a0',
    'schaefer inc',
    'schaefer.inc@developersinstitute.ac.nz',
    '21/02/2020'
  )