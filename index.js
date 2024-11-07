import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-el")
const orderEl = document.getElementById("order-el")
const totalPriceEl = document.getElementById("total-price-el")
const completeOrderBtn = document.getElementById("complete-order-btn")
const paymentForm = document.getElementById("payment-form")
const orderArray = []

renderMenu()

menuEl.addEventListener("click", function(e){
    const targetEl = e.target
    if (targetEl.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.dataset.id)
    }
    else if (targetEl.parentElement.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.parentElement.dataset.id)
    }
    renderOrder()
})

orderEl.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-item-btn")){
        orderArray.splice(e.target.dataset.index, 1)
        renderOrder()
    }
})

completeOrderBtn.addEventListener("click", () => toggleHidden(paymentForm))

function addItemToOrder(itemId){
    if (orderArray.length === 0){
        toggleHidden(orderEl.parentElement)
    }
    orderArray.push(menuArray[itemId])
}

function renderOrder(){
    if(orderArray.length > 0){
        orderEl.innerHTML = orderArray.map(function(currentItem, index){
            const {name, price} = currentItem
            return `
                <div class="order-line">
                    <h3>${name}</h3>
                    <button class="remove-item-btn" data-index="${index}">remove</button>
                    <p class="item-price align-right">$${price}</p>
                </div>
            `
        }).join("")
        getTotalPrice()
    } else{
        toggleHidden(orderEl.parentElement)
    }
}

function getTotalPrice(){
    totalPriceEl.innerText = `$${
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