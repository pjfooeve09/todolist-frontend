class Item {
    constructor (id, content){
        this.id = id
        this.content = content
    }

    renderItem(){
        let item = document.getElementById("item-container")
        item.innerHTML +=
         `<ul id="items">
            <li content-id=${this.id}>${this.content}</li>
            <button id="item-delete-button" data-id=${this.id} onClick="deleteItem()">Delete Item</button>
          </ul>
         `
    }
}