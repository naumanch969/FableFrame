"use client"

import { stripe } from "@/config/stripe";
import { absoluteUrl } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";
import { useGetMySubscription } from "./useGetMySubscription";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PLANS } from "@/constants";

type RequestType = {
  profile_id: Id<"profiles">,
  email: string,
  plan: typeof PLANS[number]["key"],
  plan_description: string,
  plan_price: number
};

type ResponseType = {
  checkoutUrl: string;
};

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateStripeCheckout = () => {

  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<"success" | "error" | "settled" | "pending" | null>(null);

  const isPending = useMemo(() => state === "pending", [state]);
  const isSuccess = useMemo(() => state === "success", [state]);
  const isError = useMemo(() => state === "error", [state]);
  const isSettled = useMemo(() => state === "settled", [state]);

  const subscription = useQuery(api.subscription.get_subscription_by_profile_id, {})

  const mutate = useCallback(async (values: RequestType, options?: Options) => {
    try {
      setData(null);
      setError(null);
      setState("pending");

      const returnUrl = absoluteUrl("/billing")

      if (subscription && subscription.stripe_subscription_id) { // if user session already exist
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: subscription.stripe_customer_id,
          return_url: returnUrl
        })

        const result = { checkoutUrl: stripeSession.url }
        setData(result);
        options?.onSuccess?.(result);
      }
      else {
        const stripeSession = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          customer_email: values.email,
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: "USD",
                product_data: {
                  name: `FableFrame ${values.plan} Plan`,
                  description: values.plan_description,
                },
                unit_amount: values.plan_price * 100,  // values.plan_price is in cents, so converting them into dollars
                recurring: {
                  interval: values.plan == "pro" ? "month" : "year"
                }
              }
            },
          ],
          metadata: {
            profile_id: values.profile_id,
            plan: values.plan,
          },
          success_url: returnUrl,
          cancel_url: returnUrl
        })

        console.log('stripeSession', stripeSession)

        const result = { checkoutUrl: stripeSession.url! }
        setData(result);
        options?.onSuccess?.(result);
      }

      setState("success");
    } catch (error) {
      setError(error as Error);
      setState("error");
      options?.onError?.(error as Error);
      if (options?.throwError) throw error;
    } finally {
      setState("settled");
      options?.onSettled?.();
    }
  }, []);

  return { mutate, data, error, isSuccess, isPending, isSettled, isError };
};
