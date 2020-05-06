export async function fetchTodos() {
    const config = window.config;
    return fetch(`${config.api}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((result) => result.json())
        .catch((error) => {
            console.error(error);
            return false;
        });
}

export async function createTodo(data) {
    const config = window.config;
    return fetch(`${config.api}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((result) => result.json())
        .catch((error) => {
            console.error(error);
            return false;
        });
}

export async function fetchTodo(id) {
    return fetch(`${config.api}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((jsn) =>
            jsn.find((el) => parseInt(el.id, 10) === parseInt(id, 10))
        );
}
