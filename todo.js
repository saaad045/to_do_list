const todoObjectList = [];

class Todo_class {
    constructor(item) {
        this.ulElement = item;
    }

    add() {
        const todoInput = document.querySelector("#myInput").value;
        
        if (todoInput === "") {
            alert("You have not entered any item");
        } else {
            const todoObject = {
                id: todoObjectList.length,
                todoText: todoInput,
                isDone: false,
                targetDate: new Date('2023-12-31T23:59:59').getTime(), 
            };
            todoObjectList.unshift(todoObject);
            this.display();
            document.querySelector("#myInput").value = '';
        }
    }
    
    done_undone(x) {
        const selectedToolIndex = todoObjectList.findIndex((item) => item.id == x);
        console.log(todoObjectList[selectedToolIndex].isDone);
        todoObjectList[selectedToolIndex].isDone = !todoObjectList[selectedToolIndex].isDone;
        this.display();
    }
    
    deleteElement(z) {
        const selectedDelIndex = todoObjectList.findIndex((item) => item.id == z);
        todoObjectList.splice(selectedDelIndex, 1);
        this.display();
    }
    
    setCountdown(taskElement, targetDate) {
        const countdownElement = taskElement.querySelector(".countdown");

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = 'Countdown expired!';
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    }
    
    display() {
        this.ulElement.innerHTML = "";
        todoObjectList.forEach((object_item) => {
            const liElement = document.createElement("li");
            const delBtn = document.createElement("span"); 
            liElement.innerText = object_item.todoText;
            liElement.setAttribute("data-id", object_item.id);

            delBtn.setAttribute("data-id", object_item.id);
            delBtn.classList.add("far", "fa-trash-alt");
            delBtn.addEventListener("click", (e) => {
                const deleteId = e.target.getAttribute("data-id");
                this.deleteElement(deleteId);
            });

            liElement.addEventListener("click", (e) => {
                const selectedId = e.target.getAttribute("data-id");
                this.done_undone(selectedId);
            });

            if (object_item.isDone) {
                liElement.classList.add("checked");
            }

            liElement.appendChild(delBtn);
            this.ulElement.appendChild(liElement);
            
            this.setCountdown(liElement, object_item.targetDate); 
            liElement.appendChild(delBtn);
            this.ulElement.appendChild(liElement);
        });
    }
}

const listSection = document.querySelector('#myUL');
const myTodoList = new Todo_class(listSection);

document.querySelector(".addBtn").addEventListener("click", () => {
    myTodoList.add();
});
