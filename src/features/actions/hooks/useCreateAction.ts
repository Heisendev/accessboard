import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actionsApi } from "../services/actions.api";
import type { Action, CreateActionInput } from "../types";

const ACTIONS_QUERY_KEY = ["actions"]

export function useCreateAction() {
    const queryClient = useQueryClient();

    return useMutation<Action, Error, CreateActionInput>({
        mutationFn: actionsApi.createAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ACTIONS_QUERY_KEY})
        }
    });
}