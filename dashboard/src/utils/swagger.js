import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Dashboard - OpenAPI 3.0",
        description:
          "This is the Dashboard API documentation\n\n**NextJS Notes:**\n- Utilizing NextJS as the framework, this app's server & client are not hosted in separate docker containers.\n- Next/Auth's functions are pretty obfuscated compared to React without a framework. Instances of unauthenticated access will result in redirects to a sign-in prompt from **okta**.\n- /api-doc is within the scope of the middleware, requiring sign-in to access this document.\n- With that, all api routes being tried will pass because of the developer having authentication.\n\n**Additional notes:**\n- Template: Petstore OAS 3.0 from [editor.swagger.io](editor.swagger.io)\n- Visualize this APIspec with the help of Arjun G's Swagger Viewer in VSCode.\n\n**I could not get authentication to properly work as an adjustable variable in `next-swagger-doc`, thus bear with this makeshift solution.**\n\nWhen authenticated, you will receive the expected `200` response body.\n\nWhen unauthenticated, you will receive `307` redirects, with a `200` response body that contains a HTML body, \n\nwith the text of: **Sign in with Okta**.\n\nRun one of the api paths on a separate page while unauthenticated as proof: `inspect -> network tab -> headers tab`\n\nAuthorization aspects do not work, but I will leave the securitySchema as a template. Not enough documentation. Visual bugs, though obvious, do not impede on readability of the content.",
        version: "0.3.0",
      },
      servers: [
        {
          url: `${process.env.NEXTAUTH_URL}/api`,
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
              307: {
                description: "Redirect",
                headers: {
                  Location: {
                    description: `Redirect when unauthenticated: ${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Fcohort`,
                    schema: {
                      type: "string",
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
              307: {
                description: "Redirect",
                headers: {
                  Location: {
                    description: `Redirect when unauthenticated: ${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Fcohort%2F{id}`,
                    schema: {
                      type: "string",
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
              307: {
                description: "Redirect",
                headers: {
                  Location: {
                    description: `Redirect when unauthenticated: ${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Flearners  Applies to search query as well`,
                    schema: {
                      type: "string",
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
              307: {
                description: "Redirect",
                headers: {
                  Location: {
                    description: `Redirect when unauthenticated: ${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Flearners%2F{id}`,
                    schema: {
                      type: "string",
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
        securitySchemes: {
          OktaAuth: {
            type: "oauth2",
            description: "For more information, see",
            flows: {
              authorizationCode: {
                authorizationUrl: `https://trial-5417384.okta.com/oauth2/v1/authorize`,
                tokenUrl: `https://trial-5417384.okta.com/oauth2/v1/token`,
                oauth2RedirectUrl: `http://localhost:3000/api/auth/callback/okta`,
                scopes: {
                  users: "okta.users.read",
                },
              },
            },
          },
        },
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
