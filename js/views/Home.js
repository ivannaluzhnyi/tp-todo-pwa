import todoCard from "../components/todo-card.js";
import FormTodo from "../components/form-todo.js";

export default function Home(page, data) {
    page.innerHTML = "";
    const constructor = document.createElement("section");

    const renderCards = () => data.reverse().map((dt) => todoCard(dt));
    constructor.innerHTML = `
        <div class="flex mb-4">
            <div class="w-2/6 bg-gray-300 p-8">
               ${FormTodo()}
            </div>
            <div class="w-4/6 bg-gray-500   ">

                <h3 class="m-10 font-bold">${
                    data.length > 0
                        ? "Your todos : (click to see details)"
                        : "You don't have todos yet"
                }</h3>

            

            
                <ul class="list-disc mt-5 pb-5">
                    ${renderCards()}
                </ul>

                <small class="m-10">
                    Attenction! If you are ofline you can see the details if you have seen at least one detail online. 
                </small>
            </div>
        </div>
  `;

    const form = constructor.querySelector(".todo-main-form");

    function renderFormError() {
        const err = form.querySelector(".form-error");
        err.innerHTML = `
            <div class="form-error-child bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" mg-10 role="alert">
                <strong class="font-bold">Ooops...</strong>
                <span class="block sm:inline">Value is required</span>
            </div>
        `;

        return console.warn("[todo] Value is required !!!");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.querySelector(".todo-name").value;
        const description = form.querySelector(".todo-description").value;

        if (name === "") {
            return renderFormError();
        }

        const todo = {
            id: Date.now(),
            title: name,
            description,
            synced: "true",
            done: false,
            date: Date.now(),
        };

        form.querySelector(".todo-name").value = "";
        form.querySelector(".todo-description").value = "";

        const err = form.querySelector(".form-error-child");
        if (err !== null) err.remove();

        return handlSave(todo);
    });

    const handlSave = (todo) => {
        const event = new CustomEvent("create-todo", { detail: todo });
        document.dispatchEvent(event);
    };

    page.appendChild(constructor);
    return constructor;
}
