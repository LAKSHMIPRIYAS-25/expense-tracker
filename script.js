const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        li.className =
            `list-group-item ${
                transaction.amount > 0 ? "income" : "expense"
            }`;

        li.innerHTML = `
            <span>${transaction.description}</span>

            <span>
                ₹${transaction.amount}

                <button class="delete-btn"
                    onclick="deleteTransaction(${index})">
                    X
                </button>
            </span>
        `;

        transactionList.appendChild(li);

        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += Math.abs(transaction.amount);
        }

    });

    income.textContent = `₹${totalIncome}`;
    expense.textContent = `₹${totalExpense}`;
    balance.textContent = `₹${totalIncome - totalExpense}`;

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

addBtn.addEventListener("click", () => {

    const desc = description.value.trim();
    const amt = Number(amount.value);

    if (desc === "" || amt === 0 || isNaN(amt)) {
        alert("Please enter valid details");
        return;
    }

    transactions.push({
        description: desc,
        amount: amt
    });

    description.value = "";
    amount.value = "";

    updateUI();

});

function deleteTransaction(index) {

    transactions.splice(index, 1);

    updateUI();

}

updateUI();