
let tableEntries = JSON.parse(localStorage.getItem('tableEntries'))  ||    [
    { type: 1, name: "income", amount: 50000},
    { type: 0, name: "travelling", amount:15000},
    {type:0, name:"cricket expense",amount :4000},
    { type: 0, name: "food", amount: 5000 },
];


function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;       
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    document.getElementById("updatedInc").innerText = totalIncome;
    document.getElementById("updatedExp").innerText = totalExpense;
    document.getElementById("updatedBal").innerText = totalIncome - totalExpense;
}


function addItem() {
    let type = document.getElementById("itemType").value;
    let name = document.getElementById("Name");
    let amount  =document.getElementById("Amount")
 
 
 
 
 
 
 
 
 
 
    if (name.value  === "" || Number(amount.value) === 0)
    return alert("Incorrect Input");
if (Number(amount.value) <= 0)
    return alert(
        "Incorrect amount! can't add negative"
    );

    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
    });


    localStorage.setItem('tableEntries', JSON.stringify(tableEntries));


    updateTable();
    name.value = "";
    amount.value = 0;

}



// Function to load all entries in the expense table
function loadItems(e, i) {
    let cls;
    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);

    let cell0 = row.insertCell(0); // S.no
    let cell1 = row.insertCell(1); // Name
    let cell2 = row.insertCell(2); // Amount
    let c3 = row.insertCell(3); // Type (income/expense)
    let c4 = row.insertCell(4); // Delete button

    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    c4.innerHTML = "&#9746;"; // Delete symbol
    c4.classList.add("zoom"); // Add zoom class for styling
    c4.addEventListener("click", () => del(e)); // Delete entry when clicked

    // Determine the color based on type (expense or income)
    if (e.type == 0) {
        cls = "red";
        c3.innerHTML = "&#10138;"; // Arrow for expense
    } else {
        cls = "green";
        c3.innerHTML = "&#10136;"; // Arrow for income
    }

    c3.style.color = cls;
}

// Clear the table before updating
function remove() {
    let table = document.getElementById("table");
    while (table.rows.length > 1) table.deleteRow(-1); // Keep the header row
}

// Function to delete a specific entry
function del(el) {
    remove(); // Clear the table
    tableEntries = tableEntries.filter((e) => e.name !== el.name || e.amount !== el.amount); 
    
    
    localStorage.setItem('tableEntries', JSON.stringify(tableEntries));
    
    
    // Ensure correct deletion
    tableEntries.forEach((e, i) => loadItems(e, i)); // Reload updated entries
    updateSummary(); // Update summary
}

// To render all entries
function updateTable() {
    remove();
    tableEntries.forEach((e, i) => loadItems(e, i)); // Reload all items
    updateSummary();
}

updateTable(); // Initial render
