var transactions = [
    {
        title: "Desenvolvimento",
        price: 5000,
        currency: "BRL",
        type: "Entrada",
        category: "venda",
        date: "23/08/2021",
    },
    {
        title: "Butequinho do Urutau",
        price: 25,
        currency: "BRL",
        type: "saída",
        category: "Bebidas",
        date: "13/08/2021",
    },
    {
        title: "American Japan",
        price: 40,
        currency: "BRL",
        type: "saída",
        category: "Alimentos",
        date: "13/08/2021",
    }
]

 {/*<tr>
            <td>Desenvolvimento</td>
            <td>R$ 5.000,00</td>
            <td class="green"></class><i data-feather="dollar-sign"></i>Vendas</td>
            <td>04/02/2021</td>
          </tr>
          <tr>
            <td>Butequinho do Urutau</td>
            <td>R$ 25,00</td>
            <td class="red"><i data-feather="coffee"></i>Bebidas</td>
            <td>13/08/2021</td>
          </tr>
          <tr>
            <td>American Japan</td>
            <td>R$ 40,00</td>
            <td class="green"><i data-feather="pie-chart"></i>Alimentos</td>
            <td>13/08/2021</td>
          </tr>

 */}
 var table = document.querySelector("#tabela tbody");

 transactions.map(transaction => {
     var row = document.createElement("tr");

     var title = document.createElement("td");
     title.append(transaction.title);

     var price = document.createElement("td");
     var value = moneyFormat(transaction.currency, transaction.price);
     price.append(value);

     var category = document.createElement("td");
     category.append(transaction.category);

     var date = document.createElement("td");
     date.append(transaction.date);
     
     row.appendChild(title);
     row.appendChild(price);
     row.appendChild(category);
     row.appendChild(date);

     table.appendChild(row);
 })

var addBtn = document.querySelector("#addButton a");
var popup = document.querySelector("#popupbackground");
var closeBtn = document.querySelector("#popup form a");

addBtn.addEventListener("click", ()=>{
    // o que vai acontecer quando clicar no botão "adicionar"
    popup.style.display = "flex";
    popup.style.transition = "display 5s";
})

closeBtn.addEventListener("click", ()=> {
    popup.style.display = "none";
    popup.style.transition = "display 5s";
});

function moneyFormat(currency, price){
    var value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currency
    }).format(price);
    return value;
}