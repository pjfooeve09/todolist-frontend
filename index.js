let listContainer = document.getElementById("list-container")
let itemContainer = document.getElementById("item-container")
let listForm = document.getElementById("list-form")
let itemForm = document.getElementById("item-form")
let listSubmitButton = document.getElementById("list-submit-button")
let itemSubmitButton = document.getElementById("item-submit-button")

document.addEventListener("DOMContentLoaded", () => {
    fetchList()
    fetchItems()
    submitList()
    submitItem()
    updateItem()
})

function submitList(){
    listForm.addEventListener('submit', listFormSubmission)
}

function submitItem(){
    itemForm.addEventListener('submit', itemFormSubmission)
}

function updateItem(){
    itemContainer.addEventListener("click", editItem)
}  

function disableListForm(){
    listSubmitButton.disabled = true
}

const BASE_URL = "http://localhost:3000/api/v1"

function fetchList(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json()) //json return another promise
    .then(list => {
        for (const lists of list.data){
            let list = new List (lists.attributes.title)
        list.renderList()
        disableListForm()
        } 
    })
}

function fetchItems(){
    fetch(`${BASE_URL}/items`)
    .then(resp => resp.json())
    .then(item => {
        for (const items of item.data){
            let item = new Item (items.id, items.attributes.content)
        item.renderItem()
        }
    })
}

function listFormSubmission(){
    event.preventDefault()
    let title = document.getElementById("list-title").value
    
    let list = {
        title: title
    }

    fetch(`${BASE_URL}/lists`, { 
        method: "POST", 
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(list)  
    })
    .then(resp => resp.json()) 
    .then(list => { 
        let l = new List(list.data.attributes.title)
        l.renderList()
        listForm.reset()
        disableListForm()
    }) 
}

function itemFormSubmission(){
    event.preventDefault()
    let content = document.getElementById("item-content").value

    let item = {
        content: content
    }

    fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    .then(resp => resp.json())
    .then(item => {
      let i = new Item(item.data.attributes.id, item.data.attributes.content)
      i.renderItem()
      itemForm.reset()
    })
}

function deleteItem(){
    let itemId = parseInt(event.target.dataset.id)
    fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'DELETE',
    })
    this.location.reload() //this refers to the window in this case, NOT instance of item. this method will reload the page automatically
}

function editItem(){
    let li = event.target
    li.contentEditable = true
    let itemId = li.attributes.getNamedItem("content-id").value
    let content = li.innerHTML
    
    let item = {
        content: content
    }

    fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    .then(resp => resp.json())
    .then(item => {
        let i = new Item(item.data.attributes.id, item.data.attributes.content)
        return i
    })
}