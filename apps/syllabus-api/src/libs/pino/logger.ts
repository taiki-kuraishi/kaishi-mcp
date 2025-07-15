import pino from "pino";
import { injectable, singleton } from "tsyringe";

@singleton()
@injectable()
export class PinoLogger {
  public readonly instance = pino({
    level: "info",
  });
}
