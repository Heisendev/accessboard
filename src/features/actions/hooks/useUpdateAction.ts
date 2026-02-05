import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Action } from "../types";
import { actionsApi } from "../services/actions.api";

const ACTIONS_QUERY_KEY = ["actions"]

export function useUpdateAction() {
    const queryClient = useQueryClient();

    return useMutation<Action, Error, { id: string; input: Partial<Omit<Action, 'id' | 'status' | 'createdAt' | 'updatedAt'>> }, {previousAction?: Action[]}>({
        mutationFn: ({ id, input }) => actionsApi.updateAction(id, input),
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({queryKey: ACTIONS_QUERY_KEY});

            const previousAction = queryClient.getQueryData<Action[]>(ACTIONS_QUERY_KEY);

            queryClient.setQueryData<Action[]>(
                ACTIONS_QUERY_KEY, 
                (oldActions = []) =>
                    oldActions.map(action => action.id === id ? { ...action, ...input, updatedAt: new Date().toISOString() } : action)
                        
            );

            return { previousAction };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousAction) {
                queryClient.setQueryData<Action[]>(ACTIONS_QUERY_KEY, context.previousAction);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ACTIONS_QUERY_KEY})
        }
    });
}