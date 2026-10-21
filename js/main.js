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

// Hämta recept från API:et
async function getRecipe(searchText) {
    try {
        const response = await fetch("https://dummyjson.com/recipes/search?q=" + encodeURIComponent(searchText));

        //Kontrollera att API-anropet funkar
        if (!response.ok) {
            throw new Error("Kunde inte hämta recept");
        }

        // API från JSON
        const data = await response.json();

        // Testar om data hämtas
        console.log(data);
        // Visa det första receptet på listan
        if (data.recipes.length > 0) {
            displayRecipe(data.recipes[0]);
        }

    } catch (error) {
        console.log(`Det blev ett fel: ${error.message}`);
        messageEl.textContent = "Kunde inte hämta recept. Försök igen senare";

    }
}

// Skapar och visar receptet
function displayRecipe(recipe) {
    // Rensa tidigare recept
    recipeEl.innerHTML = "";

    // Skapa ett element för receptet
    const article = document.createElement("article");

    // Skapa ett element för receptets namn
    const recipeName = document.createElement("h3");
    recipeName.textContent = recipe.name;

    // Lägger till receptnamnet
    article.appendChild(recipeName);

    //Bild för receptet
    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;
    article.appendChild(recipeImage);

    // Skapa ett div-element för receptinfo
    const recipeInfo = document.createElement("div");
    recipeInfo.className = "recipe-info";

    // Visa antal portioner
    const servingsEl = document.createElement("p");
    servingsEl.textContent = `Servings: ${recipe.servings}`;

    // Visa förberedelsetid
    const prepTimeEl = document.createElement("p");
    prepTimeEl.textContent = `Prep time: ${recipe.prepTimeMinutes} minutes`;

    // Visa tillagningstid
    const cookingTimeEl = document.createElement("p");
    cookingTimeEl.textContent = `Cooking time: ${recipe.cookTimeMinutes} minutes`;

    // Visa svårighetsgrad
    const difficultyEl = document.createElement("p");
    difficultyEl.textContent = `Difficulty: ${recipe.difficulty}`;

     // Lägg till informationen i receptet
    recipeInfo.appendChild(servingsEl);
    recipeInfo.appendChild(prepTimeEl);
    recipeInfo.appendChild(cookingTimeEl);
    recipeInfo.appendChild(difficultyEl);

    article.appendChild(recipeInfo);

    // Visa receptet
    recipeEl.appendChild(article);
}

// Hanterar formuläret när användaren söker
function onSubmit(event) {
    event.preventDefault();

    // Läs in sökfrasen från formuläret
    const searchText = searchInput.value.trim();

    // Validera formuläret
    const validate = validateForm(searchText);

    // Avbryt om sökfältet är tomt
    if (validate === false) {
        return;
    }

    // Rensa tidigare meddelanden och hämta recept
    messageEl.textContent = "";
    getRecipe(searchText);

}

// Eventlyssnare för formuläret
form.addEventListener("submit", onSubmit);
