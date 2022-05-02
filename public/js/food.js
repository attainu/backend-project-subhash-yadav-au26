
function increaseProduct(){
    let cartProduct = Number(document.getElementById('cartnum').innerText)

    document.getElementById('cartnum').innerText=cartProduct+1

}





const addToCartButton = document.getElementsByClassName('addbtn')
console.log(addToCartButton)

for (var i=0; i<addToCartButton.length; i++){
    const productBtn = addToCartButton[i]
    productBtn.addEventListener('click',addToCart)
}


let listProduct=[]
function addToCart(event){
    const button = event.target
    const cartItem = button.parentElement.parentElement
    const title = cartItem.getElementsByClassName('shop-item-title')[0].innerText
    const price = cartItem.getElementsByClassName("shop-item-price")[0].innerText
    const image = cartItem.getElementsByClassName('shop-item-img')[0].src
    // console.log(title,price,image)

    let product ={
        image:image,
        title:title,
        price:price
    }
    listProduct.push(product)
    console.log(listProduct)

    localStorage.setItem('product',JSON.stringify(listProduct))


    increaseProduct()

}