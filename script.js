const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');
const averageDiv = document.getElementById('average');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const gradeInput = document.getElementById('grade');

// Mensajes personalizados en español
nameInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity("Por favor, ingrese un nombre.");
});
nameInput.addEventListener('input', (e) => {
    e.target.setCustomValidity("");
});

lastNameInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity("Por favor, ingrese un apellido.");
});
lastNameInput.addEventListener('input', (e) => {
    e.target.setCustomValidity("");
});

gradeInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity("Ingrese una nota válida entre 1.0 y 7.0");
});
gradeInput.addEventListener('input', (e) => {
    e.target.setCustomValidity("");
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const grade = parseFloat(gradeInput.value);

    if (!name || !lastName || isNaN(grade)) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${lastName}</td>
        <td>${grade.toFixed(1)}</td>
    `;
    tableBody.appendChild(newRow);
    form.reset();
    updateAverage();
});

function updateAverage() {
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;

    rows.forEach(row => {
        const gradeCell = row.cells[2];
        if (gradeCell) {
            total += parseFloat(gradeCell.textContent);
        }
    });

    const average = rows.length ? (total / rows.length).toFixed(2) : 'N/A';
    averageDiv.textContent = `Promedio General del Curso : ${average}`;
}
