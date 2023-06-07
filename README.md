# Project: Student Dashboard (Term 2 Capstone project 2023)

## Overview
This repository contains the source code for the Student Dashboard applcation created as our Capstone project for Term 2 2023. It involves displaying data collected through student activity and progression throughout their time at Developers Institute, then display it in a manner that can give insights on students to different organiztional departments to help them further understand student needs and requirements. 

### Starting the application
1. Clone this repository
2. Open a terminal in the `dashboard` folder. 
3. Ensure Docker is running
4. Run `docker-compose up -d` to start running the docker container.

This will create 2 containers in Docker. One for the Server, and one for the Database. Docker will automatically populate the database with the provided mock data in the `./db/sql` folder.

--- 

## Server

### Tools Used
- Node 18
- NextJS 13
- PostgreSQL 15
- Docker (docker-compose)

### NPM Packages
- Dependencies
    - autoprefixer: 10.4.14
    - eslint: 8.40.0
    - eslint-config-next: 13.4.1
    - next: 13.4.1
    - next-auth: ^4.22.1
    - pg: ^8.11.0
    - postcss: 8.4.23
    - react: 18.2.0
    - react-dom: 18.2.0
    - tailwindcss: 3.3.2

- DevDependencies
    - @testing-library/jest-dom: ^5.16.5
    - @testing-library/react: ^14.0.0
    - @testing-library/user-event: ^14.4.3
    - jest: ^29.5.0
    - jest-environment-jsdom: ^29.5.0
    - msw: ^1.2.1
    - react-test-renderer: ^18.2.0
    - whatwg-fetch: ^3.6.2

### External Services
- AWS Quicksight for automagic processing of the data into embedable visualizations (graphs/tables)
- Render for hosting the application on the internet

---

## Docker
Docker is used to containerize the application to ensure stability across environments.

### docker-compose
[`docker-compose.yaml`](./dashboard/docker-compose.yml) is used to define our containers. There are 2 containers setup in this file

### Dockerfile
There are 2 `Dockerfiles` in this project. One in [`./dashboard/Dockerfile`](./dashboard/Dockerfile) and another in [`./dashboard/src/db/Dockerfile`](./dashboard/src/db/Dockerfile).
The first one defines the isntructions for setting up the Node container (used to run the NextJS application). The second one defines instructions for setting up the Postgres 15 container. Both are used by Docker to create the required containers.

---

## Deployment

### CI/CD
Setup in the repository will be a Github Action that will automatically run the tests provided in the `./dashboard/__tests__` directory. See [TBC](./dashboard)

### Building
During the deployment phase, the application will be built to a compressed, minified version. This is handled automatcally the `next build` command. The generated output can be found inside the `./dashboard/.next` folder. See [NextJS Deploying Docs](https://nextjs.org/docs/app/building-your-application/deploying) for more information on the output structure.

### Hosting
[Render](https://render.com) is the hosting provider as it's the platform provided to us for hosting this application.
Both the database and server are hosted here in a single docker instance. Render will automatically build and deploy each release.

### Connections
- Render account uername
- Render account password

---

## Authentication

### Provider
[Okta](https://okta.com/) is used as the identity provider. This is because Developers Institute already integrates Okta into their existing systems, so it makes sense to follow suite instead of using a different provider.

### Next-Auth
Next-Auth is a package used to handle the implementation for Auth within the dashboard. Next-auth protects the API routes, and the dashboard itself, ensuring users are authenticated to be able to view the dashboard.

### Connections
- Okta provider username
- Okta provider password

---

## API
NextJS is a framework which integrates the API into the application instead of having it as a separate service. The API for the dashboard can be found in the [./dashboard/src/app/api](./dashboard/src/app/api/) folder. Each sub-directory is the route path, and the `route.js` file is what contains the methods for the specific route. More information for each route is provided in the Swagger documentation.

### Swagger
To view the Swagger documentation, start the application (See "Starting the application" section at the top of this page), and navigate to [insert swagger url]().

---

## App Routes

### NextJS /App Directory (context)
The routng structure in NextJS is folder based. This means when you create a new folder under the `/app` directory, you're creating a new route. This is the current setup for the student dashboard. Each route requres a page.js, and optionally can have a loading.js and an error.js

NextJS handles the implementation for these components.

### Structure
- /App
  - /api
  - /dashboard
    - /cohorts
      - /:id
    - /learners 
      - /:id

---

## Project Development

### Jira Board
Explain the usage of Jira as a project management tool in your development process.
Describe how the Jira board is utilized to track and manage tasks, issues, and project progress.
Provide information on how to access and navigate the Jira board for your project.
Explain any specific workflows, labels, or customizations that are relevant to your project's Jira setup.

### Github Repository
Discuss the importance of version control and the use of GitHub for your project.
Provide the URL or information on how to access the GitHub repository.
Explain the branching strategy used in your project, such as GitFlow or feature branches.
Describe any conventions or guidelines for committing code, creating pull requests, and merging changes.
Include information on how to clone or fork the repository and contribute to the project.

### Extra Resources
Provide additional resources that can assist developers working on the project.
This can include links to relevant documentation, style guides, coding standards, or design guidelines.
Mention any external libraries, frameworks, or tools used in the development process, along with links to their official documentation or resources.
Include any supplementary materials or references that can help developers understand the project's architecture, design patterns, or other technical aspects.

---

## Testing/Debugging

### Automagic testing
When a branch is pushed to the github repo, github will automatically run all the tests and check if they pass or not. This is one of the few ways we can be sure the code in that branch is compatible and works (others include githubs conflicts check)

### Running the tests locally
The testing framework used is Jest and React Testing Library. To run the tests, open a terminal in the `./dashboard` folder and run the command `npm run test`. This will make Jest run all the tests in the `./dashboard/__tests__` folder.

---



