function numberToWords(number) {
    const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

    let wordsArray = [];
    while (number > 0) {
        wordsArray.unshift(words[number % 10]);
        number = Math.floor(number / 10);
    }

    return wordsArray.join(' ');
}


function calculateTotalMarks() {
    const theoryInputs = document.querySelectorAll('[id^="theory-marks-"]');
    const practicalInputs = document.querySelectorAll('[id^="practical-marks-"]');

    let grandTotal = 0;

    theoryInputs.forEach((theoryInput, index) => {
        const theoryMarks = parseInt(theoryInput.value) || 0;
        const practicalMarks = parseInt(practicalInputs[index].value) || 0;
        const totalMarks = theoryMarks + practicalMarks;

        const totalCell = document.getElementById(`total-marks-${index + 1}`);
        const totalWordsCell = document.getElementById(`total-words-${index + 1}`);

        totalCell.textContent = totalMarks;
        totalWordsCell.textContent = numberToWords(totalMarks);

        grandTotal += totalMarks;
    });

    const grandTotalCell = document.querySelector('.grandtot .alltot');
    grandTotalCell.textContent = grandTotal;

    const maxTotalMarks = theoryInputs.length * 100; 

    const percentageCell = document.querySelector('.percentage.alltot'); // Assuming the percentage cell has class "percentage" and "alltot"

    if (percentageCell) {
        const percentage = (grandTotal / maxTotalMarks) * 100;
        percentageCell.textContent = percentage.toFixed(2) + '%';
    }

    // Display placeholder until actual value is entered
    const totalWordsCells = document.querySelectorAll('.numinwords');

    totalWordsCells.forEach(function(cell) {
        const placeholder = cell.getAttribute('data-placeholder');

        if (cell.textContent.trim() === '') {
            cell.textContent = 'Zero Zero';
        }
    });
}

document.addEventListener('input', (event) => {
    if (event.target.id.startsWith('theory-marks-') || event.target.id.startsWith('practical-marks-')) {
        calculateTotalMarks();
    }
});
