import { CountdownTimer } from "./timer.js";

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jun 24, 2021"),
});
const timer2 = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("May 24, 2025"),
});
