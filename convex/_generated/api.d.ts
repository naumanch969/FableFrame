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
import type * as comment from "../comment.js";
import type * as contact from "../contact.js";
import type * as hashtag from "../hashtag.js";
import type * as http from "../http.js";
import type * as like from "../like.js";
import type * as notification from "../notification.js";
import type * as profile from "../profile.js";
import type * as report from "../report.js";
import type * as share from "../share.js";
import type * as story from "../story.js";
import type * as user from "../user.js";

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
  comment: typeof comment;
  contact: typeof contact;
  hashtag: typeof hashtag;
  http: typeof http;
  like: typeof like;
  notification: typeof notification;
  profile: typeof profile;
  report: typeof report;
  share: typeof share;
  story: typeof story;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
