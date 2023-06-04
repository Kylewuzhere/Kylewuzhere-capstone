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
    '7c765cc4-3ceb-4244-aff2-df289869f17e',
    'morissette kozey',
    'morissette.kozey@developersinstitute.ac.nz',
    '21/08/2021'
  ),
  (
    'bf949ad2-5b6b-4d54-bb11-0d8efc22043d',
    'bartoletti hills',
    'bartoletti.hills@developersinstitute.ac.nz',
    '21/06/2021'
  ),
  (
    'e347614a-b131-4d4b-96b5-e56f789d0760',
    'greenfelderkub',
    'greenfelderkub@developersinstitute.ac.nz',
    '21/04/2021'
  ),
  (
    'cfeee4c6-6051-443d-bef9-ca6f7368d101',
    'terrygreenfelder',
    'terrygreenfelder@developersinstitute.ac.nz',
    '21/02/2021'
  ),
  (
    '2cec5193-9126-441f-ad61-6c09ae9d972f',
    'hand group',
    'hand.group@developersinstitute.ac.nz',
    '21/10/2020'
  ),
  (
    'cc532da7-5b42-47de-87bd-fd348c3f971e',
    'bartellcarroll',
    'bartellcarroll@developersinstitute.ac.nz',
    '21/08/2020'
  ),
  (
    '14c02e5d-d459-44e6-8522-6d7a5b204d7f',
    'monahansons',
    'monahansons@developersinstitute.ac.nz',
    '21/06/2020'
  ),
  (
    '918b28b6-f737-4260-9b0e-e4d418e08e0a',
    'rath bosco',
    'rath.bosco@developersinstitute.ac.nz',
    '21/04/2020'
  ),
  (
    '7c61ea10-b3be-4d5a-a217-b13ac7accbfb',
    'cartwright llc',
    'cartwright.llc@developersinstitute.ac.nz',
    '21/02/2020'
  )