import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs
} from 'firebase/firestore'



const contentSection = document.querySelector('#content');

let appData = {
  currentShipId: ""
}


const firebaseConfig = {
    apiKey: "AIzaSyBTf36TTI5BW8xpDQD0p58V4V6XZ7ix-R0",
    authDomain: "whstore-1ef88.firebaseapp.com",
    projectId: "whstore-1ef88",
    storageBucket: "whstore-1ef88.appspot.com",
    messagingSenderId: "168242384883",
    appId: "1:168242384883:web:fe9d257a79d71ec41d8c86"
  };

  // init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'AvailableShips');


+
// get collection data
getDocs(colRef).then((snapshot) => {
    let ships = [];
    snapshot.docs.forEach((doc) => {
        ships.push({ ...doc.data(), id: doc.id })
            populateShipData(doc, doc.id)
            
    })
    console.log(ships, "hey")
    console.log(ships);
}).catch(err => {
    console.log(err.message);
});




function populateModularBuyWindow(shipData, shipId){
    const shipName = document.querySelector('#modal-ship-name');
    const price = document.querySelector('#modal-price');
    const highSlot = document.querySelector('#fit-high-slot');
    const medSlot = document.querySelector('#fit-medium-slot');
    const lowSlot = document.querySelector('#fit-low-slot');
    const shipDesc = document.querySelector('#ship-description');
    const shipImg = document.querySelector('#modal-ship-img');
    const rigSlot = document.querySelector('#rigs-slot');
    const shipNameForImport = document.querySelector('#shipname-for-import');

    modal.style.display = 'block'

    shipName.innerText = shipId;
    shipImg.src = `../source/resources/${shipId}.jpg`;
    price.innerText = `${shipData['Price']} ISK`
    
    console.log(shipData, "here")
    appData.currentShipId = shipData['uniqueID']
    displayFittingTextForExport(shipId, shipData, highSlot, medSlot, lowSlot,rigSlot, shipNameForImport)


}

function populateShipData(doc, docId) {
    let newDiv = document.createElement('div');
    let newImage = document.createElement('img');
    let newPName = document.createElement('p');
    newImage.src = `../source/resources/${doc.id}.jpg`;
    newImage.alt = `${doc.id}`;
    newPName.innerText = doc.id
    newPName.classList.add("entry-p")
    newDiv.classList.add("entry");
    newDiv.appendChild(newImage);
    newDiv.appendChild(newPName)
    contentSection.appendChild(newDiv);
    newDiv.addEventListener('click', function(){
        console.log(doc.id);
        populateModularBuyWindow(doc.data(), docId);
    })
}

function displayFittingTextForExport(shipName, shipData, high, med, low, rigs, name){
  resetModalView(name, high, low, med, rigs, shipName)
  

  const buyBtn = document.querySelector('#buy-btn')
  
  buyBtn.onclick = buyClicked;
  
  //Ship name
  name.innerHTML = `[${shipName}, ༺༒༻${shipData['uniqueID']}]`;

  for(let i = 0; i < shipData['Fitting']['high'].length; i++){
    let currentRow = shipData['Fitting']['high'][i];
    console.log(currentRow)
    high.innerHTML += `${currentRow}<br>`
  }

  high.innerHTML += `<br>`

  for(let i = 0; i < shipData['Fitting']['mid'].length; i++){
    let currentRow = shipData['Fitting']['mid'][i];
    med.innerHTML += `${currentRow}<br>`
  }

  med.innerHTML += `<br>`

  for(let i = 0; i < shipData['Fitting']['low'].length; i++) {
    let currentRow = shipData['Fitting']['low'][i];
    low.innerHTML += `${currentRow}<br>`;
  }

  low.innerHTML += `<br>`

  for(let i = 0; i < shipData['Fitting']['rigs'].length; i++) {
    let currentRow = shipData['Fitting']['rigs'][i];
    rigs.innerHTML += `${currentRow}<br>`
  }

  rigs.innerHTML += `<br>`

}

// Modal Section

var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function resetModalView(name, high, low, med, rigs, shipName) {
  name.innerHTML = ""
  high.innerHTML = ""
  low.innerHTML = ""
  med.innerHTML = ""
  rigs.innerHTML = ""
  shipName  = ""
}

function buyClicked() {
  sendOrder(appData.currentShipId)
}

function sendOrder(uniqueID) {
  console.log(uniqueID);
}

