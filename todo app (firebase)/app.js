
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    push,
    onChildAdded,
    update,
    remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCnEpfeX43Kf7YSE-1PL3rhQ0Xzh53doDQ",
    authDomain: "todo-app-9b8b5.firebaseapp.com",
    projectId: "todo-app-9b8b5",
    storageBucket: "todo-app-9b8b5.appspot.com",
    messagingSenderId: "639176781039",
    appId: "1:639176781039:web:6a44f152f7bae70f467f1a"
};

const app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app);
window.add = function () {
    var todoValue = document.getElementById('todo').value
    var todoData = {
        todo: todoValue
    };
    if (todo.value == "") {
        alert("please enter a value")
        return;
    }
    var referKey = ref(DATABASE);
    var studentKey = push(referKey).key;
    todoData.id = studentKey;
    console.log(todoData);
    var reference = ref(DATABASE, `todos/${todoData.id}`);
    set(reference, todoData);
    // alert("Todo Added")
    getDataFromDatabase()
    document.getElementById('todo').value = ''
}
function getDataFromDatabase() {
    list.innerHTML = "";
    var reference = ref(DATABASE, `todos`);
    onChildAdded(reference, function (data) {
        if (data) {
            arr.push(data.val());
            render(data.val());
        }

    });
}
var arr = [];
var list = document.getElementById("list");
console.log(arr)
function render(data) {
    // for (var i = 0; i < arr.length; i++) {
    // console.log(arr)
    list.innerHTML += `<div class = "list-div"> <li class = "list">${data.todo} <button class = "edit" onclick="edit('${data.id}')"><i class="fa-solid fa-pen"></i></button> <button class = "delete" onclick="deleteTodo('${data.id}')"><i class="fa-solid fa-trash"></i></button> </li> <div>`;
    // }
}
window.edit = function (id) {
    // console.log('id')

    var editTodo = prompt("enter")
    var refer = ref(DATABASE, `todos/${id}`);
    update(refer, {
        todo: editTodo,
    });
    getDataFromDatabase()
}
// console.log("hello")
window.deleteTodo = function (id) {
    // var index = arr.findIndex(item => item.id === id);

    // if (index !== -1) {
    //     arr.splice(index, 1);

    var refer = ref(DATABASE, `todos/${id}`);
    remove(refer)
        .then(() => {
            // console.log("Delete successful");
            getDataFromDatabase()
        })
        .catch((error) => {
            console.error("Delete error:", error);
        });
    // } else {
    //     console.error("Item not found in the array");
    // }
}

window.onload = getDataFromDatabase;
