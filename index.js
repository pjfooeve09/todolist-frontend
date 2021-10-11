const listContainer = document.getElementById("list-container")
const itemContainer = document.getElementById("item-container")
const listForm = document.getElementById("list-form")
const dropdownMenu = document.getElementById("dropdownMenu")

document.addEventListener("DOMContentLoaded", () => {
    fetchList()
    submitList()
    fetchItems()
    updateItem()
    listDropdown()
    filterItems()
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
            const list = new List (lists.attributes.id, lists.attributes.title)
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
            const item = new Item (items.id, items.attributes.content, items.attributes.parent)
        item.renderItem()
        }
    })
}

function listFormSubmission(){
    event.preventDefault()
    const title = document.getElementById("list-title").value
    
    const list = { 
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
        const l = new List(list.data.attributes.id, list.data.attributes.title)
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
    const content = document.forms[formId]["item-content"].value;
    const itemParent = document.forms[formId]["item-parent"].value;
    const listId = document.forms[formId]["list-id"].value;

    const item = {
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
      const i = new Item(item.data.attributes.id, item.data.attributes.content, itemParent)
      i.renderItem()
    })
}

function deleteItem(){
    const itemId = parseInt(event.target.dataset.id)
    fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        },
    })
    location.reload()
}

function editItem(){
    const li = event.target
    li.contentEditable = true
    const itemId = li.attributes.getNamedItem("content-id").value
    const content = li.innerHTML
    
    const item = {
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
        const i = new Item(item.data.attributes.id, item.data.attributes.content)
        return i
    })
}

function listDropdown(){
    fetch(`${BASE_URL}/items`)
    .then(resp => resp.json())
    .then(item => {
       const arr = Item.all.map(a => a.parent)
       const items = [...new Set(arr)]    
        for (let i = 0; i < items.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = items[i];    
            dropdownMenu.appendChild(option);
        }
    })
}

