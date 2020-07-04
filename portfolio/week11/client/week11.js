import {makeRequest} from "./authHelpers.js";
import Auth from "./auth.js";

let auth = new Auth();

let callback = async function getPosts(token) {
    let data = await makeRequest("posts", "GET", null, token);
    let section = document.getElementById("sectionDisplay");
    let table = document.createElement("table");
    let i = 1;
    table.innerHTML = "<tr><th>Post_Id</th><th>Title</th><th>Content</th><th>Creation Date</th></tr>";
    data.forEach(element => {
        table.innerHTML += `
        <td>
            ${i}
        </td>
        <td>
            ${element.title}
        </td>
        <td>
            ${element.content}
        </td>
        <td>
            ${element.createdAt ? new Date(element.createdAt): "null" }
        </td>`
        i++;
    });
    section.appendChild(table);
}

document.getElementById("submitForm").addEventListener("click", (event) =>{
    event.preventDefault();
    auth.login(callback);
})