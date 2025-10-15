import { inngest } from "./client";
import { createAgent, openai } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer. You write readble, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4" }),
    });

    const { output } = await codeAgent.run(
      `Write the following code snippet: ${event.data.value}`
    );
    console.log(output);

    return { output };
    // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
  }
);
