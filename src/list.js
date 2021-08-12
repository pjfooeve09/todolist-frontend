class List {
    constructor (id, title){
        this.id = id
        this.title = title
    }

    renderList(){
        let listContainer = document.getElementById("list-container")
        listContainer.innerHTML += `
        <h2 list-id=${this.id} id="title"> ${this.title}</h2>
        `
    }
    
}

