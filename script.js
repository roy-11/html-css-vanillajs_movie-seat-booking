const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// initialize
setupUI();
let ticketPrice = +movieSelect.value;
updateSelectedCount();

/* Event */
// Seats Click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Movie Select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

/* Function */
// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  if (localStorage.getItem("selectedMovieIndex") === null)
    setMovieData(movieSelect.selectedIndex, movieSelect.value);

  // NodeList to Array & get selected seats Index
  const selectedSeatsIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeatsIndexes", JSON.stringify(selectedSeatsIndexes));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function setupUI() {
  const selectedSeatsIndexes = JSON.parse(localStorage.getItem("selectedSeatsIndexes"));
  if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
    seats.forEach((seat, index) => {
      // seatsIndexes array contains the index → add selected to the seats[index]
      if (selectedSeatsIndexes.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
