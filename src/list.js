class List {
    constructor (title){
        this.title = title
    }

    renderList(){
        let list = document.getElementById("list-container")
        list.innerHTML += `<h2 id="title"> ${this.title} </h2>`
    }
}