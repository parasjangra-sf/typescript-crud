interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

const originalUsers: User[] = [
  {
    firstName: "Rahul",
    middleName: "",
    lastName: "Sharma",
    email: "rahul@gmail.com",
    phone: "9999999999",
    role: "Admin",
    address: "Delhi",
  },
  {
    firstName: "Ankit",
    middleName: "",
    lastName: "Verma",
    email: "ankit@gmail.com",
    phone: "8888888888",
    role: "User",
    address: "Noida",
  },
];

let users: User[] = [];
let editIndex: number | null = null;

const loadBtn = document.getElementById("loadBtn") as HTMLButtonElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const table = document.getElementById("userTable") as HTMLTableElement;
const tbody = table.querySelector("tbody") as HTMLTableSectionElement;

function render() {
  tbody.innerHTML = "";

  users.forEach((u, i) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${u.firstName}</td>
      <td>${u.middleName}</td>
      <td>${u.lastName}</td>
      <td>${u.email}</td>
      <td>${u.phone}</td>
      <td>${u.role}</td>
      <td>${u.address}</td>
      <td class="actions"></td>
    `;

    const actionTd = row.querySelector(".actions") as HTMLTableCellElement;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-blue";

    editBtn.onclick = () => {
      fillForm(u);
      editIndex = i;
      addBtn.textContent = "Update User";
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn btn-gray";

    delBtn.onclick = () => {
      users.splice(i, 1);
      render();
    };

    actionTd.append(editBtn, delBtn);
    tbody.appendChild(row);
  });
}

function fillForm(u: User) {
  (document.getElementById("first") as HTMLInputElement).value = u.firstName;
  (document.getElementById("middle") as HTMLInputElement).value = u.middleName;
  (document.getElementById("last") as HTMLInputElement).value = u.lastName;
  (document.getElementById("email") as HTMLInputElement).value = u.email;
  (document.getElementById("phone") as HTMLInputElement).value = u.phone;
  (document.getElementById("role") as HTMLSelectElement).value = u.role;
  (document.getElementById("address") as HTMLInputElement).value = u.address;
}

function clearForm() {
  ["first", "middle", "last", "email", "phone", "address"].forEach(id => {
    (document.getElementById(id) as HTMLInputElement).value = "";
  });
  (document.getElementById("role") as HTMLSelectElement).value = "User";
}

loadBtn.onclick = () => {
  users = JSON.parse(JSON.stringify(originalUsers));
  table.style.display = "table";
  loadBtn.textContent = "Refresh Data";
  render();
};

addBtn.onclick = () => {
  const user: User = {
    firstName: (document.getElementById("first") as HTMLInputElement).value,
    middleName: (document.getElementById("middle") as HTMLInputElement).value,
    lastName: (document.getElementById("last") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    role: (document.getElementById("role") as HTMLSelectElement).value,
    address: (document.getElementById("address") as HTMLInputElement).value,
  };

  if (editIndex === null) {
    users.push(user);
  } else {
    users[editIndex] = user;
    editIndex = null;
    addBtn.textContent = "Add User";
  }

  clearForm();
  render();
};
