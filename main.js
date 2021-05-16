
let foodToSearch = null;
const YOUR_APP_ID = "26c94292"
const YOUR_APP_KEY = "6c6c9e9ed06cd86bdb5f864d5124f2db"

function handleRecipeClick() {
  fetchRecipe(foodToSearch).then(getData);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  const response = await fetch (`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
  let data = await response.json();
  console.log (data);
  return data;
}

function getData(data) {
  //after running the fetchRecipe, we want it to run this function(data) with the below params so the user can navigate easily and retrieve the desired info from the API
  const recipeResults = document.getElementById("api-results");
  //by using .count, it shows you the results found related to your query request on the input (it's on the API documentation)
  recipeResults.innerHTML = data.count;
  //hide the recipe results
  document.getElementById("api-results").style.visibility = "hidden";
  
  let hits = data.hits;
  const recipe = document.getElementById("cards-section");
  recipe.innerHTML = ""; 

  for (let i = 0; i < 6; i++) {
    // creating divs where our recipe content is going to be
    const div = document.createElement("div");
    recipe.appendChild(div);
    //  creating img
    const image = document.createElement("img");
    image.src = hits[i].recipe.image;
    const divImg = document.createElement("div");
    divImg.appendChild(image);
    // creating href
    const a = document.createElement("a");
    a.href = hits[i].recipe.url;
    a.text = hits[i].recipe.label;
    divImg.appendChild(a);
    // getting ingredients from API by creating an ul
     const ul = document.createElement("ul");    
    // when I tried to do it with .ingredients on it's own didn't work, I dont know why. 
     let ingredientLines = hits[i].recipe.ingredientLines;
    // retriving all the ingredients depending on the lenght of the array 
     for (let i = 0; i < ingredientLines.length; i++) {
       const li = document.createElement("li");
       li.innerHTML = ingredientLines[i];
       ul.appendChild(li);
     };

    //appending elements
    const info = document.createElement("div");
    info.appendChild(ul); 
    recipe.appendChild(divImg);
    recipe.appendChild(info);  

    // add some classes to elements
    image.classList.add("card-img");
    a.classList.add ("r-link");
    recipe.classList.add("recipe-section");
    ul.classList.add("list-ingredient");

    
  };

};










/*  const apiData = () => {
//   fetch(API_URL)
//     .then((res) => {
//       return res.json()
//   }).then((data) => {
//       fetchedData(data)
//   })
// }

// fetchedData = (apiData) => {
// console.log(apiData)
} */ 


 
