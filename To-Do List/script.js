//declaring the elements
let form=document.getElementById(`task_form`)
let clearBtn=document.getElementById(`clear_task_btn`)
let filter=document.getElementById(`task_filter`)
let taskInput=document.getElementById(`new_task`)
let taskList=document.querySelector(`ul`)

//declaring event
form.addEventListener(`submit`,addTask)
taskList.addEventListener(`click`,removeTask)
clearBtn.addEventListener(`click`,clearTask)
filter.addEventListener(`keyup`,filterTask)
document.addEventListener(`DOMContentLoaded`,getTasks)
//declaring the function
function addTask(e){
  if(taskInput.value===``){
    alert(`Add a task!`)
  }else{
   let li= document.createElement(`li`)
   li.appendChild(document.createTextNode(taskInput.value+` `))
   let link=document.createElement(`a`)
   link.setAttribute(`href`,`#`)
   link.innerHTML=`x`
   li.appendChild(link)
   taskList.appendChild(li)
   storeTaskInLocalStorage(taskInput.value)

   taskInput.value=``
   
  }
  e.preventDefault()
}
function removeTask(e){
  if(e.target.hasAttribute(`href`)){
    if(confirm(`Are you sure?`));{
      let ele=e.target.parentNode
      ele.remove()
      removeFromLS(ele)
      
    }
  }
}
function clearTask(){
  taskList.innerHTML=``
  localStorage.clear() //clear all from local memory
  
}
function filterTask(e){
  let text=e.target.value.toLowerCase()
  document.querySelectorAll(`li`).forEach(function(task){
  let item=task.firstChild.textContent
  if(item.toLowerCase().indexOf(text)!=-1){
    task.style.display=`block`
  }else{
    task.style.display=`none`
  }
})
}
//local memory portion
//store in local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem(`tasks`)===null){
    tasks=[]
  }else{
    tasks=JSON.parse(localStorage.getItem(`tasks`))
  }
tasks.push(task)
localStorage.setItem(`tasks`,JSON.stringify(tasks))
}

//see the list from memory
function getTasks(){
  let tasks;
  if(localStorage.getItem(`tasks`)===null){
    tasks=[]
  }else{
    tasks=JSON.parse(localStorage.getItem(`tasks`))
  }
  tasks.forEach(task=>{
    let li= document.createElement(`li`)
    li.appendChild(document.createTextNode(task+` `))
    let link=document.createElement(`a`)
    link.setAttribute(`href`,`#`)
    link.innerHTML=`x`
    li.appendChild(link)
    taskList.appendChild(li)
  })
}
//remove from local memory
function removeFromLS(taskItem){
  let tasks;
  if(localStorage.getItem(`tasks`)===null){
    tasks=[]
  }else{
    tasks=JSON.parse(localStorage.getItem(`tasks`))
  }
  let li=taskItem
  li.removeChild(li.lastChild)
  tasks.forEach((task,index)=>{
    if(li.textContent.trim()===task){
      tasks.splice(index,1)

    }
  })
  localStorage.setItem(`tasks`,JSON.stringify(tasks))
}