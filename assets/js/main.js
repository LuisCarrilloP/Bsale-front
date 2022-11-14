//GET DATA

async function getAllProducts(){
  let res = await axios.get("https://base-challenge.herokuapp.com/api/v1/products")
    return res.data
}

async function searchProductByName(name){
  let res = await axios.get(`https://base-challenge.herokuapp.com/api/v1/products/${name}`)

  return res.data;
} 

async function getAllCategories(){
  let res = await axios("https://base-challenge.herokuapp.com/api/v1/category")
  return console.log(res.data);
}

async function productsByCategory(id){
  let res = await axios(`https://base-challenge.herokuapp.com/api/v1/category/${id}`)
  return console.log(res.data);
}


//HTML

function capitalize(str){
  const str1 = str.toLowerCase()
  const arr = str1.split(" ")
  for(let i=0; i < arr.length; i++){
    arr[i] = arr[i].charAt().toUpperCase() + arr[i].slice(1)
  }
  const str2 = arr.join(" ")
  return str2
}

const shop = document.querySelector(".shop")
const searchInput = document.getElementById("input")


async function showProducts(products){
  products.map((product) => {
    let show = document.createElement('div')
    show.className = "productsContainer"
    show.innerHTML = 
    `
    <div class="product-card">
      <img src=${product.url_image ? product.url_image : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt="Product image">
      <span class="span"></span>
      <div class="product-card__info">
        <p>${capitalize(product.name)}</p>
        <p>$${product.price}.00</p>
      </div>
    </div>
    `
    shop.append(show)
  })
}

async function inputSearch(){
  searchInput.addEventListener('keyup', async(e) => {
    let searchProducts = await searchProductByName(e.target.value)

    if(searchProducts !== undefined){
      shop.innerHTML = ""
      return showProducts(searchProducts)
    }
  })
}

async function categoriesList(categories){
  const categoriesContainer = document.getElementById("category")
  
  categories.map(categorie => {
    let categoryElement = document.createElement("li")
    categoryElement.className = "dropdown-item"
    categoryElement.innerHTML =
    `
    <li>
      <a class="dropdown-item" id='${categorie.id}'>${capitalize(categorie.name)}</a>
    </li>
    `
    categoriesContainer.append(categoryElement)
  })
}



async function done(){
  let allProducts = await getAllProducts()
  
  showProducts(allProducts)
  getAllCategories()
  inputSearch()
}

done()