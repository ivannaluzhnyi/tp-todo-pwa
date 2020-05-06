export default function TodoCard(todoItem) {
    return `<li class="bg-white rounded-md p-2 ml-10 "> 
    
    
        <a href="/${todoItem.id}" > ${todoItem.title}  </a>
    
    
    </li>`;
}
