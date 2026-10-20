"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Tove Hansson
 */

// Hämta element från DOM
const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const messageEl = document.querySelector("#message");
const recipeEl = document.querySelector("#recipe");

/**
 * Validerar formulärets inmatning
 * @returns {boolean} 
 */

function validateForm(searchText) {
    if (searchText === "") {
        errorEl.textContent = "Du måste ange en sökfras";
        return false;
    }

    errorEl.textContent = "";
    return true;
}

// Hanterar formuläret när användaren söker
function onSubmit(event) {
    event.preventDefault();

    // Läs in sökfrasen från formuläret
    const searchText = searchInput.value.trim();

    // Validera formuläret
    const validate = validateForm(searchText);

    // Om formuläret är giltigt, hämta receptet
    if (validate === false) {
        return;
    }

    // Testar om sökfrasen hämtas
    console.log(searchText);

}

// Eventlyssnare för formuläret
form.addEventListener("submit", onSubmit);
