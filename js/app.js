import page from "page";
import checkConnectivity from "./network.js";
import { fetchTodos, createTodo } from "./api/todo.js";
import {
    setTodos,
    setTodo,
    getTodos,
    getTodoToCreate,
    getTodo,
} from "./idb.js";

checkConnectivity({});
document.addEventListener("connection-changed", (e) => {
    let root = document.documentElement;
    document.offline = !e.detail;
    if (!document.offline) {
        syncData();
    }
});

const app = document.querySelector("#app .outlet");

fetch("/config.json")
    .then((result) => result.json())
    .then(async (config) => {
        console.log("[todo] Config loaded !!!");
        window.config = config;

        page("/", async () => {
            const module = await import("./views/Home.js");
            const Home = module.default;

            let todos = [];
            if (!document.offline) {
                const data = await fetchTodos();
                todos = await setTodos(data);
            } else {
                todos = (await getTodos()) || [];
            }

            Home(app, todos);

            document.addEventListener("render-view", ({ detail }) => {
                Home(app, detail);
            });

            document.addEventListener("create-todo", async ({ detail }) => {
                if (!document.offline && navigator.onLine === true) {
                    await setTodo(detail);
                    const result = await createTodo(detail);
                    if (result !== false) {
                        const todo = await getTodos();
                        return Home(app, todo);
                    }
                }

                detail.synced = "false";
                await setTodo(detail);
                const todo = await getTodos();
                return Home(app, todo);
            });
        });

        page("/:id", async (ctx) => {
            const module = await import("./views/TodoItem.js");
            const TodoItem = module.default;
            const currentItem = await getTodo(ctx.params.id);

            TodoItem(app, currentItem);
        });

        page();
    });

async function syncData() {
    const toCreate = await getTodoToCreate();
    toCreate.forEach(async (todo) => {
        todo.synced = "true";

        const result = await createTodo(todo);

        if (result !== false) {
            return await setTodo(todo);
        }
        todo.synced = "false";
        return await setTodo(todo);
    });

    if (toCreate.length > 0) {
        const todos = (await getTodos()) || [];

        document.dispatchEvent(
            new CustomEvent("render-view", { detail: todos })
        );
    }
}
