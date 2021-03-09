function Item(id=null, name, description, duedate, checked=false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duedate = duedate;
    this.checked = checked;
}

Vue.component('todoitem', {
    props: ['item', 'index','checked'],
    template: `\
        <li>\
            <p>
                <label for="completed">Completed:</label>
                <input 
                    type="checkbox"
                    name="completed"
                    id="completed"
                    v-model="item.checked"
                    v-on:click="$emit('complete-item', index)"
                >
            </p>
            <h2>{{item.name}}</h2>\
            <p>{{item.description}}</p>\
            <p>{{item.duedate}}</p>\
            <button v-on:click="$emit('toggle-edit-on', index)">Edit</button>\
        </li>\
    `,
})

Vue.component('todoform', {
    template:  `
        <form class="newItemForm" @submit.prevent="addItem">
            <p>
                <label for="name">Name:</label>
                <input v-model="name">
            </p>
            <p>
                <label for="description">Description:</label>
                <input v-model="description">
            </p>
            <p>
                <label for="duedate">Due-Date:</label>
                <input type="date" id="duedate" name="duedate" v-model="duedate">
            </p>
            <button>Add</button>
        </form>
    `,
    data: function() {
        return {
            name: "",
            description: "",
            duedate: "",
        }
    },
    methods: {
        addItem: function(event) {
            let item = new Item(
                0,
                this.name,
                this.description,
                this.duedate,
                false
            );

            db.collection('list').add({
                name: this.name,
                description: this.description,
                duedate: this.duedate,
                completed: false
            })
            .then((doc) => {
                item.id = doc.id;
            });

            console.log(item);
            this.$emit('add-item', item);
            event.target.reset();
        }
    }
})

Vue.component('editform', {
    props: ['item', 'index'],
    template:  `
        <div>
            <h1>Edit</h1>
            <form class="editForm">
                <p>
                    <label for="name">Name:</label>
                    <input v-model="name" :placeholder="item.name">
                </p>
                <p>
                    <label for="description">Description:</label>
                    <input v-model="description" :placeholder="item.description">
                </p>
                <p>
                    <label for="duedate">Due-Date:</label>
                    <input type="date" id="duedate" name="duedate" v-model="duedate">
                </p>
                <button v-on:click="editItem">Submit</button>
            </form>
        </div>
    `,
    data: function() {
        return {
            name: this.item.name,
            description: this.item.description,
            duedate: this.item.duedate,
            itemIndex: this.index
        }
    },
    methods: {
        editItem: function(event) {
            db.collection('list').doc(this.item.id).update({
                name: this.name,
                description: this.description,
                duedate: this.duedate
            })
            let editedItem = new Item(0, this.name, this.description, this.duedate)
            console.log("edited: ", editedItem);
            this.$emit('edit-item', {item: editedItem, index: this.itemIndex});
        }
    }
})

var app = new Vue({
    el: '#todolist',
    data: {
        items: [],
        indexToEdit: null,
        visible: false
    },
    created: function() {
        db.collection('list').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let item = new Item(
                                doc.id,
                                doc.data().name,
                                doc.data().description,
                                doc.data().duedate,
                                doc.data().completed
                );
                this.items.push(item);
            });
        });
        console.log(this.items);
    },
    methods: {
        addItem: function(item) {
            this.items.push(item);
            console.log("hello!");
        },
        toggleEdit: function(index) {
            this.indexToEdit = index;
            this.visible = true;
        },
        editItem: function(editedItem) {
            let oldId = this.items[editedItem.index].id;
            this.items[editedItem.index] = editedItem.item;
            this.items[editedItem.index].id = oldId;
            this.visible = false;
        },
        completeItem: function(index) {
            this.items[index].checked = !this.items[index].checked;
            db.collection('list').doc(this.items[index].id).update({
                completed: this.items[index].checked
            })
        }
    }
})