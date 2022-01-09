function getAndAddData() {
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("JsonItems") == null) {
        JsonItemsArray = [];
        JsonItemsArray.push([tit, desc]);
        localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArray));
    }
    else {
        if (Validate(tit, desc)) {
            // clearAll.style.display = 'block';
            JsonItemsArray.push([tit, desc]);
            localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArray));
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
        }
    }
    update();
}
txtarea = document.getElementById("description");
tite = document.getElementById("title");
function Validate(title, descr) {
    if (!(title.length) == 0) {
        tite.style.borderColor = '#ced4da';
        if (!(descr.length) == 0) {
            txtarea.style.borderColor = '#ced4da';
            return true;
        }
        else {
            txtarea.style.borderColor = 'red';
            txtarea.placeholder = 'Enter Some description';
            return false;
        }
    }
    else {
        tite.style.borderColor = 'red';
        tite.placeholder = 'Enter Some Title';
        return false;
    }
}

function update() {
    if (localStorage.getItem("JsonItems") == null) {
        JsonItemsArray = [];
        localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArray));
    }
    else {
        clearAll.style.display = 'block';
        JsonItemsArrStr = localStorage.getItem("JsonItems");
        JsonItemsArray = JSON.parse(JsonItemsArrStr);
    }
    let content = "";
    JsonItemsArray.forEach((element, index) => {
        content += `<div class="card col-3">
        <div class="card-body">
          <h5 class="card-title">${element[0]}</h5>
          <p class="card-text">${element[1]}</p>
         <!-- <button class="btn btn-primary btn-sm my-1" onclick="edited(${index})">Edit</button> -->
          <button class="btn btn-danger btn-sm my-1" onclick="deleted(${index})">Delete</button>
        </div>
        </div>`
    });
    addTodo = document.getElementById("todos");
    todos.innerHTML = content;
}
add = document.getElementById("add");
add.addEventListener("click", getAndAddData);
update();

clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", () => {
    if (confirm("Do you really want to delete all TODOs. After doing this, you are unable to recover your TODOs?")) {
        localStorage.clear();
        update();
    }
})

function deleted(itemIndex) {
    JsonItemsArrayStr = localStorage.getItem("JsonItems");
    JsonItemsArr = JSON.parse(JsonItemsArrStr);
    JsonItemsArr.splice(itemIndex, 1);
    localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArr));
    update();
}

function edited(itemIndex) {

}
