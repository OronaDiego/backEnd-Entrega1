const socket = io();
socket.on('saludoDesdeBack', (message)=>{
    
    console.log(message)

})

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDesc = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock")
const productsList = document.getElementById("products");

form.onsubmit= (e)=>{
    e.preventDefault();
    const title = inputTitle.value;
    const desc = inputDesc.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const product ={
        title,desc,code,price,stock
    }
    socket.emit('newProduct',{ title,desc,code,price,stock})
}

socket.on('arrayProducts',(array)=>{
    let infoProducts = '';
    array.forEach(p => {
        infoProducts += `${p.title} - ${p.desc} - ${p.code} - $${p.price} - ${p.stock} <br>`
    });

    productsList.innerHTML= infoProducts;
})