interface todoRepositoryGetParams {
    page: number;
    limit: number;
}
interface todoRepositoryOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: todoRepositoryGetParams): Promise<todoRepositoryOutput> {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        const todosString = await respostaDoServidor.text();
        const todosFromServer = JSON.parse(todosString).todos;
        console.log("page", page);
        console.log("limit", limit);

        const ALLAL_TODOS = todosFromServer;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedTodos = ALLAL_TODOS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALLAL_TODOS.length / limit);

        return {
            todos: paginatedTodos,
            total: ALLAL_TODOS.length,
            pages: totalPages,
        };
    });
}

export const todoRepository = {
    get,
};

//Model/Schema -  recebendo data da aplicação
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}
