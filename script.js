let newRollNo = 0;
function addRow() {
    newRollNo++;
    var table = document.querySelector("table");
    var newRow = document.createElement("tr");
    totalStudent();

    newRow.innerHTML = `<td><input class = "name" ></td>
    <td><input type = "number" value="${newRollNo}" class = "rollNo" id = "rollNo" min = "1" onclick="addRow()"></td>
    <td><input type = "number" class = "maths" onchange="calculateTotal(this)" min = "0" max = "100"></td>
    <td><input type = "number" class = "chemistry" onchange="calculateTotal(this)" min = "0" max = "100"></td>
    <td><input type = "number" class = "physics" onchange="calculateTotal(this)" min = "0" max = "100"></td>
    <td><input type = "number" class="total" readonly></td>
    <td><input type = "number" id = "percentage" class="percentage" readonly></td>
    <div class="d-flex justify-content-center">
    <button style="border: none; margin-top: 5px;" data-bs-toggle="tooltip" title="delete row" data-bs-placement="bottom" onclick="deleteRow(this)"><i class="gg-trash"></i></button> 
    </div>`

    table.appendChild(newRow);
}

function deleteRow(dlt) {
    let row = dlt.closest("tr");
    row.parentNode.removeChild(row);
    totalStudent();
    calculateValue();
}

function calculateTotal(cal) {
    let row = cal.parentNode.parentNode;

    const maths = row.querySelector(".maths").value;
    const chemistry = row.querySelector(".chemistry").value;
    const physics = row.querySelector(".physics").value;

    let validMarks = true;

    if (maths > 100) {
        alert("Please enter the mark between 0 to 100");
        row.querySelector(".maths").value = "";
        validMarks = false;
    } else if (chemistry > 100) {
        alert("Please enter the mark between 0 to 100");
        row.querySelector(".chemistry").value = "";
        validMarks = false;
    } else if (physics > 100) {
        alert("Please enter the mark between 0 to 100");
        row.querySelector(".physics").value = "";
        validMarks = false;
    }

    if (validMarks) {
        const total = Number(maths) + Number(chemistry) + Number(physics);
        row.querySelector(".total").value = total.toFixed(2);

        const percentage = (total * 100) / 300;
        row.querySelector(".percentage").value = percentage.toFixed(2);
    }

    if (newRollNo > 2) {
        calculateValue();
    }
}

function calculateValue() {
    const totalMarks = document.querySelectorAll(".total");
    const count = Array.from(totalMarks).filter(input => input.value !== "").map(input => Number(input.value));

    if (count.length > 0) {
        const highestMark = Math.max(...count);
        document.querySelector("#highestScore").value = highestMark;

        const lowestMark = Math.min(...count);
        document.querySelector("#lowestScore").value = lowestMark;

        const averageMark = count.reduce((total, value) => total + value, 0) / count.length;
        document.querySelector("#averageScore").value = averageMark.toFixed(2);
    }
}

function totalStudent() {
    x = document.getElementById("tblData").rows.length;
    // console.log(x)
    document.querySelector("#totalNumberOfStudent").value = x;
}

function addMultipleRow() {
    let row_number = prompt("Please enter a number");
    if (row_number != null) {

        row_number = parseInt(row_number);

        if (row_number > 0) {
            for (let i = 0; i < row_number; i++) {
                addRow();
            }
        }
        else {
            alert("Please enter a valid number greater than 0.");
        }
    }
}

