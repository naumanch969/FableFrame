import { convex } from '@/config/convex';
import { stripe } from '@/config/stripe';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
        )
    }
    catch (error: any) {
        return new NextResponse("Webhook Error: " + error.message, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // if user is subscribing for the first time
    if (event.type == "checkout.session.completed") {

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.profile_id) return new NextResponse("Webhook Error: profile_id not found", { status: 400 });

        const new_subscription = await convex.mutation(api.subscription.create_my_subscription,
            {
                profile_id: session.metadata?.profile_id! as Id<"profiles">,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: subscription.customer as string,
                stripe_price_id: subscription.items.data[0].price.id,
                stripe_current_period_end: new Date(
                    subscription.current_period_end * 1000 // multiplying by 1000 to convert seconds to milliseconds
                ).toISOString()
            });

        console.log('new_subscription', new_subscription)

    }

    // if user is renewing subscription
    if (event.type == "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        const updated_subscription = await convex.mutation(api.subscription.update_my_subscription, {
            stripe_subscription_id: subscription.id,
            stripe_price_id: subscription.items.data[0].price.id,
            stripe_current_period_end: new Date(
                subscription.current_period_end * 1000 // multiplying by 1000 to convert seconds to milliseconds
            ).toISOString()
        })

        console.log('updated_subscription', updated_subscription)

    }


    return new NextResponse(null, { status: 200 });

}
