import * as bootstrap from 'bootstrap';
import './scss/app.scss';

// Import from "@inrupt/solid-client-authn-browser"
import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch,
    logout
} from "@inrupt/solid-client-authn-browser";

// Import from "@inrupt/solid-client"
import {
    addUrl,
    addStringNoLocale,
    createSolidDataset,
    createThing,
    getPodUrlAll,
    getSolidDataset,
    getThing,
    getThingAll,
    getStringNoLocale,
    removeThing,
    saveSolidDatasetAt,
    setThing
} from "@inrupt/solid-client";

import { VCARD, RDF, AS, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";

// DOM elements that we are gonna use
const main = document.querySelector("main");
const welkom = document.querySelector("#welkom");
const error = document.querySelector("#error");
const errorMessage = document.querySelector("#errorMessage");
const selectPod = document.querySelector("#select-pod");
const todoList = document.querySelector("#todo");
const buttonLogin = document.querySelector("#btnLogin");
const buttonLogout = document.querySelector("#btnLogout");
const buttonUpdate = document.querySelector("#btnUpdate");
const status = document.querySelector("#status");
let list;

//HIDING VARIOUS ELEMENTS
main.classList.add("d-none");
welkom.classList.add("d-none");
buttonUpdate.setAttribute("disabled", "disabled");

// LOGIN
function loginToSelectedIdP() {
    // HERE WE RETURN THE LOGIN FUNCTION 
    
    return login({
        // WE NEED TO FILL IN 3 VARIABLES
    });
}

//AFTER LOGIN -> READ DATA
async function handleRedirectAfterLogin() {
    // CHECK IF WE ARE LOGGED IN
    // IF WE ARE -> READ PROFILE AND GET OUR PODS
    // CHANGE DOM ELEMENTS TO HIDE THEM
}

handleRedirectAfterLogin();

// RETRIEVE POD(S) FROM THE USER
async function getMyPods() {
    // WE RETREIVE ALL THE PODS FROM THE USER WITH getPodUrlAll()

    //FOREACH POD IN mypods
    // CREATE A DOM ELEMENT OPTION AND APPEND IT TO THE selectPod
}

//READ PROFILE FOR NAME
async function readProfile() {
    //GET OUR WEBID FROM THE SESSION, WE'VE DONE THIS BEFORE...


    //CHECK IF THE WEBID IS VALID

    //URL CLEANUP (REMOVE THINGS AFTER URL)
    const profileDocumentUrl = new URL(webID);
    profileDocumentUrl.hash = "";

    let myDataset;

    // TRY CATCH
   
        //IF WE ARE LOGGED IN

            // THIS IS THE AUTHENTICATED WAY
            // ELSE IF NOT AUTHENTICATED AND THE DATA IS PUBLIC

    //GET PROFILE  
    const profile; // CHANGE THIS!


    //GET THE NAME OF THE USER
    const formattedName; // CHANGE THIS!

    // UPDATE HTML FOR NAME
    welkom.classList.remove("d-none");
    welkom.innerHTML += ` <a href="${webID}" target="_blank">${formattedName}</a>`;
}

// CREATE TODO LIST
async function createList() {
    status.textContent = "";
    const SELECTED_POD = document.getElementById("select-pod").value;

    const readingListUrl = `${SELECTED_POD}workshop/ToDo/studyList`;

    let todoItem = todoList.value.split("\n");

    //TRY CATCH --- TO GET THE LIST FROM THE POD
    try {
        // CLEARING THE LIST TO OVERRIDE
    } catch (error) {
         // IF THE LIST DOES NOT EXIST THEN CREATE A NEW ONE
         //CHECK IF ERROR IS TYPEOF STATUSCODE IS NUMBER & 404
        
           //CREATE A NEW SOLIDDATASET
            
           // ELSE SET ERROR
    }

    // ADD ITEMS TO THE LIST
    let i = 0;
    todoItem.forEach((title) => {
        if (title.trim() !== "") {
            //CREATE THING 

            //ADD URL TO ITEM (RDF.type, AS.Article)
        
            //ADD stringNoLocale TO THE ITEM
            
            // SETTHING 
            
            //WE INCREMENT I AT THE END
            i++;
        }
    });

    //TRY TO SAVE THE LIST
    try {
        let savedReadingList = await saveSolidDatasetAt(
            readingListUrl,
            list,
            { fetch: fetch }
        );
        status.textContent = "Lijst bijgewerkt";
    } catch (error) {
        setError(error);
    }
}
// GET THE TODO LIST
async function getTodoList() {
    const SELECTED_POD = document.getElementById("select-pod").value;

    //SELECT VALUE CHECK
    if (SELECTED_POD !== "") {
        const readingListUrl = `${SELECTED_POD}workshop/ToDo/studyList`;
        list = await getSolidDataset(readingListUrl, { fetch: fetch });

        let savedReadingList = await saveSolidDatasetAt(
            readingListUrl,
            list,
            { fetch: fetch }
        );

        savedReadingList = await getSolidDataset(readingListUrl, { fetch: fetch });

        let items = getThingAll(savedReadingList);

        let listcontent = "";
        for (let i = 0; i < items.length; i++) {
            let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
            if (item !== null) {
                listcontent += item + "\n";
            }
        }
        todoList.textContent = listcontent;
    }
}
function setError(message) {
    error.classList.remove("d-none");
    errorMessage.textContent = message;
}

buttonLogin.onclick = function () {
    loginToSelectedIdP();
};
buttonLogout.onclick = function () {
    console.log("logged out...");
    logout();
    window.location.reload();
};

buttonUpdate.onclick = function () {
    createList();
    console.log("Button clicked");
};

selectPod.addEventListener("change", podSelectionHandler);
function podSelectionHandler() {
    if (selectPod.value === "") {
        buttonUpdate.setAttribute("disabled", "disabled");
        todoList.textContent = "";
    } else {
        buttonUpdate.removeAttribute("disabled");
        getTodoList();
    }
}