function convertToWords() {
    let num = document.getElementById("numInput").value;
    let result = numToWords(Number(num));
    document.getElementById("result").innerText = result;
}

function numToWords(n) {
    if (isNaN(n)) {
        return "Please enter a valid number.";
    }

    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
        'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Million', 'Billion'];

    if (n === 0) return "Zero";

    let words = '';
    let group = 0;

    // Split number into groups of three digits
    while (n > 0) {
        let currentGroup = n % 1000;

        if (currentGroup !== 0) {
            words = groupToWords(currentGroup) + (thousands[group] ? ' ' + thousands[group] : '') + (words ? ' ' + words : '');
        }

        n = Math.floor(n / 1000);
        group++;
    }

    return words;
}

function groupToWords(n) {
    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
        'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (n === 0) return '';

    if (n < 20) {
        return ones[n];
    } else if (n < 100) {
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    } else {
        return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + groupToWords(n % 100) : '');
    }
}
