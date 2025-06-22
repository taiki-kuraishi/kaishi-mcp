import {
  type SyllabusApiTrpcClient,
  createSyllabusApiTrpcClient,
} from "@kaishi-mcp/syllabus-api-trpc-client";

export class SyllabusApiClient {
  public readonly client: SyllabusApiTrpcClient;

  constructor(baseUrl: string, headers?: Record<string, string>) {
    this.client = createSyllabusApiTrpcClient({
      baseUrl,
      headers,
    });
  }
}
