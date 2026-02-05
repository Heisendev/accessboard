import { screen } from '@testing-library/react';
import { renderWithProviders } from './renderWithProviders';
import { Dashboard } from '@features/dashboard/Dashboard';

test('affiche la liste des actions', async () => {
    renderWithProviders(<Dashboard />);

    // Vérifie que le titre du dashboard est présent
    expect(await screen.findByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
    expect(screen.getByText('Action 3')).toBeInTheDocument();
});