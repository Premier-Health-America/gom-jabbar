import { useEnv } from "@/hooks/useEnv";
import { treaty } from "@elysiajs/eden";
import type { API } from "@repo/server/src";

export const useApiClient = (bearerToken?: string | null) =>
  treaty<API>(useEnv().EXPO_PUBLIC_API_URL, {
    headers: {
      Authorization: `Bearer ${bearerToken ?? ""}`,
    },
  }).api.v1;

const $post = useApiClient()["nurse-locations"].post;

export type InferResponseType<T extends (...args: any) => Promise<any>> =
  NonNullable<Awaited<ReturnType<T>>["data"]>;

// type Paths = keyof ReturnType<typeof treaty<API>>["api"]["v1"];
// type Methods<P extends Paths> = keyof ReturnType<
//   typeof treaty<API>
// >["api"]["v1"][P];

// export type InferResponseType<
//   T extends Paths,
//   M extends Methods<T> = Methods<T>
// > = NonNullable<
//   // @ts-expect-error
//   Awaited<ReturnType<ReturnType<typeof treaty<API>>["api"]["v1"][T][M]>>["data"]
// >;
