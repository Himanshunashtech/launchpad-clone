import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { toggleBacking } from "@/lib/launch-queries";

export function useBacking(userId: string | null) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const m = useMutation({
    mutationFn: ({ launchId, backed }: { launchId: string; backed: boolean }) =>
      toggleBacking(launchId, userId!, backed),
    onSuccess: (_d, v) => {
      toast.success(v.backed ? "Backing removed" : "Backed! If they back you too, it's a pact.");
      qc.invalidateQueries({ queryKey: ["launches"] });
      qc.invalidateQueries({ queryKey: ["pact-data"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return {
    toggle: (launchId: string, backed: boolean) => {
      if (!userId) {
        navigate({ to: "/auth" });
        return;
      }
      m.mutate({ launchId, backed });
    },
    busy: m.isPending,
  };
}
