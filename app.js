const studentRegForm = document.getElementById("regForm");
const studentInfo = document.getElementById("studentInfo");

// Loading students info
const loadStudents = () => {
	const students = JSON.parse(localStorage.getItem("students")) || [];
	studentInfo.innerHTML = students
		.map(
			(student, index) => `
            <div class="card">
                    <h3>${student.studentName}</h3>
                    <p>ID: ${student.studentId}</p>
                    <p>Class: ${student.studentClass}</p>
                    <p>Email: ${student.studentEmail}</p>
                    <p>Contact: ${student.studentContact}</p>
                    <div class="card-btns">
                        <button class="editBtn" onclick="editStudent(${index})">Edit</button>
                        <button class="deleteBtn" onclick="deleteStudent(${index})">Delete</button>
                    </div>
            </div>     
        `
		)
		// Join all the student cards together otherwise card loads with , separated
		.join("");
};

const registerStudent = (students) => {
	localStorage.setItem("students", JSON.stringify(students));
};

studentRegForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const studentName = studentRegForm.studentName.value.trim();
	const studentId = studentRegForm.studentId.value.trim();
	const studentClass = studentRegForm.studentClass.value.trim();
	const studentEmail = studentRegForm.studentEmail.value.trim();
	const studentContact = studentRegForm.studentContact.value.trim();

	// Validation above used .trim() to check empty string
	if (
		!studentName ||
		!studentId ||
		!studentClass ||
		!studentEmail ||
		!studentContact
	) {
		alert("All fields required!!");
		return;
	}

	// Validation for StudenID and contact that use only number
	if (!/^\d+$/.test(studentId)) {
		alert("Student ID must be a number.");
		return;
	}
	if (!/^\d+$/.test(studentContact)) {
		alert("Contact Number must be a number.");
		return;
	}

	// Validation for name that use only letters and spaces
	if (!/^[a-zA-Z\s]+$/.test(studentName)) {
		alert("Student Name must contain only letters and spaces.");
		return;
	}

	const students = JSON.parse(localStorage.getItem("students")) || [];
	students.push({
		studentName,
		studentId,
		studentClass,
		studentEmail,
		studentContact,
	});
	registerStudent(students);

	// Reset or clear the reg form
	studentRegForm.reset();
	loadStudents();
});

// Edit student
const editStudent = (index) => {
	const students = JSON.parse(localStorage.getItem("students")) || [];
	const student = students[index];

	studentRegForm.studentName.value = student.studentName;
	studentRegForm.studentId.value = student.studentId;
	studentRegForm.studentClass.value = student.studentClass;
	studentRegForm.studentEmail.value = student.studentEmail;
	studentRegForm.studentContact.value = student.studentContact;

	// Remove the student after editing to avoid duplication
	students.splice(index, 1);
	registerStudent(students);
	loadStudents();
};

// Delete student
const deleteStudent = (index) => {
	const students = JSON.parse(localStorage.getItem("students")) || [];
	students.splice(index, 1);
	registerStudent(students);
	loadStudents();
};

// Load students on page load or Start
loadStudents();
