import { useState } from "react";
import { useCreateAction } from "../hooks/useCreateAction";

import { Input, Button } from "@features/actions/components/ui";

export function CreateActionForm() {
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {mutate, isPending} = useCreateAction();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        
        if(!title.trim()){
            setErrorMessage("Le titre est requis.");
            return;
        }
        mutate(
            { title },
            {
                onSuccess: () => {
                    setTitle("");
                },
                onError: (error) => {
                    setErrorMessage(error.message);
                }
            }
        );
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={isPending} aria-busy={isPending}>
                <legend>Créer une nouvelle action</legend>
                <Input
                    label="Titre"
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre de l'action"
                />
                {errorMessage && <p role="alert" className="error">{errorMessage}</p>}
                <Button type="submit" variant="primary">Créer l'action</Button>
            </fieldset>
        </form>
    );
}