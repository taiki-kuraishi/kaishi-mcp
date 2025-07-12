import pino from "pino";
import { injectable, singleton } from "tsyringe";

@singleton()
@injectable()
export class Logger {
  public readonly instance = pino({
    level: "info",
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "yyyy-mm-dd HH:MM:ss",
              ignore: "pid,hostname",
              singleLine: false,
            },
          }
        : undefined,
  });
}
