import { menuArray } from "./data.js";

const menu = document.getElementById("menu")


render()

function render() {
    menu.innerHTML = menuArray.reduce(function(innerHTML, currentItem){
        const {name, ingredients, id, price, emoji} = currentItem
        return innerHTML + `<div class="menu-item">
                    <p class="item-graphic">${emoji}</p>
                    <div>
                        <h3 class="item-name">${name}</h3>
                        <p class="item-ingredients">${ingredients.join(", ")}</p>
                        <p class="item-price">$${price}</p>
                    </div>
                    <button class="add-item-btn" data-id="${id}"><i class="fa-regular fa-plus"></i></button>
                </div>`
    },"")
}