import { useQuery } from "@tanstack/react-query";
import { actionsApi } from "../services/actions.api";
import type { Action } from "../types";

const ACTIONS_QUERY_KEY = ['actions'];

export function useActions() {
    return useQuery<Action[], Error>({
        queryKey: ACTIONS_QUERY_KEY,
        queryFn: actionsApi.getActions,
    })
}
