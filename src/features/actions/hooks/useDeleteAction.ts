import { useMutation,useQueryClient } from "@tanstack/react-query";
import type { Action } from "../types";
import { actionsApi } from "../services/actions.api";

const ACTIONS_QUERY_KEY = ["actions"]

export function useDeleteAction() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: string }, { previousAction?: Action[] }>({
        mutationFn: ({ id }) => actionsApi.deleteAction(id),
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries({queryKey: ACTIONS_QUERY_KEY});
            
            const previousAction = queryClient.getQueryData<Action[]>(ACTIONS_QUERY_KEY);
            queryClient.setQueryData<Action[]>(
                ACTIONS_QUERY_KEY,
                (oldActions = []) => oldActions.filter(action => action.id !== id)
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