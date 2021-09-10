//transações fictícias cadastradas(criadas manualmente)
//pegando um item cadastrado/ salvo no bancos de dados local
var transactions =
  JSON.parse(localStorage.getItem("@ewallet/transactions")) || [];

//adiciona o corpo da tabela na variavel table
var table = document.querySelector("table tbody");

//mapeamento das transações
transactions.map((transaction) => {
  var row = document.createElement("tr");
  //<tr>
  //<td>Desenvolvimento</td>
  //</tr>

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
});

var addBtn = document.querySelector("#addButton a");
var popup = document.querySelector("#popupbackground");
var closeBtn = document.querySelector("#popup form a");
var form = document.querySelector("form");

addBtn.addEventListener("click", () => {
  // O que vai acontecer quando clicar no botão adicionar
  popup.style.display = "flex";
  popup.style.transition = "display 5s";
});

// O que vai acontecer qundo clicar no botão fechar
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  popup.style.transition = "display 5s";
  form.reset();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  var data = new FormData(event.target);
  var { title, currency, identifier, price, category } =
    Object.fromEntries(data);

  //Pegar a data atual no formato Dia(DD), Mês(MM), Ano(YYYY)
  var date = new Date().toLocaleDateString();

  var transaction = {
    title,
    price: parseFloat(price),
    category,
    currency,
    identifier,
    //determina o tamanho da sua rede de objetos(abaixo)
    id: transactions.length + 1,
    date,
  };
  //empurrar todas as novas transações junto com as anteriores
  transactions.push(transaction);

  //usando uma função do JSON para transformar em string
  localStorage.setItem("@ewallet/transactions", JSON.stringify(transactions));
  //está gravando no banco de dados local um item
  window.location.reload(); //vai recarrecar a página sozinho após atualizar a página
});

var entrada = document.querySelector(".in h1");
var saída = document.querySelector(".out h1");
var total = document.querySelector(".total h1");

var valoresEntrada = transactions.reduce((count, currentValue) => {
  //estrutura condicional(if)
  if (currentValue.category === "entrada") {
    return count + currentValue.price;
  } else {
    return count;
  }
}, 0);
var valoresSaída = transactions.reduce((count, currentValue) => {
  //estrutura condicional(if)
  if (currentValue.category === "saída") {
    return count + currentValue.price;
  } else {
    return count;
  }
}, 0);

var somatório = valoresEntrada - valoresSaída;

total.innerHTML = moneyFormat("BRL", somatório);
saída.innerHTML = moneyFormat("BRL", valoresSaída);
entrada.innerHTML = moneyFormat("BRL", valoresEntrada);

//Métodos ou funções
function moneyFormat(currency, price) {
  var value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(price);
  return value;
}
