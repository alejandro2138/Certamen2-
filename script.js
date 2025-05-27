// Arreglo para almacenar estudiantes
let students = [];

// Estado para edición: índice del estudiante que se edita, o null si ninguno
let editIndex = null;

// Referencias a elementos del DOM
const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const gradeInput = document.getElementById('grade');

const nameError = document.getElementById('nameError');
const lastNameError = document.getElementById('lastNameError');
const gradeError = document.getElementById('gradeError');

const tableBody = document.querySelector('#studentsTable tbody');
const averageSpan = document.getElementById('average');
const totalSpan = document.getElementById('total');
const approvedSpan = document.getElementById('approvedPercent');
const failedSpan = document.getElementById('failedPercent');
const submitBtn = document.getElementById('submitBtn');

// Limpia mensajes de error
function clearErrors() {
  nameError.textContent = '';
  lastNameError.textContent = '';
  gradeError.textContent = '';
}

// Valida formulario y muestra mensajes de error
function validateForm() {
  clearErrors();
  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = 'El nombre es obligatorio.';
    valid = false;
  }
  if (!lastNameInput.value.trim()) {
    lastNameError.textContent = 'El apellido es obligatorio.';
    valid = false;
  }
  const grade = parseFloat(gradeInput.value);
  if (isNaN(grade) || grade < 1 || grade > 7) {
    gradeError.textContent = 'La nota debe estar entre 1.0 y 7.0.';
    valid = false;
  }

  return valid;
}

// Muestra estudiantes en tabla
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.lastName}</td>
      <td>${student.grade.toFixed(1)}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Eliminar</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  // Añadir eventos a botones de editar y eliminar
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', onEdit);
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', onDelete);
  });
}

// Calcula y actualiza promedio y estadísticas
function updateStats() {
  const total = students.length;
  totalSpan.textContent = total;

  if (total === 0) {
    averageSpan.textContent = 'N/A';
    approvedSpan.textContent = '0%';
    failedSpan.textContent = '0%';
    return;
  }

  const sumGrades = students.reduce((acc, s) => acc + s.grade, 0);
  const avg = sumGrades / total;
  averageSpan.textContent = avg.toFixed(2);

  const approved = students.filter(s => s.grade >= 4).length;
  const failed = total - approved;

  approvedSpan.textContent = ((approved / total) * 100).toFixed(1) + '%';
  failedSpan.textContent = ((failed / total) * 100).toFixed(1) + '%';
}

// Maneja envío del formulario
function onSubmit(event) {
  event.preventDefault();

  if (!validateForm()) return;

  const student = {
    name: nameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    grade: parseFloat(gradeInput.value),
  };

  if (editIndex === null) {
    // Agregar nuevo estudiante
    students.push(student);
  } else {
    // Actualizar estudiante existente
    students[editIndex] = student;
    editIndex = null;
    submitBtn.textContent = 'Agregar Estudiante';
  }

  form.reset();
  clearErrors();
  renderTable();
  updateStats();
}

// Maneja botón eliminar
function onDelete(e) {
  const index = parseInt(e.target.dataset.index);
  students.splice(index, 1);
  // Si estaba editando ese índice, cancelar edición
  if (editIndex === index) {
    editIndex = null;
    form.reset();
    submitBtn.textContent = 'Agregar Estudiante';
    clearErrors();
  }
  renderTable();
  updateStats();
}

// Maneja botón editar
function onEdit(e) {
  const index = parseInt(e.target.dataset.index);
  const student = students[index];
  nameInput.value = student.name;
  lastNameInput.value = student.lastName;
  gradeInput.value = student.grade;
  editIndex = index;
  submitBtn.textContent = 'Guardar Cambios';
  clearErrors();
}

form.addEventListener('submit', onSubmit);
