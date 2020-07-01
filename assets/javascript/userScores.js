//View Score Logic
function addHS() {
    
    var highS = JSON.parse(window.localStorage.getItem("highScoreList")) || [];

    highS.forEach(function(score) {
  
      var newLi = document.createElement("li");
      newLi.textContent = score.initials + " - " + score.score;
 
      var createOl = document.getElementById("highScoreList");
      createOl.appendChild(newLi);
    });
  }
  
  function clearHS() {
    window.localStorage.removeItem("highScoreList");
    window.location.reload();
  }
  
  $("#clearHS").on("click", clearHS);
  
  //show added HS when page loads
  addHS();
  