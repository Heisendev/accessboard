import { useMemo, useState } from "react";
import { useActions } from "@features/actions/hooks/useActions";    
import { CreateActionForm } from "@features/actions/components/CreateActionForm";
import ActionItem from "@features/actions/components/ActionItem";

import { EmptyState } from "@features/actions/components/states/emptyState";
import { LoadingState } from "@features/actions/components/states/loadingState";
import { ErrorState } from "@features/actions/components/states/errorState";

import { Input, Select } from "@features/actions/components/ui";

import type { ActionStatus } from "@features/actions/types";
import type { ChangeEvent } from "react";

export const Dashboard = () => {
    const {data, isLoading, isError, error} = useActions();
    const [statusFilter, setStatusFilter] = useState<ActionStatus | 'all'>('all');
    const [search, setSearch] = useState("");

    const filteredActions = useMemo(
        () => {
            return data?.filter((action) => {
                const matchesStatus = statusFilter === 'all' || action.status === statusFilter;
                const matchesSearch = action.title.toLowerCase().includes(search.toLowerCase());
                return matchesStatus && matchesSearch;
            });
        },
        [data, statusFilter, search]
    );

    if(isLoading){
        return <LoadingState />
    }

    if(isError){
        return (
            <ErrorState message={error.message} />
        )
    }

    if(!data || data.length === 0){
        return <EmptyState />
    }

    return (
        <section className="mx-auto max-w-2xl space-y-6 p-6">
            <h1  className="text-2xl font-bold">Dashboard</h1>
            <CreateActionForm />

            <label htmlFor="status-filter">Statut</label>
            <Select 
                name="" 
                id="status-filter" 
                value={statusFilter}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as ActionStatus | 'all')}
            >
                <option value="all">Tous</option>
                <option value="todo">À faire</option>
                <option value="in-progress">En cours</option>
                <option value="blocked">Bloqué</option>
                <option value="done">Terminé</option>
            </Select>
            <Input 
                label="Rechercher"
                type="search" 
                id="search" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une action"
            />
            {filteredActions && filteredActions.length === 0 ? (
                <p>Aucune action ne correspond aux filtres.</p>
            ): (
                <ul className="space-y-2">
                {filteredActions?.map((action) => (
                    <ActionItem key={action.id} action={action} />
                ))}
            </ul>
            )}
            
        </section>
    )
}