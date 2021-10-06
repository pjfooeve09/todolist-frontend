class Item {
    static all = []
    constructor (id, content, parent){
        this.id = id
        this.content = content
        this.parent = parent 
        Item.all.push(this)
    }
    
    renderItem(){
        const itemContainer = document.getElementById("item-container")
        itemContainer.innerHTML +=
         `<ul id="items">
            <li content-id=${this.id}> ${this.content}</li><span>&nbsp - in &nbsp<span id="parent">${this.parent}</span>
            <button data-id=${this.id} onClick="deleteItem()">Delete Item</button>      
          </ul>
         `
    }
    
}
