const Load = () =>
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        .then((res) => res.json())
        .then((data) => 
            {
                console.log(data);
                prodCont(data.meals);
            }
        );
    };

const prodCont = (products) =>
    {
        const mulDiv = document.getElementById("productDivId");
        mulDiv.innerHTML = '';
        products.forEach((product) => {
            
            console.log(product);
            const div = document.createElement("div");
            div.classList.add("col-lg-6","boxes");
            div.innerHTML = `
            <img src='${product.strMealThumb}' alt="" width='500' height='500' class='centered-image'/>
            <h1 class='text-center'>${product.strMeal}</h1>
            <h5></h5>
            <button class='btn-centered' onclick='clicked(${product.idMeal})'>Details</button>
            `;
            
            mulDiv.appendChild(div);
            
        });
    };
        
const textExtractor = () =>
{
    const line = document.getElementById('inp1').value;
    console.log(line);
    document.getElementById('inp1').value = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${line}`)
    .then((res) => res.json())
    .then((data) => 
        {
            if(data.meals == null || data.meals.length == 0)
            {
                const notFoundDiv = document.getElementById("productDivId");
                notFoundDiv.innerHTML = `<h2 class='text-center'>Not Found</h2>`;
                document.getElementById("detailsDiv").innerHTML = '';
            }
            else
            {
                console.log(data);
                prodCont(data.meals);
            }
        }
    );
};

Load();


const clicked = (id) => {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const meal = data.meals[0];
        showDetails(meal);
    });
};

const showDetails = (meal) => {
    const detailsDiv = document.getElementById("detailsDiv");
    detailsDiv.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <p>Category: ${meal.strCategory}</p>
      <p>Area: ${meal.strArea}</p>
      <p>Instructions: ${meal.strInstructions}</p>
      <p>Tags: ${meal.strTags}</p>
      <p>YouTube: ${meal.strYoutube}</p>
    `;
  };