import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LaunchRow } from "./pacts";

export const launchesQuery = () =>
  queryOptions({
    queryKey: ["launches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("launches")
        .select("*, backings(backer_id)")
        .order("launch_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LaunchRow[];
    },
  });

export const launchQuery = (id: string) =>
  queryOptions({
    queryKey: ["launches", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("launches")
        .select("*, backings(backer_id)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as LaunchRow | null;
    },
  });

/** Everything needed to compute pact status for the signed-in user. */
export const myPactDataQuery = (userId: string | null) =>
  queryOptions({
    queryKey: ["pact-data", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data: mine } = await supabase.from("launches").select("id").eq("user_id", userId!);
      const myLaunchIds = (mine ?? []).map((l) => l.id);
      const { data: myBackings } = await supabase
        .from("backings")
        .select("launch_id")
        .eq("backer_id", userId!);
      let backers: string[] = [];
      if (myLaunchIds.length) {
        const { data } = await supabase.from("backings").select("backer_id").in("launch_id", myLaunchIds);
        backers = (data ?? []).map((b) => b.backer_id);
      }
      return {
        myLaunchIds,
        myBacked: new Set((myBackings ?? []).map((b) => b.launch_id)),
        backersOfMine: new Set(backers),
      };
    },
  });

export async function toggleBacking(launchId: string, userId: string, backed: boolean) {
  if (backed) {
    const { error } = await supabase.from("backings").delete().eq("launch_id", launchId).eq("backer_id", userId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("backings").insert({ launch_id: launchId, backer_id: userId });
    if (error) throw error;
  }
}
