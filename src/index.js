const balance = document.getElementById('balance') //gets the tag that has the id balance to work with that
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []
//if its not null then look in localstoragetransactions for array

// Add Transaction
function addTransaction(e) {
    e.preventDefault()
    
    if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add a text and amount')
    } else {
      const transaction = {
        id: generateId(),
        text: text.value,
        amount: +amount.value,
      }
      // console.log(transaction)
  
      transactions.push(transaction)
  
      addTransactionList(transaction)
  
      updateValues()
  
      updateLocalStorage()
  
      text.value = ''
      amount.value= ''
  
    }
  } 

//generate id
function generateId() {
    return Math.floor(Math.random() * 100000000)
}

//add transaction
function addTransactionList(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+' // checking the value of the amount property in the array.btn

    const item = document.createElement('li')
  
    // Add class based on the value of amount
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = 
    `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">x</button>
    ` // Math.abs is to get rid of the the minus sign in the amount property  
  
    list.appendChild(item)
  }

//update total card
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount) // looping through the array and creating a new array using map() for only the amounts
  
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc,item) => (acc += item), 0).toFixed(2)
  
    const expense = (amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
  
    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
  }

//remove item by ID
function removeItem(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()

    init()
}

//update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }

//init app
function init() {
    list.innerHTML= ''

    transactions.forEach(addTransactionList)
    updateValues()
}

init()

//add event listener
form.addEventListener('submit', addTransaction)