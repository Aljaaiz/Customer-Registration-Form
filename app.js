// Customer Consructor

function Customer(firstName, lastName, address, country, state, phone) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.country = country;
  this.state = state;
  this.phone = phone;
}

function UI() {}

// Add customer to the Ui
UI.prototype.addCustomer = function(customer) {
  const customerList = document.getElementById("customer-list");

  //create  TR Element
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${customer.firstName}</td>
    <td>${customer.lastName}</td>
    <td>${customer.address}</td>
    <td>${customer.country}</td>
    <td>${customer.state}</td>
    <td>${customer.phone}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  // Add row to the Body
  customerList.appendChild(row);
};

// CLear Fields
UI.prototype.clearFields = function() {
  document.getElementById("lastName").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("phone").value = "";
};

// Show Error Msg
UI.prototype.alertMsg = function(message, className) {
  // Create Div
  const div = document.createElement("div");
  //Add Class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  //Get Parent
  const customerCont = document.getElementById("customer-box");
  // get Form
  const form = document.getElementById("customer-form");
  // Insert Before
  customerCont.insertBefore(div, form);
  // Set Time Out
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};

// Remove customer
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Add event Listener
document
  .getElementById("customer-form")
  .addEventListener("submit", function(e) {
    const firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      address = document.getElementById("address").value,
      country = document.getElementById("country").value,
      state = document.getElementById("state").value,
      phone = document.getElementById("phone").value;

    //Instanciating of Customer
    const customer = new Customer(
      firstName,
      lastName,
      address,
      country,
      state,
      phone
    );

    //Instanciating of Ui
    const ui = new UI();

    if (
      firstName === "" ||
      lastName === "" ||
      address === " " ||
      country === "" ||
      state === "" ||
      phone === ""
    ) {
      ui.alertMsg("Your fields are empty", "error");
    } else {
      // Add Customer
      ui.addCustomer(customer);

      // Alert Msg
      ui.alertMsg("Customer Successfully Added", "success");

      // Clear Fileds
      ui.clearFields();
    }

    // console.log(customer);
    e.preventDefault();
  });

// Remove Customer from the List
document.getElementById("customer-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.alertMsg("Customer Removed", "success");

  e.preventDefault();
});
