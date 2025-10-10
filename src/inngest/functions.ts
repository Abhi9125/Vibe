import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // imagine this is a video analysing
    await step.sleep("Analysing the video", "30s");

    // imagine this is transccript section
    await step.sleep("Transcripting the video", "10s");

    // Summery section
    await step.sleep("Summery the video", "5s");
    return { message: `Hello ${event.data.email}!` };
  }
);
