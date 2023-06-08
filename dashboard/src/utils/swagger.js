import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Swagger Petstore - OpenAPI 3.0",
        description:
          "This is the Dashboard API documentation\n\n**NextJS Notes:**\n- Utilizing NextJS as the framework, this app's server & client are not hosted in separate docker containers.\n- Next/Auth's functions are pretty obfuscated compared to React without a framework. Instances of unauthenticated access will result in redirects to a sign-in prompt from **okta**.\n- /api-doc is within the scope of the middleware, requiring sign-in to access this document.\n- With that, all api routes being tried will pass because of the developer having authentication.\n\n**Additional notes:**\n- Template: Petstore OAS 3.0 from [editor.swagger.io](editor.swagger.io)\n- Visualize this APIspec with the help of Arjun G's Swagger Viewer in VSCode.\n\n**Instructions to start up app:**\n- startup the server in the VSCode terminal with `docker-compose up -d`\n- proceed to localhost\n**All strings in the schemas are formatted with `VARCHAR`, and integers with `INTEGER`** ",
        version: "0.3.0",
      },
      externalDocs: {
        description: "Find out more about Swagger",
        url: "http://swagger.io",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
      tags: [
        {
          name: "cohorts",
          description: "Collection of cohorts routes",
        },
        {
          name: "learners",
          description: "Collection of learners routes",
        },
      ],
      paths: {
        "/cohort": {
          get: {
            tags: ["cohorts"],
            summary: "Retrieve a list of cohorts",
            description:
              "Retrieve a list of cohorts, with each item containing an id and name",
            operationId: "cohort",
            responses: {
              200: {
                description: "successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/cohort",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/cohort/{id}": {
          get: {
            tags: ["cohorts"],
            summary: "Retrieve a cohort according to its id",
            description:
              "Retrieve a list of learners with the same cohort, according to id",
            operationId: "cohotById",
            parameters: [
              {
                name: "id",
                in: "path",
                description: "id of cohort",
                required: true,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
            ],
            responses: {
              200: {
                description: "successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/cohort_learners",
                          },
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "cohort not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/cohort_learners",
                          },
                        },
                      },
                    },
                    example: {
                      rows: [],
                    },
                  },
                },
              },
            },
          },
        },
        "/learners": {
          get: {
            tags: ["learners"],
            summary: "Retrieve a list of learners, or learner(s) queried",
            description:
              "Retrieve a list of learners, with a lot of things per learner within the list. _ You can also query for a learner(s) with a search qeury.",
            operationId: "learners",
            parameters: [
              {
                name: "search",
                in: "query",
                description: "name of the search query",
                required: false,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
            ],
            responses: {
              200: {
                description: "successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/learners",
                          },
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "No learners found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/learners",
                          },
                        },
                      },
                    },
                    example: {
                      rows: [],
                    },
                  },
                },
              },
            },
          },
        },
        "/learners/{id}": {
          get: {
            tags: ["learners"],
            summary: "Retrieve an individual learner",
            description: "Retrieve an individual learner by id",
            operationId: "learnersById",
            parameters: [
              {
                name: "id",
                in: "path",
                description: "id of learner",
                required: true,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
            ],
            responses: {
              200: {
                description: "successful operation",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/learners_solo",
                          },
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "learner not found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/learners_solo",
                          },
                        },
                      },
                    },
                    example: {
                      rows: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          cohort: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
          },
          cohort_learners: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              zoom_logged_in: {
                type: "string",
              },
              iqualify_logged_in: {
                type: "string",
              },
              slack_logged_in: {
                type: "string",
              },
              github_last_commit: {
                type: "string",
              },
            },
          },
          learners: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              current_subject_id: {
                type: "integer",
              },
              cohort_name: {
                type: "string",
              },
              programme_start: {
                type: "string",
              },
              programme: {
                type: "integer",
              },
              zoom_logged_in: {
                type: "string",
              },
              iqualify_logged_in: {
                type: "string",
              },
              slack_logged_in: {
                type: "string",
              },
              github_last_commit: {
                type: "string",
              },
            },
          },
          learners_solo: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              email: {
                type: "string",
              },
              role: {
                type: "string",
              },
              cohort_id: {
                type: "string",
              },
              current_subject_id: {
                type: "integer",
              },
              created_at: {
                type: "string",
              },
              programme: {
                type: "integer",
              },
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
  });
  return spec;
};
