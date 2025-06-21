import { describe, expect, it } from "vitest";
import { prepareSseMcpClient } from "../helpers/mcp-client-helper";

describe("test /sse", () => {
  it("test connection", async () => {
    // arrange
    const { client, transport } = prepareSseMcpClient();

    // act
    await client.connect(transport);
    await client.close();

    // assert
    expect(true).toBe(true);
  });

  it("test listTools", async () => {
    // arrange
    const { client, transport } = prepareSseMcpClient();

    // act
    await client.connect(transport);
    const tools = await client.listTools();

    // assert
    expect(tools.tools).toHaveLength(1);
  });

  it("test ping", async () => {
    // arrange
    const { client, transport } = prepareSseMcpClient();
    await client.connect(transport);

    // act
    const res = await client.ping();

    // assert
    expect(res).toEqual({});
  });
});
