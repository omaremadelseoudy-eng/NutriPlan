async function getRecipes(mealName) {
  var recipes = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${mealName}&page=1&limit=20`)
  var data = await recipes.json()
  displayMeals(data.results)
}
async function getOneRecipes(mealName) {

  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${mealName}&page=1&limit=1`
  )

  var data = await response.json()

  displayDetails(data.results[0])
}

async function getAllCategories() {
  var recipes = await fetch(`https://nutriplan-api.vercel.app/api/meals/categories`)
  var data = await recipes.json()
  displayCategories(data.results)
}
async function getAllAreas() {
  var recipes = await fetch(`https://nutriplan-api.vercel.app/api/meals/areas`)
  var data = await recipes.json()
  displayArea(data.results)
}

async function getproduct(name) {

    var recipes = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${name}&page=1&limit=24`
    )

    var data = await recipes.json()

    displayProductResults(data.results)
}

async function getNutrition(MealDesc) {

    var ingredients = [];

    for (var i = 0; i < MealDesc.ingredients.length; i++) {

        ingredients.push(
            `${MealDesc.ingredients[i].measure} ${MealDesc.ingredients[i].ingredient}`
        );

    }

    try {

        var response = await fetch(
            "https://nutriplan-api.vercel.app/api/nutrition/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "QsJxYaxoFiyOoLn1mHYtlJaMRzFgGU9pGshXYTj6"
                },

                body: JSON.stringify({
                    recipeName: MealDesc.name,
                    ingredients: ingredients
                })
            }
        );

        var data = await response.json();

        console.log("Status:", response.status);
        console.log("Nutrition Response:", data);

        if (!response.ok) {
            console.log("API Error:", data);
            return;
        }

        displayNutrition(data);

    } catch (error) {

        console.log("Error:", error);

    }
}

async function getProductByBarcode(barcode) {

    var response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`
    );

    var data = await response.json();

    displayProductResults([data.result]);
}

var categoriesGrid = document.querySelector("#categories-grid");

categoriesGrid.addEventListener("click", function (event) {

  var categoryCard = event.target.closest(".category-card");

  if (categoryCard) {

    var categoryName = categoryCard.dataset.category;


    getRecipes(categoryName);
  }

});
getRecipes("chicken")


var RecipeDetails = document.querySelector("#all-recipes-section")
var mealDetails = document.querySelector("#meal-details");

var categeriesPart = document.querySelector("#meal-categories-section")
var SearchPart = document.querySelector("#search-filters-section")

var productsSection = document.querySelector('#products-section')
var productbtn = document.querySelector('#product-scanner-btn')

var FoodLogSection = document.querySelector('#foodlog-section')
var FoodSectionbtn = document.querySelector('#foodbtn')

var mealSection = document.querySelector('#all-recipes-section')
var mealbtn = document.querySelector('#meals-btn')

var searchInput = document.querySelector("#search-input")
 
var gridViewBtn = document.querySelector("#grid-view-btn");
var listViewBtn = document.querySelector("#list-view-btn");
var recipesGrid = document.querySelector("#recipes-grid");


// var barcodeInput = document.querySelector("#barcode-input");

// var barcodelookup = document.querySelector('#lookup-barcode-btn')

RecipeDetails.addEventListener('click', function (event) {
  var card = event.target.closest(".recipe-card");
  if (card) {
    RecipeDetails.classList.add('hidden')
    mealDetails.classList.remove('hidden')
    categeriesPart.classList.add('hidden')
    SearchPart.classList.add('hidden')
    var MealNamee = card.querySelector("h3").textContent.trim();
    getOneRecipes(MealNamee)

  }

})


mealDetails.addEventListener('click', function (event) {

  if (event.target.closest("#back-to-meals-btn")) {
    RecipeDetails.classList.remove('hidden')
    mealDetails.classList.add('hidden')
    categeriesPart.classList.remove('hidden')
    SearchPart.classList.remove('hidden')

  }

})

productbtn.addEventListener('click', function () {

  displaySection(productsSection)
  displayProduct()
})

FoodSectionbtn.addEventListener('click', function () {

  displaySection(FoodLogSection)

  displayFoodLog()
})

mealbtn.addEventListener('click', function () {

  displaySection(mealSection);

  categeriesPart.classList.remove("hidden");
  SearchPart.classList.remove("hidden");

});

searchInput.addEventListener("input", function () {

  var searchValue = searchInput.value.trim();

  if (searchValue !== "") {
    getRecipes(searchValue);
  }

});

// barcodelookup.addEventListener("click", function () {

//     var barcode = barcodeInput.value.trim();

//     if (barcode !== "") {
//         getProductByBarcode(barcode);
//     }

// });

// barcodeInput.addEventListener("keydown", function (event) {

//     if (event.key === "Enter") {

//         var barcode = barcodeInput.value.trim();

//         if (barcode !== "") {
//             getProductByBarcode(barcode);
//         }

//     }

// });

var CATGDesigns = [
  {
    name: "Beef",
    bg: "beef_design",
    iconBg: "beefIcon_bg",
    icon: "fa-drumstick-bite",
    border: "borderRed"
  },

  {
    name: "Chicken",
    bg: "Chickend_design",
    iconBg: "chickenIcon_bg",
    icon: "fa-drumstick-bite",
    border: "borderOrange"
  },

  {
    name: "Dessert",
    bg: "Dessert_design",
    iconBg: "dessertIcon_bg",
    icon: "fa-cake-candles",
    border: "borderPurple"
  },

  {
    name: "Lamb",
    bg: "lambbg",
    iconBg: "lambIcon",
    icon: "fa-drumstick-bite",
    border: "borderOrange"

  },

  {
    name: "Miscellaneous",
    bg: "miscellaneousbg",
    iconBg: "miscellaneousIcon",
    icon: "fa-utensils",
    border: "borderGray"
  },

  {
    name: "Pasta",
    bg: "pastabg",
    iconBg: "pastaIcon",
    icon: "fa-bowl-food",
    border: "borderOrange"

  },

  {
    name: "Pork",
    bg: "porkbg",
    iconBg: "porkIcon",
    icon: "fa-bacon",
    border: "borderRed"

  },

  {
    name: "Seafood",
    bg: "seefoodbg",
    iconBg: "seefoodIcon",
    icon: "fa-fish",
    border: "borderBlue"

  },

  {
    name: "Side",
    bg: "Sidebg",
    iconBg: "SideIcon",
    icon: "fa-bowl-rice",
    border: "greenborder"

  },

  {
    name: "Starter",
    bg: "starterbg",
    iconBg: "starterIcon",
    icon: "fa-utensils",
    border: "greenborder"

  },

  {
    name: "Vegan",
    bg: "veganbg",
    iconBg: "veganIcon",
    icon: "fa-leaf",
    border: "greenborder"

  },

  {
    name: "Vegetarian",
    bg: "vegeterianbg",
    iconBg: "vegeterianIcon",
    icon: "fa-carrot",
    border: "greenborder"

  }
];

function displayMeals(arr) {
  var count = ``
  count += `  Showing ${arr.length} recipes `


  var cartona = ``
  if (arr.length == 0) {
    cartona += `<div class="no-results">
    <div class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>

    <p>No recipes found. Try a different search<br>
       term.
    </p>
     </div>`} else {
    for (var i = 0; i < arr.length; i++) {
      cartona +=
        `
          <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${arr[i].thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${arr[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${arr[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                 ${arr[i].name}

                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${arr[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${arr[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                     ${arr[i].area}
                  </span>
                </div>
              </div>
            </div>

        `
    }
  }


  document.getElementById("recipes-grid").innerHTML = cartona
  document.getElementById("recipes-count").innerHTML = count
}

// getRecipes("beef")

function displayCategories(arr) {
  var cartona = ``

  for (var i = 0; i < 12; i++) {
    cartona +=
      `
         <div
              class="category-card ${CATGDesigns[i].bg} from-emerald-50 to-teal-50 rounded-xl p-3 ${CATGDesigns[i].border}   hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${arr[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br ${CATGDesigns[i].iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${CATGDesigns[i].icon}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${arr[i].name}</h3>
                </div>
              </div>
            </div>
        `
  }
  document.getElementById("categories-grid").innerHTML = cartona

}
getAllCategories()

function displayArea(arr) {

    var cartona = ``

    for (var i = 0; i < 10; i++) {

        cartona += `
            <button
                class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
                data-area="${arr[i].name}"
            >
                ${arr[i].name}
            </button>
        `
    }

    document.getElementById("btnArea").innerHTML = cartona
}
getAllAreas()
var btnArea = document.querySelector("#btnArea")

btnArea.addEventListener("click", function (event) {

    var areaBtn = event.target.closest(".area-btn")

    if (areaBtn) {

        var areaName = areaBtn.dataset.area

        console.log(areaName)

        getRecipes(areaName)
    }

})
function getYoutubeEmbedUrl(youtubeUrl) {
  if (!youtubeUrl) return "";
  var videoId = new URL(youtubeUrl).searchParams.get("v");
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}



function displayDetails(MealDesc) {
  var cartona = ``
  var ingredientsCartona = ``;
  var Instruction = ``;
  //     var youtube="MealDesc.youtube"


  // console.log(MealDesc.youtube);
  for (var i = 0; i < MealDesc.ingredients.length; i++) {

    ingredientsCartona += `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">

                <input
                    type="checkbox"
                    class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                />

                <span class="text-gray-700">

                    <span class="font-medium text-gray-900">
                        ${MealDesc.ingredients[i].measure}
                    </span>

                    ${MealDesc.ingredients[i].ingredient}

                </span>

            </div>
        `;
  }

  for (var i = 0; i < MealDesc.instructions.length; i++) {
    Instruction += `
      
      
       <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${i + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                                     ${MealDesc.instructions[i]}

                    </p>
                  </div>
      
      
      `
  }

  cartona += `
        <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${MealDesc.thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${MealDesc.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${MealDesc.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >Casserole</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${MealDesc.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">Calculating...</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${MealDesc.id}"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${MealDesc.ingredients.length}</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                 
                            ${ingredientsCartona}

              </div>
 </div>
              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                 ${Instruction}

                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                   src="${getYoutubeEmbedUrl(MealDesc.youtube)}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>

                <div id="nutrition-facts-container">

                  <p class="text-sm text-gray-500 mb-4">
                    Per serving
                  </p>

                  <div class="text-center py-8">

                    <i
                      class="fa-solid fa-spinner fa-spin text-emerald-600 text-2xl mb-3"
                    ></i>

                    <p class="text-sm text-gray-500">
                      Calculating nutrition...
                    </p>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
    `

  document.getElementById("meal-details").innerHTML = cartona

  getNutrition(MealDesc);
}

function displayNutrition(data) {


    var nutrition = data.result || data.nutrition || data;

    var calories = nutrition.calories ;
    var protein = nutrition.protein ;
    var carbs = nutrition.carbs ;
    var fat = nutrition.fat ;
    var fiber = nutrition.fiber ;
    var sugar = nutrition.sugar ;

    var vitaminA = nutrition.vitaminA ;
    var vitaminC = nutrition.vitaminC ;
    var calcium = nutrition.calcium ;
    var iron = nutrition.iron ;

    var container = document.getElementById("nutrition-facts-container");

    container.innerHTML = `

        <p class="text-sm text-gray-500 mb-4">
            Per serving
        </p>

        <!-- Calories -->

        <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">

            <p class="text-sm text-gray-600">
                Calories per serving
            </p>

            <p class="text-4xl font-bold text-emerald-600">
                ${Math.round(calories)}
            </p>

            <p class="text-xs text-gray-500 mt-1">
                Total: ${Math.round(calories)} cal
            </p>

        </div>


        <!-- Macronutrients -->

        <div class="space-y-4">

            <!-- Protein -->

            <div>

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>

                        <span class="text-gray-700">
                            Protein
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${protein}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${Math.min(protein / 50 * 100, 100)}%"
                    ></div>

                </div>

            </div>


            <!-- Carbs -->

            <div>

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>

                        <span class="text-gray-700">
                            Carbs
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${carbs}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${Math.min(carbs / 250 * 100, 100)}%"
                    ></div>

                </div>

            </div>


            <!-- Fat -->

            <div>

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>

                        <span class="text-gray-700">
                            Fat
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${fat}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${Math.min(fat / 65 * 100, 100)}%"
                    ></div>

                </div>

            </div>


            <!-- Fiber -->

            <div>

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>

                        <span class="text-gray-700">
                            Fiber
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${fiber}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${Math.min(fiber / 30 * 100, 100)}%"
                    ></div>

                </div>

            </div>


            <!-- Sugar -->

            <div>

                <div class="flex items-center justify-between">

                    <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>

                        <span class="text-gray-700">
                            Sugar
                        </span>

                    </div>

                    <span class="font-bold text-gray-900">
                        ${sugar}g
                    </span>

                </div>

                <div class="w-full bg-gray-100 rounded-full h-2 mt-2">

                    <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${Math.min(sugar / 50 * 100, 100)}%"
                    ></div>

                </div>

            </div>

        </div>


        <!-- Vitamins & Minerals -->

        <div class="mt-6 pt-6 border-t border-gray-100">

            <h3 class="text-sm font-semibold text-gray-900 mb-3">
                Vitamins & Minerals
            </h3>

            <div class="grid grid-cols-2 gap-3 text-sm">

                <div class="flex justify-between">

                    <span class="text-gray-600">
                        Vitamin A
                    </span>

                    <span class="font-medium">
                        ${vitaminA}%
                    </span>

                </div>


                <div class="flex justify-between">

                    <span class="text-gray-600">
                        Vitamin C
                    </span>

                    <span class="font-medium">
                        ${vitaminC}%
                    </span>

                </div>


                <div class="flex justify-between">

                    <span class="text-gray-600">
                        Calcium
                    </span>

                    <span class="font-medium">
                        ${calcium}%
                    </span>

                </div>


                <div class="flex justify-between">

                    <span class="text-gray-600">
                        Iron
                    </span>

                    <span class="font-medium">
                        ${iron}%
                    </span>

                </div>

            </div>

        </div>

    `;
}
function displayFoodLog() {
  var foodCartona = ``
  foodCartona += `
   <div class="max-w-7xl mx-auto">
          <!-- Page Header -->
          <div
            class="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white"
          >
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold mb-2">
                  <i class="fa-solid fa-clipboard-list mr-2"></i>
                  Daily Food Log
                </h2>
                <p class="opacity-90">
                  Track and monitor your daily nutrition intake
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm opacity-80">Today</p>
                <p class="text-xl font-bold" id="foodlog-date">
                  Tuesday, Jan 14
                </p>
              </div>
            </div>
          </div>

          <!-- Today's Summary with Progress -->
          <div
            id="foodlog-today-section"
            class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
              Today's Nutrition
            </h3>

            <!-- Progress Bars -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <!-- Calories Progress -->
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Calories</span
                  >
                  <span class="text-sm text-gray-500">0 / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-emerald-500 h-2.5 rounded-full"
                    style="width: 0%"
                  ></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Protein</span
                  >
                  <span class="text-sm text-gray-500">0 / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-blue-500 h-2.5 rounded-full"
                    style="width: 0%"
                  ></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">0 / 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-amber-500 h-2.5 rounded-full"
                    style="width: 0%"
                  ></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">0 / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-purple-500 h-2.5 rounded-full"
                    style="width: 0%"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Logged Items -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (0)
                </h4>
                <button
                  id="clear-foodlog"
                  class="text-red-500 hover:text-red-600 text-sm font-medium"
                  style="display: none"
                >
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
                </button>
              </div>

              <div id="logged-items-list" class="space-y-2">
                <!-- Empty State -->
                <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Overview -->
          <div class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fa-solid fa-calendar-week text-indigo-500 mr-2"></i>
              Weekly Overview
            </h3>

            <div
              id="weekly-chart"
              class="h-64 bg-gray-50 rounded-xl flex items-center justify-center"
            >
              <!-- Chart placeholder - JS will populate with Plotly -->
              <div class="text-center text-gray-400">
                <i class="fa-solid fa-chart-line text-4xl mb-2"></i>
                <p>Weekly nutrition chart will appear here</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              id="log-meal-quick-btn"
              class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-emerald-500 transition-all text-left flex items-center gap-4"
            >
              <div
                class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center"
              >
                <i class="fa-solid fa-plus text-emerald-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Log a Meal</p>
                <p class="text-sm text-gray-500">Add from recipes</p>
              </div>
            </button>

            <button
              id="scan-product-quick-btn"
              class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-teal-500 transition-all text-left flex items-center gap-4"
            >
              <div
                class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center"
              >
                <i class="fa-solid fa-barcode text-teal-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Scan Product</p>
                <p class="text-sm text-gray-500">Use barcode scanner</p>
              </div>
            </button>

            <button
              class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-purple-500 transition-all text-left flex items-center gap-4"
            >
              <div
                class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center"
              >
                <i class="fa-solid fa-pencil text-purple-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Custom Entry</p>
                <p class="text-sm text-gray-500">Add custom food</p>
              </div>
            </button>
          </div>
        </div>
  `
  document.getElementById("foodlog-section").innerHTML = foodCartona

  document.querySelector('#log-meal-quick-btn').addEventListener('click', function () {
    mealbtn.click()
  })

  document.querySelector('#scan-product-quick-btn').addEventListener('click', function () {
    productbtn.click()
  })
}
function displaySection(section) {

  RecipeDetails.classList.add("hidden");
  mealDetails.classList.add("hidden");
  categeriesPart.classList.add("hidden");
  SearchPart.classList.add("hidden");
  productsSection.classList.add("hidden");
  FoodLogSection.classList.add("hidden");


  // Show the requested section
  section.classList.remove("hidden");
}

function displayProduct() {

    var ProductCartona = `
    
    <div class="max-w-7xl mx-auto">

        <!-- Search Header -->
        <div class="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white">

            <h2 class="text-2xl font-bold mb-2">
                <i class="fa-solid fa-barcode mr-2"></i>
                Product Search & Barcode Scanner
            </h2>

            <p class="opacity-90 mb-4">
                Search for packaged food products to view nutrition information
            </p>

            <!-- Search -->
            <div class="flex gap-3">

                <div class="flex-1 relative">

                    <input
                        type="text"
                        id="product-search-input"
                        placeholder="Search by product name (e.g., Cheerios, Nutella, Coca-Cola...)"
                        class="w-full px-5 py-3.5 pr-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none"
                    />

                    <i class="fa-solid fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                </div>

                <button
                    id="search-product-btn"
                    class="px-6 py-3.5 bg-white text-emerald-700 rounded-xl font-semibold"
                >
                    Search
                </button>

            </div>

            <!-- OR -->
            <div class="flex items-center gap-4 mt-4">

                <div class="flex-1 h-px bg-white/30"></div>

                <span class="text-sm opacity-80">or</span>

                <div class="flex-1 h-px bg-white/30"></div>

            </div>

            <!-- Barcode -->
            <div class="mt-4 flex gap-3">

                <div class="flex-1 relative">

                    <input
                        type="text"
                        id="barcode-input"
                        placeholder="Enter barcode number"
                        class="w-full px-5 py-3.5 pr-12 bg-white/90 text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none"
                    />

                    <i class="fa-solid fa-barcode absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                </div>

                <button
                    id="lookup-barcode-btn"
                    class="px-6 py-3.5 bg-amber-500 text-white rounded-xl font-semibold"
                >
                    <i class="fa-solid fa-search mr-2"></i>
                    Lookup
                </button>

            </div>

        </div>


        <!-- Nutri Score -->
        <div class="flex items-center gap-4 mb-6">

            <span class="text-sm font-medium text-gray-700">
                Filter by Nutri-Score:
            </span>

            <div class="flex gap-2">

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-emerald-600 text-white" data-grade="">
                    All
                </button>

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-green-100 text-green-700" data-grade="a">
                    A
                </button>

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-lime-100 text-lime-700" data-grade="b">
                    B
                </button>

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700" data-grade="c">
                    C
                </button>

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-orange-100 text-orange-700" data-grade="d">
                    D
                </button>

                <button class="nutri-score-filter px-4 py-2 rounded-lg bg-red-100 text-red-700" data-grade="e">
                    E
                </button>

            </div>

        </div>


        <!-- Categories -->

        <div class="mb-6">

            <h3 class="text-lg font-semibold text-gray-900 mb-3">
                Browse by Category
            </h3>

            <div class="flex gap-3 overflow-x-auto pb-2">

                <button class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <i class="fa-solid fa-cookie mr-1.5"></i>
                    Snacks
                </button>

                <button class="product-category-btn px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                    <i class="fa-solid fa-glass-water mr-1.5"></i>
                    Beverages
                </button>

                <button class="product-category-btn px-4 py-2 bg-amber-100 text-amber-700 rounded-lg">
                    <i class="fa-solid fa-bread-slice mr-1.5"></i>
                    Breakfast
                </button>

                <button class="product-category-btn px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
                    <i class="fa-solid fa-ice-cream mr-1.5"></i>
                    Desserts
                </button>

                <button class="product-category-btn px-4 py-2 bg-rose-100 text-rose-700 rounded-lg">
                    <i class="fa-solid fa-cheese mr-1.5"></i>
                    Dairy
                </button>

            </div>

        </div>


        <!-- Results -->

        <div class="mb-6">

            <div class="flex items-center justify-between mb-4">

                <h3 class="text-xl font-bold text-gray-900">
                    Search Results
                </h3>

                <p id="products-count" class="text-sm text-gray-600">
                    Search for products to see results
                </p>

            </div>

            <div
                id="products-grid"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
            
            </div>

        </div>

    </div>
    
    `

    document.getElementById("products-section").innerHTML = ProductCartona


    var productSearch = document.querySelector("#product-search-input")

    productSearch.addEventListener("input", function () {

        var searchproductvalue = productSearch.value.trim()

        if (searchproductvalue !== "") {
            getproduct(searchproductvalue)
        }

    })


    var searchProductBtn = document.querySelector("#search-product-btn")

    searchProductBtn.addEventListener("click", function () {

        var searchproductvalue = productSearch.value.trim()

        if (searchproductvalue !== "") {
            getproduct(searchproductvalue)
        }

    })


    var barcodeInput = document.querySelector("#barcode-input");

var barcodelookup = document.querySelector("#lookup-barcode-btn");


barcodelookup.addEventListener("click", function () {

    var barcode = barcodeInput.value.trim();

    if (barcode !== "") {
        getProductByBarcode(barcode);
    }

});


barcodeInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        var barcode = barcodeInput.value.trim();

        if (barcode !== "") {
            getProductByBarcode(barcode);
        }

    }

});

}

function displayProductResults(arr) {

    var ProductCartona = ``

    if (arr.length == 0) {

        ProductCartona = `
        
            <div class="col-span-full text-center py-12">

                <i class="fa-solid fa-box-open text-5xl text-gray-300 mb-4"></i>

                <p class="text-lg font-semibold text-gray-600">
                    No products found
                </p>

                <p class="text-sm text-gray-400 mt-1">
                    Try searching for another product
                </p>

            </div>

        `

    }
    else {

        for (var i = 0; i < arr.length; i++) {

            ProductCartona += `
            
                <div
                    class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    data-barcode="${arr[i].barcode}"
                >

                    <!-- Image -->

                    <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">

                        <img
                            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            src="${arr[i].image}"
                            alt="${arr[i].name}"
                            loading="lazy"
                        />


                        <div
                            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                        >
                            Nutri-Score ${arr[i].nutritionGrade?.toUpperCase() }
                        </div>


                        <div
                            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                            title="NOVA ${arr[i].novaGroup }"
                        >
                            ${arr[i].novaGroup }
                        </div>

                    </div>



                    <div class="p-4">

                        <!-- Brand -->

                        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                            ${arr[i].brand || "Unknown Brand"}
                        </p>


                        <!-- Name -->

                        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            ${arr[i].name || "Unknown Product"}
                        </h3>



                        <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">

                            <span>
                                <i class="fa-solid fa-barcode mr-1"></i>
                                ${arr[i].barcode}
                            </span>

                            <span>
                                <i class="fa-solid fa-fire mr-1"></i>
                                ${arr[i].nutrients?.calories || 0} kcal
                            </span>

                        </div>


                        <!-- Nutrition -->

                        <div class="grid grid-cols-4 gap-1 text-center">

                            <div class="bg-emerald-50 rounded p-1.5">

                                <p class="text-xs font-bold text-emerald-700">
                                    ${arr[i].nutrients?.protein || 0}g
                                </p>

                                <p class="text-[10px] text-gray-500">
                                    Protein
                                </p>

                            </div>


                            <div class="bg-blue-50 rounded p-1.5">

                                <p class="text-xs font-bold text-blue-700">
                                    ${arr[i].nutrients?.carbs || 0}g
                                </p>

                                <p class="text-[10px] text-gray-500">
                                    Carbs
                                </p>

                            </div>


                            <div class="bg-purple-50 rounded p-1.5">

                                <p class="text-xs font-bold text-purple-700">
                                    ${arr[i].nutrients?.fat || 0}g
                                </p>

                                <p class="text-[10px] text-gray-500">
                                    Fat
                                </p>

                            </div>


                            <div class="bg-orange-50 rounded p-1.5">

                                <p class="text-xs font-bold text-orange-700">
                                    ${arr[i].nutrients?.sugar || 0}g
                                </p>

                                <p class="text-[10px] text-gray-500">
                                    Sugar
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            `

        }

    }


    document.getElementById("products-grid").innerHTML = ProductCartona


    document.getElementById("products-count").innerHTML =
           arr && arr.length > 0
            ? `Showing ${arr.length} products`
            : "No products found"

}


gridViewBtn.addEventListener("click", function () {

    recipesGrid.classList.remove("list-view");

    gridViewBtn.classList.add(
        "bg-white",
        "rounded-md",
        "shadow-sm"
    );

    listViewBtn.classList.remove(
        "bg-white",
        "rounded-md",
        "shadow-sm"
    );

});


listViewBtn.addEventListener("click", function () {

    recipesGrid.classList.add("list-view");

    listViewBtn.classList.add(
        "bg-white",
        "rounded-md",
        "shadow-sm"
    );

    gridViewBtn.classList.remove(
        "bg-white",
        "rounded-md",
        "shadow-sm"
    );

});


