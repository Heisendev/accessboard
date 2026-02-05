import { useState, memo, useCallback } from "react";
import type { Action } from "../types";
import Button from "./ui/Button";
import { useUpdateAction } from "../hooks/useUpdateAction";
import { useDeleteAction } from "../hooks/useDeleteAction";

type Props = { 
    action: Action
}

function ActionItem({ action }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(action.title);
    
    const {mutate: udpateAction, isPending} = useUpdateAction();
    const {mutate: deleteAction, isPending: isDeleting} = useDeleteAction();

    const handleSubmit = () => {
        udpateAction(
            { id: action.id, input: { title } },
            {onSuccess: () => setIsEditing(false)}
        );
        
    }

    const handleDelete = useCallback(
        (id: string) => deleteAction({id}),
        [deleteAction]
    );
    
    return (
        <li className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
            {isEditing ? (
                <>
                    <label className="sr-only" htmlFor={`edit-${action.id}`}>
                        Modifier le titre
                    </label>
                    <input
                        id={`edit-${action.id}`}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isPending}
                    />
                    <Button variant="primary" onClick={handleSubmit} disabled={isPending}>Valider</Button>
                    <Button variant="secondary" onClick={() => {
                        setTitle(action.title);
                        setIsEditing(false)}}>Annuler</Button>
                </>
            ) : (
                <>
                    <span>{action.title}</span>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>Modifier</Button>
                        <Button variant="danger"
                            type="button"
                            disabled={isDeleting}
                            onClick={() => {
                                const confirmed = window.confirm(
                                'Supprimer définitivement cette action ?'
                                )

                                if (confirmed) {
                                handleDelete(action.id)
                                }
                            }}
                            >
                            Supprimer
                            </Button>
                    </div>
                </>
            )}
        </li>
    );
}

export default memo(ActionItem);