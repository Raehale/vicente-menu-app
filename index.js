import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-el")
const orderEl = document.getElementById("order-el")
const totalPriceEl = document.getElementById("total-price-el")
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

function addItemToOrder(itemId){
    if (orderArray.length === 0){
        orderEl.parentElement.classList.remove("hidden")
    }
    orderArray.push(menuArray[itemId])
}

function renderOrder(){
    if(orderArray.length > 0){
        orderEl.innerHTML = orderArray.map(function(currentItem, index){
            const {name, price} = currentItem
            return `
                <div class="order-line">
                    <p class="big-text">${name}</p>
                    <button class="remove-item-btn" data-index="${index}">remove</button>
                    <p class="item-price align-right">$${price}</p>
                </div>
            `
        }).join("")
        getTotalPrice()
    } else{
        orderEl.parentElement.classList.add("hidden")
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
                        <p class="big-text">${name}</p>
                        <p class="item-ingredients">${ingredients.join(", ")}</p>
                        <p class="item-price">$${price}</p>
                    </div>
                    <button class="add-item-btn align-right" data-id="${id}">
                        <i class="fa-regular fa-plus"></i>
                    </button>
                </div>`
    },"")
}