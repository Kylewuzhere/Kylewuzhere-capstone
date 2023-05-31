import "@testing-library/jest-dom/extend-expect";
import { server } from "./src/mocks/server";

// fetch() polyfill; enables fetch for
import "whatwg-fetch";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
