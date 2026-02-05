import {http, HttpResponse} from 'msw';

export const handlers = [
    http.get('/api/actions', () => {
        return HttpResponse.json([
        {
            id: 1,
            title: "Action 1",
            status: "todo"
        },
        {
            id: 2,
            title: "Action 2",
            status: "in-progress"
        },
        {
            id: 3,
            title: "Action 3",
            status: "done"
        }
        ]);
    }),
    http.post('/api/actions', async ({req}) => {
        const body = await req.json()
        return HttpResponse.json({
            id: Math.floor(Math.random() * 1000),
            ...body
        }, {status: 201});
    }),
    http.patch('/api/actions/:id', async ({req, params}) => {
        const body = await req.json()
        return HttpResponse.json({
            id: params.id,
            ...body
        });
    }),
    http.delete('/api/actions/:id', () => {
        return HttpResponse.json({}, {status: 204});
    })
];
