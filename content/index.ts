import { ko } from "./ko";
import { en } from "./en";

export const LOCALE: "ko" | "en" = "ko"; // 개발 끝나면 "en"으로 변경
export const t = LOCALE === "ko" ? ko : en;
