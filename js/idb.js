import { openDB } from "idb";

export async function initDB() {
    const config = window.config;
    const db = await openDB("awesome-todo", config.version || 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore("todos", {
                // The 'id' property of the object will be the key.
                keyPath: "id",
            });
            // Create an index on the 'date' property of the objects.
            store.createIndex("synced", "synced");
            store.createIndex("date", "date");
        },
    });
    return db;
}

export async function setTodos(data) {
    const db = await initDB();
    const tx = db.transaction("todos", "readwrite");
    data.forEach((item) => {
        tx.store.put(item);
    });
    await tx.done;
    return await db.getAll("todos");
}

export async function setTodo(data) {
    const db = await initDB();
    const tx = db.transaction("todos", "readwrite");
    return await tx.store.put(data);
}

export async function getTodos() {
    const db = await initDB();
    return await db.getAll("todos");
}

export async function getTodo(id) {
    const db = await initDB();
    const res = await db.getAll("todos");

    return await res.find((e) => parseInt(e.id, 10) === parseInt(id, 10));
}

export async function getTodoToCreate() {
    const db = await initDB();
    return await db.getAllFromIndex("todos", "synced", "false");
}
