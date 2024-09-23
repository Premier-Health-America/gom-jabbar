import { treaty } from "@elysiajs/eden";
import { api } from "../src/routers/api";

export const apiClient = treaty<typeof api>(api).api.v1;
