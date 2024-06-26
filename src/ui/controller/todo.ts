import { todoRepository } from "@ui/repository/todo";

interface totoControllerGetParams {
    page?: number;
}

async function get(params: totoControllerGetParams = {}) {
    console.log(params);
    return todoRepository.get({
        page: 1,
        limit: 2,
    });
}

export const todoController = {
    get,
};
