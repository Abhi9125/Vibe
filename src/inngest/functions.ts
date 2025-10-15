import { inngest } from "./client";
import { createAgent, openai } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-abhitest3");
      return sandbox.sandboxId;
    });
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

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);

      const host = sandbox.getHost(3000);

      return `https://${host}`;
    });
    return { output, sandboxUrl };
    // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
  }
);
