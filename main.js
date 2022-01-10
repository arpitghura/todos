//To getData from form and add to localstorage and frontend
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

//To validate where text and description is not empty
function Validate(title, descr) {
    if (!(title.length) == 0) {
        tite.style.borderColor = '#ced4da';
        if (!(descr.length) == 0) {
            txtarea.style.borderColor = '#ced4da';
            return true;
        }
        else {
            txtarea.style.borderColor = 'red';
            txtarea.placeholder = 'Enter Some Description';
            return false;
        }
    }
    else {
        tite.style.borderColor = 'red';
        tite.placeholder = 'Enter Some Title';
        return false;
    }
}

//TO add TODO on frontend from localstorage
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
        content += `<div class="card col-sm-5 col-md-4 col-lg-3">
        <div class="card-body">
          <h5 class="card-title">${element[0]}</h5>
          <p class="card-text">${element[1]}</p>
          <button class="btn btn-success btn-sm my-1" onclick="MarkedAsDone(${index})">Mark as Done</button>
          <button class="btn btn-danger btn-sm my-1" onclick="deleted(${index})">Delete</button>
        </div>
        </div>`
    });
    addTodo = document.getElementById("todos");
    todos.innerHTML = content;
    DoneUpdate();
    //Display of Clear Btn and Done TODO Label
    if (localStorage.getItem("JsonDoneItems") == "[]") {
        doneLabel.style.display = "none";
    }
    else {
        doneLabel.style.display = "block";
    }
    if (localStorage.getItem("JsonItems") == "[]" && localStorage.getItem("JsonDoneItems") == "[]") {
        clearAll.classList.add("disabled");
    }
    else {
        clearAll.classList.remove("disabled");
    }
}

//Clear All TODO i.e., clear the local storage
clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", () => {
    if (confirm("Do you really want to delete all TODOs. After doing this, you are unable to recover your TODOs?")) {
        localStorage.clear();
        update();
    }
})

//Delete TODO 
function deleted(itemIndex) {
    JsonItemsArrayStr = localStorage.getItem("JsonItems");
    JsonItemsArr = JSON.parse(JsonItemsArrStr);
    JsonItemsArr.splice(itemIndex, 1);
    localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArr));
    update();
}

//To remove and update lcal storage and front end for the TODO that labeled Marked as Done
function MarkedAsDone(itemIndex) {
    JsonItemsArrayStr = localStorage.getItem("JsonItems");
    JsonItemsArr = JSON.parse(JsonItemsArrStr);
    let doneEle = JsonItemsArr.splice(itemIndex, 1);
    AddToDoneArr(doneEle[0], doneEle[1]);
    localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArr));
    update();
}

//Add Done TODO to Local Storage
function AddToDoneArr(doneEletitle, doneEledesc) {
    if (localStorage.getItem("JsonDoneItems") == null) {
        JsonDoneItemsArray = [];
        JsonDoneItemsArray.push([doneEletitle, doneEledesc]);
        localStorage.setItem("JsonDoneItems", JSON.stringify(JsonDoneItemsArray));
    }
    else {
        JsonDoneItemsArray.push([doneEletitle, doneEledesc]);
        localStorage.setItem("JsonDoneItems", JSON.stringify(JsonDoneItemsArray));
    }
}

//Update Frontend (also get data from local storage) for DONE TODOs
function DoneUpdate() {
    if (localStorage.getItem("JsonDoneItems") == null) {
        JsonDoneItemsArray = [];
        localStorage.setItem("JsonDoneItems", JsonDoneItemsArray);
        localStorage.setItem("JsonDoneItems", JSON.stringify(JsonDoneItemsArray));
    }
    else {
        JsonDoneItemsArrStr = localStorage.getItem("JsonDoneItems");
        JsonDoneItemsArray = JSON.parse(JsonDoneItemsArrStr);
    }
    let DoneContent = "";
    JsonDoneItemsArray.forEach((element, index) => {
        DoneContent += `<div class="card col-sm-5 col-md-3">
        <span class="badge bg-success card-header" id="done">Done</span> 
        <div class="card-body bg-dark text-light">
          <h5 class="card-title">${element[0][0]}</h5>
          <p class="card-text">${element[0][1]}</p>
          <button class="btn btn-warning btn-sm my-1" onclick="undoneit(${index})">Mark as Undone</button>
          <button class="btn btn-danger btn-sm my-1" onclick="DoneDeleted(${index})">Delete</button>
        </div>
        </div>`
    });
    addDoneTodo = document.getElementById("DoneTodos");
    addDoneTodo.innerHTML = DoneContent;
}

//Undone it
function undoneit(itemIndex) {
    JsonDoneItemsArrayStr = localStorage.getItem("JsonDoneItems");
    JsonDoneItemsArr = JSON.parse(JsonDoneItemsArrStr);
    ItemToUndone = JsonDoneItemsArr.splice(itemIndex, 1);
    localStorage.setItem("JsonDoneItems", JSON.stringify(JsonDoneItemsArr));
    if (localStorage.getItem("JsonItems") == null) {
        JsonItemsArray = [];
        JsonItemsArray.push([ItemToUndone[0][0][0], ItemToUndone[0][0][1]]);
        localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArray));
    }
    else {
        JsonItemsArray.push([ItemToUndone[0][0][0], ItemToUndone[0][0][1]]);
        localStorage.setItem("JsonItems", JSON.stringify(JsonItemsArray));
    }
    update();
}

//Delete Done TODOs
function DoneDeleted(itemIndex) {
    JsonDoneItemsArrayStr = localStorage.getItem("JsonDoneItems");
    JsonDoneItemsArr = JSON.parse(JsonDoneItemsArrStr);
    JsonDoneItemsArr.splice(itemIndex, 1);
    localStorage.setItem("JsonDoneItems", JSON.stringify(JsonDoneItemsArr));
    update();
}

add = document.getElementById("add");
add.addEventListener("click", getAndAddData);
update();