/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as http from "../services/http.js";
import type * as services_comment from "../services/comment.js";
import type * as services_hashtag from "../services/hashtag.js";
import type * as services_notification from "../services/notification.js";
import type * as services_report from "../services/report.js";
import type * as services_share from "../services/share.js";
import type * as services_story from "../services/story.js";
import type * as services_user from "../services/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  "services/comment": typeof services_comment;
  "services/hashtag": typeof services_hashtag;
  "services/notification": typeof services_notification;
  "services/report": typeof services_report;
  "services/share": typeof services_share;
  "services/story": typeof services_story;
  "services/user": typeof services_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
