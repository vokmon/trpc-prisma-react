import { t } from "../trpc";
import { userRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  log: t.procedure.input(v => {
    if (typeof v === "string") return v
    throw new Error("Invalid input: Expected string")
  }).mutation(req => {
    console.log(`Add log with message ${req.input}`)
    return true;
  }),
  users: userRouter,
})