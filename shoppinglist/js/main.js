let shoppingList = [];
let instances;

class Item {
    constructor(name, aisle, quantity) {
      this.name = name;
      this.aisle = aisle;
      this.quantity = quantity;
    }

    addToList() {
        shoppingList.push(this);
        displayShoppingList();
      }
}

let onOpen = () => {
    let form = document.getElementById("item-form");
    form.reset();
}

let onClose = () => {
    let item = new Item();
    item.name = document.getElementById('name').value;
    item.lastname = document.getElementById('aisle').value;
    item.quantity = document.getElementById('quantity').value;
    item.addToList();
    console.log(item);
}

function displayShoppingList() {
    // Find the class roster unordered list
    let list = document.getElementById("shoppingList");
    // Clear out the existing list.
    list.innerText = "";
    // For each classmate in the roster, add a list item.
    shoppingList.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("item");

        let h1 = document.createElement("h1");
        let name = document.createTextNode(item.name);
        h1.appendChild(name)
        div.appendChild(h1);

        let p_aisle = document.createElement("p");
        let aisle = document.createTextNode(item.aisle);
        p_aisle.appendChild(aisle);
        div.appendChild(p_aisle);

        let p_quantity = document.createElement("p");
        let quantity = document.createTextNode(item.quantity);
        p_quantity.appendChild(quantity);
        div.appendChild(p_quantity);

        let button = document.createElement("button");
        button.innerHTML = "Delete";
        button.addEventListener('click', () => {
            let index = shoppingList.indexOf()
        })
        div.appendChild(button);

        list.appendChild(div);
    });
  }

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.querySelectorAll('.modal');
    var modalOptions = {
        "onOpenStart": onOpen,
        "onCloseStart": onClose,
    }
    instances = M.Modal.init(modal, modalOptions);
  });