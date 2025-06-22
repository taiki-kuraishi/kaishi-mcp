import {
  type SyllabusApiTrpcClient,
  createSyllabusApiTrpcClient,
} from "@kaishi-mcp/syllabus-api-trpc-client";
import { injectable } from "tsyringe";

@injectable()
export class SyllabusApiClient {
  public readonly client: SyllabusApiTrpcClient;

  constructor(baseUrl: string, headers?: Record<string, string>) {
    this.client = createSyllabusApiTrpcClient({
      baseUrl,
      headers,
    });
  }
}
