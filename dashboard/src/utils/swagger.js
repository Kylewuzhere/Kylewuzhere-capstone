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
                description: "OK",
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
                description:
                  "Redirect When Unauthenticated (may return a 200 response code & html body)",
                headers: {
                  Location: {
                    description: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Fcohort`,
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              500: {
                $ref: "#/components/responses/Error500",
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
                description: "OK",
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
                description:
                  "Redirect When Unauthenticated (may return a 200 response code & html body)",
                headers: {
                  Location: {
                    description: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Fcohort%2F{id}`,
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              404: {
                $ref: "#/components/responses/NotFound",
              },
              500: {
                $ref: "#/components/responses/Error500",
              },
            },
          },
        },
        "/learners": {
          get: {
            tags: ["learners"],
            summary: "Retrieve a list of learners, or learner(s) queried",
            description:
              "Retrieve a list of learners, with a lot of things per learner within the list.  You can also query for a learner(s) with a search qeury.",
            operationId: "learners",
            parameters: [
              {
                name: "search",
                in: "query",
                description: "Search the name of Learner.",
                required: false,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
              {
                name: "limit",
                in: "query",
                description: "Limit the retrieved data to the set number",
                required: true,
                schema: {
                  type: "integer",
                  format: "integer",
                },
              },
              {
                name: "page",
                in: "query",
                description:
                  "Return limited data, under the offset: (page - 1).",
                required: true,
                schema: {
                  type: "integer",
                  format: "integer",
                },
              },
              {
                name: "filter",
                in: "query",
                description:
                  "Filter returned Learners by: Active, Inactive, All (returns both)",
                required: false,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
              {
                name: "sort",
                in: "query",
                description:
                  "Sort Learners by the respective columns of the table.",
                required: true,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
              {
                name: "order",
                in: "query",
                description: "Order the sort by: ascending & descending.",
                required: true,
                schema: {
                  type: "string",
                  format: "varchar",
                },
              },
            ],
            responses: {
              200: {
                description: "OK",
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
                description:
                  "Redirect When Unauthenticated (may return a 200 response code & html body)",
                headers: {
                  Location: {
                    description: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Flearners  Applies to search query as well`,
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              400: {
                $ref: "#/components/responses/BadRequest",
              },
              404: {
                $ref: "#/components/responses/NotFound",
              },
              500: {
                $ref: "#/components/responses/Error500",
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
                description: "OK",
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
                description:
                  "Redirect When Unauthenticated (may return a 200 response code & html body)",
                headers: {
                  Location: {
                    description: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=%2Fapi%2Flearners%2F{id}`,
                    schema: {
                      type: "string",
                    },
                  },
                },
              },
              404: {
                $ref: "#/components/responses/NotFound",
              },
              500: {
                $ref: "#/components/responses/Error500",
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
                format: "varchar",
              },
              programme_start: {
                type: "string",
                format: "varchar",
              },
              name: {
                type: "string",
                format: "varchar",
              },
            },
          },
          cohort_learners: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "varchar",
              },
              first_name: {
                type: "string",
                format: "varchar",
              },
              last_name: {
                type: "string",
                format: "varchar",
              },
              zoom_logged_in: {
                type: "string",
                format: "varchar",
              },
              iqualify_logged_in: {
                type: "string",
                format: "varchar",
              },
              slack_logged_in: {
                type: "string",
                format: "varchar",
              },
              github_last_commit: {
                type: "string",
                format: "varchar",
              },
            },
          },
          learners: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "varchar",
              },
              first_name: {
                type: "string",
                format: "varchar",
              },
              last_name: {
                type: "string",
                format: "varchar",
              },
              current_subject_id: {
                type: "integer",
                format: "integer",
              },
              cohort_name: {
                type: "string",
                format: "varchar",
              },
              programme_start: {
                type: "string",
                format: "varchar",
              },
              programme: {
                type: "integer",
                format: "integer",
              },
              zoom_logged_in: {
                type: "string",
                format: "varchar",
              },
              iqualify_logged_in: {
                type: "string",
                format: "varchar",
              },
              slack_logged_in: {
                type: "string",
                format: "varchar",
              },
              github_last_commit: {
                type: "string",
                format: "varchar",
              },
            },
          },
          learners_solo: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "varchar",
              },
              first_name: {
                type: "string",
                format: "varchar",
              },
              last_name: {
                type: "string",
                format: "varchar",
              },
              email: {
                type: "string",
                format: "varchar",
              },
              role: {
                type: "string",
                format: "varchar",
              },
              cohort_id: {
                type: "string",
                format: "integer",
              },
              current_subject_id: {
                type: "integer",
                format: "integer",
              },
              created_at: {
                type: "string",
                format: "varchar",
              },
              programme: {
                type: "integer",
                format: "integer",
              },
              name: {
                type: "string",
                format: "varchar",
              },
              subject_name: {
                type: "string",
                format: "varchar",
              },
            },
          },
          rows: {
            type: "array",
            items: {
              type: "object",
            },
          },
          bad_response: {
            type: "string",
            format: "varchar",
          },
          error: {
            properties: {
              length: {
                type: "integer",
                format: "integer",
              },
              name: {
                type: "string",
                format: "varchar",
              },
              severity: {
                type: "string",
                format: "varchar",
              },
              code: {
                type: "string",
                format: "varchar",
              },
              position: {
                type: "string",
                format: "varchar",
              },
              file: {
                type: "string",
                format: "varchar",
              },
              line: {
                type: "string",
                format: "varchar",
              },
              routine: {
                type: "string",
                format: "varchar",
              },
            },
          },
        },
        responses: {
          NotFound: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      $ref: "#/components/schemas/bad_response",
                    },
                    rows: {
                      $ref: "#/components/schemas/rows",
                    },
                  },
                  example: {
                    error: "Learner Not Found",
                    rows: [],
                  },
                },
              },
            },
          },
          BadRequest: {
            description: "Request does not contain the required parameter(s)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      $ref: "#/components/schemas/bad_response",
                    },
                    rows: {
                      $ref: "#/components/schemas/rows",
                    },
                  },
                  example: {
                    error: "Bad Request",
                    rows: [],
                  },
                },
              },
            },
          },
          Error500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error",
                },
                example: {
                  error: {
                    length: 99,
                    name: "error",
                    severity: "ERROR",
                    code: "42069",
                    position: "9999",
                    file: "filename",
                    line: "9999",
                    routine: "scanner_yyerror",
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return spec;
};
