import { createSwaggerSpec } from "next-swagger-doc";
import { apiSpec } from "./openapi.json";
export const getApiDocs = async () => {
  const openapi = apiSpec[0];
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: openapi,
  });
  return spec;
};
