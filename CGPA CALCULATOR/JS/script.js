// the constant regulations and departmet data
const regulations = {
    "2020-2024": {
        "Select...": {
        },
        "ECE": {
            "1": 22,
            "2": 22,
            "3": 20,
            "4": 22,
            "5": 23,
            "6": 25,
            "7": 16,
            "8": 10
        },
    },
    "2021-2025": {
        "Select...": {
        },
        "ECE": {
            "1": 22,
            "2": 22,
            "3": 20,
            "4": 22,
            "5": 23,
            "6": 25,
            "7": 16,
            "8": 10
        },
    },
    "2022-2026": {
        "Select...": {
        },
        "ECE": {
            "1": 22,
            "2": 22,
            "3": 20,
            "4": 22,
            "5": 23,
            "6": 25,
            "7": 16,
            "8": 10
        },
    },
    "2023-2027": {
        "Select...": {
        },
       "ECE": {
            "1": 23,
            "2": 23,
            "3": 20,
            "4": 22,
            "5": 23,
            "6": 25,
            "7": 16,
            "8": 10
        },
    }
}


// Select the regulation and course elements
const regulationSelect = document.getElementById('regulation');
const courseSelect = document.getElementById('course');

// Populate the course options when the regulation changes
regulationSelect.addEventListener('change', function () {
    const selectedRegulation = this.value;
    courseSelect.innerHTML = '';  // Clear previous options
    for (const course in regulations[selectedRegulation]) {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    }
});

// Manually trigger the change event to populate courses for the initial selected regulation
regulationSelect.dispatchEvent(new Event('change'));

let semesterCount = 1;

function addSemester() {
    semesterCount++;
    if (semesterCount <= 8) {
        const semesterDiv = document.getElementById("additional-semesters");
        const newInput = document.createElement("div");
        newInput.innerHTML = `
            <label for="semester${semesterCount}">Semester ${semesterCount} SGPA:<br></br></label>
            <input type="number" id="semester${semesterCount}" step="0.01" min="0" max="10" required>
        `;
        semesterDiv.appendChild(newInput);
    }
}

function removeSemester() {
    if (semesterCount > 1) {
        const semesterDiv = document.getElementById("additional-semesters");
        semesterDiv.removeChild(semesterDiv.lastChild);
        semesterCount--;
    }
}

function calculateCGPA() {
    let weightedGPA = 0;
    let totalCredits = 0;
    const selectedRegulation = document.getElementById('regulation').value;
    const selectedCourse = document.getElementById('course').value;

    for (let i = 1; i <= semesterCount; i++) {
        const semesterGPA = parseFloat(document.getElementById(`semester${i}`).value);
        if (isNaN(semesterGPA)) {
            alert(`Please enter a valid SGPA for Semester ${i}`);
            return;  // Exit the function if invalid data is found.
        }
        else if (semesterGPA > 10 || semesterGPA < 0) {
            alert(`Please enter a value in the range 0-10 for Semester ${i}`);
            return;
        }
        const semesterCredits = regulations[selectedRegulation][selectedCourse][i];
        weightedGPA += semesterGPA * semesterCredits;
        totalCredits += semesterCredits;
    }

    const cgpa = (weightedGPA / totalCredits).toFixed(2);
    const cgpaElement = document.getElementById("cgpa");
    cgpaElement.textContent = `${cgpa}`;
    // Make the CGPA visible
    cgpaElement.style.opacity = "1";
    cgpaElement.style.transform = "translateY(0)";

    // Scroll to the CGPA results section
    cgpaElement.scrollIntoView({ behavior: 'smooth' });

    var result = document.getElementById("cgpa");
    result.innerHTML = "Your CGPA is: " + cgpa;
}



function resetInputs() {
    // Reset select elements to their default (first) option
    document.getElementById("regulation").selectedIndex = 0;
    document.getElementById("course").selectedIndex = 0;

    // Reset semester GPA input fields to empty
    document.getElementById("semester1").value = "";
    // Reset semester GPA input fields to empty
    for (let i = 1; i <= semesterCount; i++) {
        document.getElementById(`semester${i}`).value = "";
    }

    const courseSelect = document.getElementById("course");
    courseSelect.innerHTML = ""; // Clear previous options
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "";
    courseSelect.appendChild(defaultOption);

    // Remove additional semester inputs one by one
    const additionalSemestersDiv = document.getElementById("additional-semesters");
    while (additionalSemestersDiv.children.length > 0) {
        additionalSemestersDiv.removeChild(additionalSemestersDiv.lastChild);
        semesterCount--;
    }

    // Reset semesterCount to 1
    semesterCount = 1;

    // Reset CGPA result to "N/A"
    document.getElementById("cgpa").textContent = "";
}