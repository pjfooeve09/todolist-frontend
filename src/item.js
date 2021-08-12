
class Item {
    constructor (id, content, parent){
        this.id = id
        this.content = content
        this.parent = parent
    }
    
    renderItem(){
        let itemContainer = document.getElementById("item-container")
        itemContainer.innerHTML +=
         `<ul id="items">
            <li content-id=${this.id}> ${this.content}</li>&nbsp - in &nbsp<span id="parent">${this.parent}</span>
            <button id="item-delete-button" data-id=${this.id} onClick="deleteItem()">Delete Item</button> 
          </ul>
         `
    }
    
}
