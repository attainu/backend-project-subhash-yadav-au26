if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  
  function ready() {
    const removeCartItemButtons = document.getElementsByClassName("btn-danger");
  //   console.log(removeCartItemButtons)
  
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i];
      // console.log(button)
      button.addEventListener("click",removeCartItem);
    }
  
    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
      //  console.log(quantityInputs)
    for (var i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i];
      // console.log(input)
      input.addEventListener('change',quantityChange)
      // input.addEventListener("change",(e)=>{
      //     console.log(e.target.value)
      // });
    }
  
  
  
  
    (function retriveItem(){
      const productItem = document.getElementsByClassName('cartItem')[0]
      let cartRow = document.createElement('tr')
      cartRow.classList.add('border-0')
      cartRow.classList.add('cart-row')
    
      let Item = localStorage.getItem('product')
      Item = JSON.parse(Item)
     
      if(Item.length>0){
        for (var i=0 ; i<Item.length; i++){
          console.log(Item[i])
          let itemContent=`
          
          <td>
            <img
              src=${Item[i].image}
              class="rounded"
              alt="..."
              style="width: 90px; height: 80px"
            />
          </td>
          <td>
            <div class="pos">${Item[i].title}</div>
          </td>
          <td class="price">
            <div class="pos">${Item[i].price}</div>
          </td>
          <td class="quantity">
            <div class="pos">
             
              <input
                type="number"
                value="1"
                style="width: 45px; text-align: center"
                class="cart-quantity-input"
              />
              
            </div>
          </td>
          <td>
            <div class="pos">
              <button type="button" class="btn btn-danger">remove</button>
            </div>
          </td>
      
          `
          cartRow.innerHTML=itemContent
          productItem.append(cartRow)
          cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
      
          cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
          console.log(i)
        }
        updateCartTotal()
        console.log(productItem)
  
      }
    
      
    })()
  
  
  
    document.getElementsByClassName('purchasebtn')[0].addEventListener('click',purchase)
    
  }
  
  function purchase(){
    const cartItem = document.getElementsByClassName('cartItem')[0]
    while (cartItem.hasChildNodes()){
      cartItem.removeChild(cartItem.firstChild)
    }
  
    alert('thank you for buys')
    updateCartTotal()
    localStorage.clear()
  }
  
  
  
  
  
  
  
  
  
  
  //remove item
  function removeCartItem(event){
      const buttonClick = event.target;
      buttonClick.parentElement.parentElement.parentElement.remove();
      //update total
      updateCartTotal();
  }
  
  // quantity change 
  function quantityChange(event){
      const Input = event.target
      console.log(Input)
      if(isNaN(Input.value) || Input.value <=0){
          Input.value=1
      }
      //update total
      updateCartTotal()
  }
  
  
  // update total
  function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName("cartItem")[0];
    const cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      // console.log(cartRow)
      // price
      const price = cartRow.getElementsByClassName("price")[0].children[0];
      // console.log(price.innerText);
      //quantity
      const quantity = cartRow.getElementsByClassName("cart-quantity-input")[0];
      // console.log(quantity.value);
      total += parseFloat(price.innerText) * parseInt(quantity.value);
    }
    total= Math.round(total*100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText = total;
  //   console.log(total);
  }
  
  
  
  