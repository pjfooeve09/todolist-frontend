class List {
    constructor (id, title){
        this.id = id
        this.title = title
    }

    renderList(){
        const listContainer = document.getElementById("list-container")
        listContainer.innerHTML += `
        <h2 list-id=${this.id} id="title"> ${this.title}</h2>
        `
    }
    
}

