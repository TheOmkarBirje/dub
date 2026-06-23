import Stripe from "stripe";
import { StripeMode } from "../types";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-05-28.basil",
      appInfo: {
        name: "Dub.co",
        version: "0.1.0",
      },
    })
  : new Proxy({} as Stripe, {
      get(target, prop) {
        return () => {
          throw new Error("Stripe Secret Key is missing. Please set STRIPE_SECRET_KEY in your environment.");
        };
      },
    });

const secretMap: Record<StripeMode, string | undefined> = {
  live: process.env.STRIPE_APP_SECRET_KEY,
  test: process.env.STRIPE_APP_SECRET_KEY_TEST,
  sandbox: process.env.STRIPE_APP_SECRET_KEY_SANDBOX,
};

// Stripe Integration App client
export const stripeAppClient = ({ mode }: { mode?: StripeMode }) => {
  const appSecretKey = secretMap[mode ?? "live"];

  if (!appSecretKey) {
    return new Proxy({} as Stripe, {
      get(target, prop) {
        return () => {
          throw new Error(`Stripe App Secret Key (${mode ?? "live"}) is missing. Please configure it in your environment.`);
        };
      },
    });
  }

  return new Stripe(appSecretKey, {
    apiVersion: "2025-05-28.basil",
    appInfo: {
      name: "Dub.co",
      version: "0.1.0",
    },
  });
};
