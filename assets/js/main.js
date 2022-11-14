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
  return categoriesList(res.data)
}

async function productsByCategory(id){
  let res = await axios(`https://base-challenge.herokuapp.com/api/v1/category/${id}`)
  shop.innerHTML = ""
  return showProducts(res.data)
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
    //Nodo
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
  const categoriesContainer = document.getElementById("categories")
  
  categories.map(categorie => {
    let categoryItem = document.createElement('li');
    categoryItem.className = 'dropdown-item';
    categoryItem.innerHTML = 
    `
    <li>
    <a class='dropdown-item' id='${categorie.id}'>${capitalize(categorie.name)}</a>
    </li>
    `
    //Nodo
    categoriesContainer.append(categoryItem)
  })

  const selectListItem = document.querySelectorAll('#categories li a')
  selectListItem.forEach(item => {
    item.addEventListener('click', (event) => {
      if(event.target.id === item.id) productsByCategory(item.id)
    })
  })
}



async function done(){
  let allProducts = await getAllProducts()
  showProducts(allProducts)
  getAllCategories()
  inputSearch()
}

done()