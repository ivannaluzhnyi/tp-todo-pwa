const pad = (s) => {
    return s < 10 ? `0${s}` : s;
};

const getFormattedDate = (date) => {
    if (!date) {
        return "";
    }
    const d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};

export const renderSynced = (el) => {
    if (typeof el === "string") {
        return el === "true";
    }
    return el;
};

export default function TodoItem(page, data) {
    page.innerHTML = "";

    const constructor = document.createElement("section");

    constructor.innerHTML = `
    
    <div class="max-w-lg m-auto rounded overflow-hidden shadow-lg">
        <div class="px-10 py-4">
            <div class="font-bold text-xl mb-2">${data.title}</div>
            <p class="text-gray-700 text-base">
               ${data.description === "" ? "No description." : data.description}
            </p>
            </div>
            <div class="px-6 py-4">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Created: ${getFormattedDate(
                data.date
            )} </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Is synchronized: ${
                renderSynced(data.synced)
                    ? "<span class='text-green-500'>Oui</span>"
                    : "<span class='text-red-500'>Non</span>"
            }</span>
        </div>
    </div>


            <a href="/" class=" mt-2 m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  /> Back ... </a>
   
    
    `;
    page.appendChild(constructor);
    return constructor;
}
