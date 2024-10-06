async function add(task, status) {
    const response = await fetch('http://localhost:3000/task', {
        method: 'POST',
        body: JSON.stringify({
            username: window.localStorage.getItem("username"),
            task: task,
            status: status
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
}

async function get() {
    const response = await fetch('http://localhost:3000/tasks?username=' + window.localStorage.getItem("username"));
    const responseData = await response.json();
    console.log(responseData);

    

    document.querySelector('.Backlog').innerHTML = '';
    document.querySelector('.vrazrab').innerHTML = '';
    document.querySelector('.nasogl').innerHTML = '';
    document.querySelector('.cdelano').innerHTML = '';

    responseData.forEach(taskData => {
        const article = document.createElement('article');
        article.classList.add('zadacha');
        const id = taskData.id;
        article.setAttribute('data-id', id); 
        article.innerHTML = `
            <div class="delete"><h4>${taskData.task}</h4><p class="del">X</p></div>
            <input type='text' class='list' list='list' multiple='' placeholder='Статус' value='${taskData.status}' />
                        <div class="kartinki">
                            <img src="img/Avatar.svg" alt="">
                            <img src="img/Avatar2.svg" alt="">
                            <div class="five">+5</div>
                            <img src="img/Add Button.svg" alt="">
                        </div>
        `;
        
        switch (taskData.status) {
            case 'Backlog':
                document.querySelector('.Backlog').appendChild(article);
                break;
            case 'В разработке':
                document.querySelector('.vrazrab').appendChild(article);
                break;
            case 'На согласовании':
                document.querySelector('.nasogl').appendChild(article);
                break;
            case 'Выполнено':
                document.querySelector('.cdelano').appendChild(article);
                break;
            default:
                console.log('Некорректный статус задачи');
        }
        
        article.querySelector('.del').addEventListener('click', async () => {
            const confirmDelete = confirm('Вы уверены, что хотите удалить эту задачу?');
            
            if (confirmDelete) {
                const taskId = article.dataset.id;
        
                await fetch(`http://localhost:3000/task/${taskId}`, {
                    method: 'DELETE',
                });
        
                article.remove();
            }
        
        });
    });
}


get();



document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.dobavit1');
  
    addButton.addEventListener('click', function() {    
        const Backlog = document.querySelector('.Backlog');
     

        
        const newTask = document.createElement('div');
        newTask.classList.add('zadacha');
        newTask.innerHTML = `
        <input type="text" class="za" placeholder="Название задачи">
        <input list="statuslist" class="statuszadachi" placeholder="Статус">
        <datalist id="statuslist">
            <option value="Backlog"></option>
            <option value="В разработке"></option>
            <option value="На согласовании"></option>
            <option value="Выполнено"></option>
        </datalist>
        <div class="kartinki">
            <img src="img/Avatar.svg" alt="">
            <img src="img/Avatar2.svg" alt="">
            <div class="five">+5</div>
            <img src="img/Add Button.svg" alt=""> 
            </div>
        <button class="saveButton">Создать</button>`;

        Backlog.appendChild(newTask);

        newTask.querySelector('.saveButton').addEventListener('click', function() {
            const task = newTask.querySelector('.za').value;
            const status = newTask.querySelector('.statuszadachi').value; 
            if (task.trim() !== '' && status.trim() !== '') {
                add(task, status);
            }
            
            newTask.remove(); 
        });
    });
});

document.getElementById('poisk1').addEventListener('input', function () {
    let inputValue = this.value.toLowerCase(); 
    let zadachi = document.querySelectorAll('.Backlog .zadacha'); 

    zadachi.forEach(function (zadacha) {
        let title = zadacha.querySelector('h4').textContent.toLowerCase(); 

        if (title.includes(inputValue)) {
            zadacha.style.display = 'block'; 
        } else {
            zadacha.style.display = 'none'; 
        }
    });
});
document.getElementById('poisk2').addEventListener('input', function () {
    let inputValue = this.value.toLowerCase(); 
    let zadachi = document.querySelectorAll('.vrazrab .zadacha'); 

    zadachi.forEach(function (zadacha) {
        let title = zadacha.querySelector('h4').textContent.toLowerCase(); 

        if (title.includes(inputValue)) {
            zadacha.style.display = 'block'; 
        } else {
            zadacha.style.display = 'none'; 
        }
    });
});
document.getElementById('poisk3').addEventListener('input', function () {
    let inputValue = this.value.toLowerCase(); 
    let zadachi = document.querySelectorAll('.nasogl .zadacha'); 

    zadachi.forEach(function (zadacha) {
        let title = zadacha.querySelector('h4').textContent.toLowerCase(); 

        if (title.includes(inputValue)) {
            zadacha.style.display = 'block'; 
        } else {
            zadacha.style.display = 'none'; 
        }
    });
});
document.getElementById('poisk4').addEventListener('input', function () {
    let inputValue = this.value.toLowerCase(); 
    let zadachi = document.querySelectorAll('.cdelano .zadacha'); 

    zadachi.forEach(function (zadacha) {
        let title = zadacha.querySelector('h4').textContent.toLowerCase(); 

        if (title.includes(inputValue)) {
            zadacha.style.display = 'block'; 
        } else {
            zadacha.style.display = 'none'; 
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.dobavit2');
  
    addButton.addEventListener('click', function() {
        const vrazrab = document.querySelector('.vrazrab');
     

        const newTask = document.createElement('div');
        newTask.classList.add('zadacha');
        newTask.innerHTML = `
        <input type="text" class="za" placeholder="Название задачи">
        <input list="statuslist" class="statuszadachi" placeholder="Статус">
        <datalist id="statuslist">
            <option value="Backlog"></option>
            <option value="В разработке"></option>
            <option value="На согласовании"></option>
            <option value="Выполнено"></option>
        </datalist>
        <div class="kartinki">
            <img src="img/Avatar.svg" alt="">
            <img src="img/Avatar2.svg" alt="">
            <div class="five">+5</div>
            <img src="img/Add Button.svg" alt=""> 
            </div>
        <button class="saveButton">Создать</button>`;
        
        vrazrab.appendChild(newTask);

        newTask.querySelector('.saveButton').addEventListener('click', function() {
            const task = newTask.querySelector('.za').value;
            const status = newTask.querySelector('.statuszadachi').value; 
            if (task.trim() !== '' && status.trim() !== '') {
                add(task, status);
            }
            
            newTask.remove(); 
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.dobavit3');
  
    addButton.addEventListener('click', function() {
        const nasogl = document.querySelector('.nasogl');
   
        
        const newTask = document.createElement('div');
        newTask.classList.add('zadacha');
        newTask.innerHTML = `
        <input type="text" class="za" placeholder="Название задачи">
        <input list="statuslist" class="statuszadachi" placeholder="Статус">
        <datalist id="statuslist">
            <option value="Backlog"></option>
            <option value="В разработке"></option>
            <option value="На согласовании"></option>
            <option value="Выполнено"></option>
        </datalist>
        <div class="kartinki">
            <img src="img/Avatar.svg" alt="">
            <img src="img/Avatar2.svg" alt="">
            <div class="five">+5</div>
            <img src="img/Add Button.svg" alt=""> 
        </div>
        <button class="saveButton">Создать</button>`;
        
        nasogl.appendChild(newTask);

        newTask.querySelector('.saveButton').addEventListener('click', function() {
            const task = newTask.querySelector('.za').value;
            const status = newTask.querySelector('.statuszadachi').value; 
            if (task.trim() !== '' && status.trim() !== '') {
                add(task, status);
            }
            
            newTask.remove(); 
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.dobavit4');
  
    addButton.addEventListener('click', function() {
        const cdelano = document.querySelector('.cdelano');
       
     

        
        const newTask = document.createElement('div');
        newTask.classList.add('zadacha');
        newTask.innerHTML = `
        <input type="text" class="za" placeholder="Название задачи">
        <input list="statuslist" class="statuszadachi" placeholder="Статус">
        <datalist id="statuslist">
            <option value="Backlog"></option>
            <option value="В разработке"></option>
            <option value="На согласовании"></option>
            <option value="Выполнено"></option>
        </datalist>
        <div class="kartinki">
            <img src="img/Avatar.svg" alt="">
            <img src="img/Avatar2.svg" alt="">
            <div class="five">+5</div>
            <img src="img/Add Button.svg" alt=""> </div>
            <button class="saveButton">Создать</button>`;
        
        cdelano.appendChild(newTask);

        newTask.querySelector('.saveButton').addEventListener('click', function() {
            const task = newTask.querySelector('.za').value;
            const status = newTask.querySelector('.statuszadachi').value; 
            if (task.trim() !== '' && status.trim() !== '') {
                add(task, status);
            }
            
            newTask.remove(); 
        });
    });
});

