let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

document.getElementById("ticketForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let ticket = {
    id: "TCK-" + Math.floor(Math.random() * 10000),
    name: name,
    email: email,
    message: message,
    status: "Pending"
  };

  tickets.push(ticket);

  localStorage.setItem("tickets", JSON.stringify(tickets));

  alert("Ticket received! ID: " + ticket.id);

  displayTickets();

  this.reset();
});

function updateStatus(id, newStatus) {
  tickets = tickets.map(ticket => {
    if (ticket.id === id) {
      ticket.status = newStatus;
    }
    return ticket;
  });

  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

function deleteTicket(id) {
  tickets = tickets.filter(ticket => ticket.id !== id);

  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

function displayTickets() {
  let container = document.getElementById("ticketList");

  container.innerHTML = "";

  tickets.forEach(ticket => {
    container.innerHTML += `
      <div class="ticket">
        <h3>${ticket.id}</h3>
        <p><strong>Name:</strong> ${ticket.name}</p>
        <p><strong>Email:</strong> ${ticket.email}</p>
        <p><strong>Message:</strong> ${ticket.message}</p>

        <p>
          <strong>Status:</strong>
          <select onchange="updateStatus('${ticket.id}', this.value)">
            <option value="Pending" ${ticket.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Resolved" ${ticket.status === "Resolved" ? "selected" : ""}>Resolved</option>
          </select>
        </p>

        <button onclick="deleteTicket('${ticket.id}')">
          Delete Ticket
        </button>
      </div>
    `;
  });
}

displayTickets();