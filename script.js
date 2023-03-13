window.addEventListener('resize', function() {
  if (window.innerWidth <= 1022) {
    document.getElementById('message').style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('message').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
// Begining Of Div1 JS
function addNewToDo() {
    // Check the number of existing ToDoDivs and disable the Add button if it exceeds 10
    var toDoDivs = document.getElementsByClassName("ToDoDiv");
    if (toDoDivs.length >= 10) {
      document.getElementById("ButAdd").disabled = true;
      return;
    }

    // Create a new div element
    var newToDoDiv = document.createElement("div");
    newToDoDiv.className = "ToDoDiv";

    // Create a checkbox element and add it to the new div
    var newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.className = "CheckBoxX";
    newCheckBox.addEventListener("change", function() {
      var textInput = newToDoDiv.querySelector(".Name");
      if (newCheckBox.checked) {
        textInput.style.textDecoration = "line-through";
      } else {
        textInput.style.textDecoration = "none";
      }
    });
    newToDoDiv.appendChild(newCheckBox);

    // Create a remove button element and add it to the new div
    var newRemoveButton = document.createElement("button");
    newRemoveButton.className = "RemoveBut";
    newRemoveButton.textContent = "حذف";
    newRemoveButton.addEventListener("click", function() {
      // Remove the ToDoDiv and enable the Add button
      newToDoDiv.remove();
      document.getElementById("ButAdd").disabled = false;
    });
    newToDoDiv.appendChild(newRemoveButton);

    // Create a text input element and add it to the new div
    var newTextInput = document.createElement("input");
    newTextInput.type = "text";
    newTextInput.className = "Name";
    newToDoDiv.appendChild(newTextInput);

    // Add the new div to the parent container
    var toDoListDiv = document.getElementById("to-do-list");
    toDoListDiv.appendChild(newToDoDiv);
  }

  function removeToDo() {
    // Remove the ToDoDiv and enable the Add button
    var toDoDiv = this.parentNode.parentNode;
    toDoDiv.remove();
    document.getElementById("ButAdd").disabled = false;
  }

  function strikeThrough(checkbox) {
    var textInput = checkbox.parentNode.parentNode.querySelector(".Name");
    if (checkbox.checked) {
      textInput.style.textDecoration = "line-through";
    } else {
      textInput.style.textDecoration = "none";
    }
  }

  document.getElementById("ButAdd").addEventListener("click", addNewToDo);
  document.getElementById("removeBut").addEventListener("click", removeToDo);
//End Of Div1 JS

//Begining Of Div2 JS
// set initial time to 25 minutes
let time = 25 * 60;

// set initial state of buttons
let startDisabled = false;
let stopDisabled = true;

// initialize timer variable
let timer;

// update the timer display
function updateTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const displayTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.getElementById('Timer').textContent = displayTime;
}

// add event listener to increase button
document.getElementById('increase').addEventListener('click', () => {
  if (!startDisabled && time < 120 * 60) {
    time += 5 * 60;
    updateTime();
  }
});

// add event listener to decrease button
document.getElementById('decrease').addEventListener('click', () => {
  if (!startDisabled && time > 5 * 60) {
    time -= 5 * 60;
    updateTime();
  }
});

// add event listener to start button
document.getElementById('start').addEventListener('click', () => {
  // start the timer
  startDisabled = true;
  stopDisabled = false;
  document.getElementById('start').disabled = true;
  document.getElementById('stop').disabled = false;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateTime();
    } else {
      clearInterval(timer);
      startDisabled = false;
      stopDisabled = true;
      document.getElementById('start').disabled = false;
      document.getElementById('stop').disabled = true;
    }
  }, 1000);
});

// add event listener to stop button
document.getElementById('stop').addEventListener('click', () => {
  // stop the timer
  clearInterval(timer);
  time = 25 * 60;
  updateTime();
  startDisabled = false;
  stopDisabled = true;
  document.getElementById('start').disabled = false;
  document.getElementById('stop').disabled = true;
});

// div2 JS End

//Begining Of Div3 JS
const playButton = document.getElementById("Play");
const mediaLinkInput = document.getElementById("MediaLink");
const youtubeFrame = document.getElementById("youtframe");

playButton.addEventListener("click", () => {
  const youtubeLink = mediaLinkInput.value;
  const videoId = getYoutubeVideoId(youtubeLink);
  const youtubeEmbedLink = `https://www.youtube.com/embed/${videoId}`;
  youtubeFrame.src = youtubeEmbedLink;
});

function getYoutubeVideoId(link) {
  // Function to get the video ID from a YouTube link
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = link.match(regex);
  return match[1];
}