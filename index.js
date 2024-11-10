import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-el")
const orderEl = document.getElementById("order-el")
const paymentModal = document.getElementById("payment-modal")
const closeBtn = document.getElementById("close-btn")
const paymentForm = document.getElementById("payment-form")
const formInputs = paymentForm.getElementsByTagName("input")
let paymentFormData
let orderArray = []
let hasPaid = false
renderMenu()

menuEl.addEventListener("click", function(e){
    const targetEl = e.target
    if (targetEl.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.dataset.id)
        hasPaid = false
    }
    else if (targetEl.parentElement.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.parentElement.dataset.id)
        hasPaid = false
    }
})

orderEl.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-item-btn")){
        orderArray.splice(e.target.dataset.index, 1)
        renderOrder()
    }
})

closeBtn.addEventListener("click", () => {
    toggleHidden(paymentModal)
    clearFormInputs(formInputs)
})

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    paymentFormData = new FormData(paymentForm)
    hasPaid = true
    clearFormInputs(formInputs)
    orderArray = []
    renderOrder()
    toggleHidden(paymentModal)
})

function clearFormInputs(inputs){
    for(let input of inputs){
        input.value = ""
    }
}

function addItemToOrder(itemId){
    if (orderEl.classList.contains("hidden")){
        toggleHidden(orderEl)
    }
    orderArray.push(menuArray[itemId])
    renderOrder()
}

function renderOrder(){
    if(orderArray.length > 0){
        let tempHTML = `<h2>Your Order</h2>` +
            orderArray.map(function(currentItem, index){
                const {name, price} = currentItem
                return `
                    <div class="order-line">
                        <h3>${name}</h3>
                        <button class="remove-item-btn" data-index="${index}">remove</button>
                        <p class="item-price align-right">$${price}</p>
                    </div>
                `
            }).join("") +
            `<hr>
                <div class="order-line">
                    <h3>Total price:</h3>
                    <p id="total-price-el" class="item-price align-right">${getTotalPrice()}</p>
                </div>
                <button id="complete-order-btn" class="color-btn">Complete order</button>`
        orderEl.innerHTML = tempHTML
        const completeOrderBtn = document.getElementById("complete-order-btn")
        completeOrderBtn.addEventListener("click", () => toggleHidden(paymentModal))
    }
    else if(hasPaid){
        orderEl.innerHTML = `<div class="confirm-message">
                <p>Thanks, ${paymentFormData.get("customerName")}! Your order is on its way!</p>
            </div>`
    }
    else{
        toggleHidden(orderEl)
    }
}

function getTotalPrice(){
    return `$${
        orderArray.reduce((totalPrice, currentItem) => totalPrice + currentItem.price, 0)
    }`
}

function renderMenu(){
    menuEl.innerHTML = menuArray.reduce(function(innerHTML, currentItem){
        const {name, ingredients, id, price, emoji} = currentItem
        return innerHTML + `<div class="menu-item">
                    <p class="item-graphic">${emoji}</p>
                    <div>
                        <h3>${name}</h3>
                        <p class="item-ingredients">${ingredients.join(", ")}</p>
                        <p class="item-price">$${price}</p>
                    </div>
                    <button class="add-item-btn align-right" data-id="${id}">
                        <i class="fa-regular fa-plus"></i>
                    </button>
                </div>`
    },`<h2>Jimmy's Menu</h2>`)
}

function toggleHidden(element){
    element.classList.toggle("hidden")
}