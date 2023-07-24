function createPlayer(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const photo = document.getElementById("photo").files[0];
  const team = document.getElementById("team").value;
  const price = document.getElementById("price").value;
  const playingStatus = document.getElementById("playingStatus").value;
  const role = document.getElementById("role").value;

  
  const newPlayer = {
    fullName: fullName,
    team: team,
    price: price,
    playingStatus: playingStatus,
    role: role,
  };

  
  const reader = new FileReader();
  reader.onload = function (event) {
    newPlayer.photo = event.target.result;
    
    addPlayerToLocalStorage(newPlayer);
    
    displayTeamDetails(team); 
  };
  reader.readAsDataURL(photo);
 }


 const createPlayerForm = document.getElementById("createPlayerForm");
 createPlayerForm.addEventListener("submit", createPlayer);

 function getTeamsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("teams")) || [];
 }

 function saveTeamsToLocalStorage(teams) {
  localStorage.setItem("teams", JSON.stringify(teams));
 }

 function addPlayerToLocalStorage(newPlayer) {
  const teams = getTeamsFromLocalStorage();
  const teamIndex = teams.findIndex((team) => team.teamName === newPlayer.team);
  if (teamIndex !== -1) {
    teams[teamIndex].players.push(newPlayer);
    saveTeamsToLocalStorage(teams);
  }
 }


 function searchPlayersByTeamCode() {
  const searchTeamCode = document.getElementById("searchTeamCode").value.toUpperCase();
  const teams = getTeamsFromLocalStorage();
  const searchedPlayers = [];

  
  teams.forEach((team) => {
    if (team.teamName.toUpperCase() === searchTeamCode) {
      searchedPlayers.push(...team.players);
    }
  });

  
  displaySearchedPlayers(searchedPlayers);
 }


 function displaySearchedPlayers(players) {
  const playerGrid = document.querySelector(".player-grid");
  playerGrid.innerHTML = "";

  players.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");

    playerGrid.appendChild(playerCard);
  });
}

 const searchButton = document.getElementById("searchButton");
 searchButton.addEventListener("click", searchPlayersByTeamCode);


 function showAddTeamForm() {
  
 }


 function hideAddTeamForm() {
  
 }
 

 function showAddPlayerForm() {

 }


 function hideAddPlayerForm() {
  
 }


 const addTeamButton = document.getElementById("addTeamButton");
 addTeamButton.addEventListener("click", showAddTeamForm);


 const addPlayerButton = document.getElementById("addPlayerButton");
 addPlayerButton.addEventListener("click", showAddPlayerForm);


 function addTeam() {
  
  const teamName = document.getElementById("teamName").value;

  const newTeam = {
    teamName: teamName,
    players: [] 
  };

  const teams = getTeamsFromLocalStorage();

  teams.push(newTeam);

  saveTeamsToLocalStorage(teams);
  
  hideAddTeamForm();

  displayTeamGrid(teams);
 }


 function addPlayer() {
  
  const teams = getTeamsFromLocalStorage();

  
 const addTeamForm = document.getElementById("addTeamForm");
 addTeamForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addTeam();
 });


 const addPlayerForm = document.getElementById("addPlayerForm");
 addPlayerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addPlayer();
 })
 };
