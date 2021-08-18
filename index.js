let listContainer = document.getElementById("list-container")
let itemContainer = document.getElementById("item-container")
let listForm = document.getElementById("list-form")
let listSubmitButton = document.getElementById("list-submit-button")
let itemSubmitButton = document.getElementById("item-submit-button")

document.addEventListener("DOMContentLoaded", () => {
    fetchList()
    submitList()
    fetchItems()
    updateItem()
})

function submitList(){
    listForm.addEventListener('submit', listFormSubmission)
}

function updateItem(){
    itemContainer.addEventListener("click", editItem)
}  

const BASE_URL = "http://localhost:3000/api/v1"

function fetchList(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json()) //json return another promise
    .then(list => {
        for (const lists of list.data){
            let list = new List (lists.attributes.id, lists.attributes.title)
        list.renderList()
        listContainer.innerHTML += `
        <form class="item-form" name="item-form-${lists.attributes.id}" onsubmit="itemFormSubmission(${lists.attributes.id})">
        <input type="hidden" name="item-parent" value="${lists.attributes.title}">
        <input type="text" name="item-content" class="item-content">
            <input type="hidden" name="list-id" value=${lists.attributes.id} class="item-content">
            <input type="submit" class="item-submit-button" value="Add an Item">
        </form>`
        } 
    })
}

function fetchItems(){
    fetch(`${BASE_URL}/items`)
    .then(resp => resp.json())
    .then(item => {
        for (const items of item.data){
            let item = new Item (items.id, items.attributes.content, items.attributes.parent)
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
        let l = new List(list.data.attributes.id, list.data.attributes.title)
        l.renderList()
        listContainer.innerHTML += `
        <form onsubmit="itemFormSubmission(${list.data.attributes.id})">
            <input type="hidden" name="item-parent" value="${list.data.attributes.title}">
            <input type="text" name="item-content" class="item-content">
            <input type="hidden" name="list-id" value=${list.data.attributes.id} class="item-content">
            <input type="submit" class="item-submit-button" value="Add an Item">
         </form>`
        listForm.reset()     
    })
}

function itemFormSubmission(formId){
    event.preventDefault()
    let content = document.forms[formId]["item-content"].value;
    let listId = document.forms[formId]["list-id"].value;
    let itemParent = document.forms[formId]["item-parent"].value

    let item = {
        content: content,
        parent: itemParent,
        list_id: listId,
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
      let i = new Item(item.data.attributes.id, item.data.attributes.content, itemParent)
      i.renderItem()
    })
}

function deleteItem(){
    let itemId = parseInt(event.target.dataset.id)
    fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'DELETE',
    })
    this.location.reload() 
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