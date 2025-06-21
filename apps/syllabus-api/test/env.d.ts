declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {
    DATABASE_URL: string;
  }
}
