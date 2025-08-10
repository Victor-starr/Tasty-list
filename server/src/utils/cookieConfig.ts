// utils/cookieConfig.ts
import { CookieOptions } from "express";

export const getCookieConfig = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction, // must be HTTPS in prod
    sameSite: isProduction ? "none" : "lax", // Safari needs 'none' for cross-site
    maxAge: 7 * 60 * 60 * 1000, // 7 hours
    path: "/",
  };
};

export const getClearCookieConfig = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
};
