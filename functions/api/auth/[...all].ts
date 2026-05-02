import { betterAuth } from "better-auth";
import { D1Dialect } from "@better-auth/utils";

export async function onRequest(context: any) {
  const auth = betterAuth({
    database: {
      dialect: new D1Dialect(),
      type: "sqlite",
      provider: context.env.DB,
    },
    socialProviders: {
      github: {
        clientId: context.env.GITHUB_CLIENT_ID,
        clientSecret: context.env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: context.env.GOOGLE_CLIENT_ID,
        clientSecret: context.env.GOOGLE_CLIENT_SECRET,
      },
    },
  });

  return auth.handler(context.request);
}
