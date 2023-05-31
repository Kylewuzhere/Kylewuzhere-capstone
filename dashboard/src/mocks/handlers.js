import { rest } from "msw";
import { rows } from "../../data.json";

export const handlers = [
  rest.get(`http://localhost:3000/api/learners`, (req, res, ctx) => {
    return res(ctx.json({ rows }));
  }),
];
