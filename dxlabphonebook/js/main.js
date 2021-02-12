let contacts = [];

class Person {
    constructor(firstname, lastname, phone, title, birthdate, email) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.phone = phone,
      this.title = title,
      this.birthdate = birthdate,
      this.email = email
    }
  }

const initializeList = () => {
    fetch('https://uconndxlab.github.io/json-phonebook-example/dxlab-staff.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.contacts.length; i++) {
                const newPerson = new Person(
                    data.contacts[i].firstname,
                    data.contacts[i].lastname,
                    data.contacts[i].phone,
                    data.contacts[i].title,
                    data.contacts[i].birthdate,
                    data.contacts[i].email);
                contacts.push(newPerson);
            }
            contacts.sort(function(a, b){
                if(a.lastname < b.lastname) { return -1; }
                if(a.lastname > b.lastname) { return 1; }
                return 0;
            })
            displayList();
        });
}

const displayList = () => {
    let div_contacts = document.getElementById("contacts");
    for (let i = 0; i < contacts.length; i++) {
        let div = document.createElement("div");
        div.classList.add("contact");

        let h1 = document.createElement("h1");
        let name = document.createTextNode(contacts[i].firstname + " " + contacts[i].lastname);
        h1.appendChild(name)
        div.appendChild(h1);

        let p_phone = document.createElement("p");
        let phone = document.createTextNode(contacts[i].phone);
        p_phone.appendChild(phone);
        div.appendChild(p_phone);

        let p_title = document.createElement("p");
        let title = document.createTextNode(contacts[i].title);
        p_title.appendChild(title);
        div.appendChild(p_title);

        let p_birthdate = document.createElement("p");
        let birthdate = document.createTextNode(contacts[i].birthdate);
        p_birthdate.appendChild(birthdate);
        div.appendChild(p_birthdate);

        let p_email = document.createElement("p");
        let email = document.createTextNode(contacts[i].email);
        p_email.appendChild(email);
        div.appendChild(p_email);

        div_contacts.appendChild(div);
    }
}

initializeList();