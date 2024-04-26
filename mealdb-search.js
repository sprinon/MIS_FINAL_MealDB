function connect() {
   var userText = document.getElementById('user-input').value;
   var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userText}`;

   document.getElementById('user-input').value = "";
   document.getElementById('container').textContent = "";

   fetch(url)
       .then(res => res.json())
       .then(data => show(data.meals));
}

function show(items) {
   var oldContent = document.getElementById('container');

   // If more than 5 results are found, show only the first 5 meals
   var maxToShow = Math.min(items.length, 5);

   for (var i = 0; i < maxToShow; i++) {
       var newDiv = document.createElement('div');
       newDiv.innerHTML = `<p>Meal ID: ${items[i].idMeal}</p>
                       <p>${items[i].strMeal}</p>
                       <img src="${items[i].strMealThumb}" /><br/><br/>
                       <p>${items[i].strInstructions}</p>`;
       newDiv.classList.add('each-meal');
       oldContent.appendChild(newDiv);
   }

   // If there are more than 5 results, add "SHOW ALL" button
   if (items.length > 5) {
       var showAllButton = document.createElement('button');
       showAllButton.textContent = 'SHOW ALL';
       showAllButton.id = 'show-all-button'; // Add an id for styling
       showAllButton.onclick = function() {
           // Remove the "SHOW ALL" button
           oldContent.removeChild(showAllButton);

           // Show all the meals
           for (var i = 5; i < items.length; i++) {
               var newDiv = document.createElement('div');
               newDiv.innerHTML = `<p>Meal ID: ${items[i].idMeal}</p>
                                   <p>${items[i].strMeal}</p>
                                   <img src="${items[i].strMealThumb}" /><br/><br/>
                                   <p>${items[i].strInstructions}</p>`;
               newDiv.classList.add('each-meal');
               oldContent.appendChild(newDiv);
           }
       };
       oldContent.appendChild(showAllButton);
   }
}
