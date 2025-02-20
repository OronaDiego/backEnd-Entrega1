const socket = io();


const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDesc = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock")
const productsList = document.getElementById("products");
const messages = document.getElementById("message");

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
    socket.emit('newProduct', product)
}

socket.on('arrayProducts',(array)=>{
    let infoProducts = '';
    array.forEach(p => {
        infoProducts += `Title: ${p.title} -Desc: ${p.desc} -Code: ${p.code} -Price: $${p.price} -Stock: ${p.stock} <br>`
    });

    productsList.innerHTML= infoProducts;
})


socket.on('newProducto', (product) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${product.title}</strong> - $${product.desc} - ${product.code} -${product.price}- ${product.stock}`;
    productList.appendChild(li);
});