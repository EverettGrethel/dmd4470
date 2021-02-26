class Item {
    constructor(id=null, name, aisle, quantity) {
    this.id = id;
      this.name = name;
      this.aisle = aisle;
      this.quantity = quantity;
    }

    addToList() {
        shoppingList.push(this);
        displayShoppingList();
      }
}

let shoppingList = [];
let rawData;
let instances;

db.collection('list').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        rawData = snapshot.docs;
        let item = new Item();
        item.id = doc.id;
        item.name = doc.data().name;
        item.aisle = doc.data().aisle;
        item.quantity = doc.data().quantity;
        shoppingList.push(item);
    });
    displayShoppingList();
});

let onOpen = () => {
    let form = document.getElementById("item-form");
    form.reset();
}

let onClose = () => {
    let item = new Item();
    item.name = document.getElementById('name').value;
    item.aisle = document.getElementById('aisle').value;
    item.quantity = document.getElementById('quantity').value;
    item.addToList();
    db.collection('list').add({
        name: item.name,
        aisle: item.aisle,
        quantity: item.quantity
    })
    console.log(item);
}

function displayShoppingList() {
    console.log("display shopping list!");
    // Find the class roster unordered list
    let list = document.getElementById("shoppingList");
    // Clear out the existing list.
    list.innerText = "";
    // For each classmate in the roster, add a list item.
    shoppingList.forEach(item => {
        let outer_div = document.createElement("div");
        let div = document.createElement("div");
        div.classList.add("item");

        let h2 = document.createElement("h2");
        let name = document.createTextNode(item.name);
        h2.appendChild(name)
        div.appendChild(h2);

        let p_aisle = document.createElement("p");
        let aisle = document.createTextNode("Aisle: " + item.aisle);
        p_aisle.appendChild(aisle);
        div.appendChild(p_aisle);

        let p_quantity = document.createElement("p");
        let quantity = document.createTextNode("Quantity: " + item.quantity);
        p_quantity.appendChild(quantity);
        div.appendChild(p_quantity);

        let button = document.createElement("button");
        button.innerHTML = "Delete";
        button.addEventListener('click', () => {
            let removeIndex = shoppingList.map(function(x) { return x.id; }).indexOf(item.name);
            shoppingList.splice(removeIndex, 1);
            db.collection('list').doc(item.id).delete();
            displayShoppingList();
            console.log(item.id);
        });
        div.appendChild(button);

        let form_checkbox = document.createElement("form");
        form_checkbox.setAttribute("action", "#");
        let checkbox = document.createElement("p");
        form_checkbox.appendChild(checkbox)
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        checkbox.appendChild(label);
        checkbox.appendChild(input);
        outer_div.append(form_checkbox);
        outer_div.append(div);

        list.appendChild(outer_div);
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

//This function checks whether another user has made any changes and updates locally
function checkDatabase() {
    db.collection('list').get().then((snapshot) => {
        shoppingList = [];
        snapshot.docs.forEach((doc, i) => {
            if (snapshot.docs[i].name != rawData[i].name) {
                snapshot.docs.forEach(doc => {
                    let item = new Item();
                    item.id = doc.id;
                    item.name = doc.data().name;
                    item.aisle = doc.data().aisle;
                    item.quantity = doc.data().quantity;
                    shoppingList.push(item);
                });
                displayShoppingList();
            }
        })
    });
}

window.setInterval(checkDatabase, 1000);