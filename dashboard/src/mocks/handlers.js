import { rest } from "msw";
import { rows as learners } from "../../data/learnerData.json";
import { rows as cohorts } from "../../data/cohortData.json";

export const handlers = [
  rest.get(`/api/learners`, (req, res, ctx) => {
    return res(ctx.json({ learners }));
  }),
  rest.get(`/api/learners/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const learner = learners[id];

    return res(ctx.json({ rows: [learner] }));
  }),
  rest.get(`/api/cohort`, (req, res, ctx) => {
    return res(ctx.json({ rows: cohorts }));
  }),
  rest.get(`/api/cohort/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const cohort = cohorts[id];

    return res(ctx.json({ rows: [cohort] }));
  }),
];
