document.getElementById('show-summary-btn').addEventListener('click', function() {
    const summary = document.getElementById('system-summary');
    if (summary.style.display === 'none') {
        summary.style.display = 'block';
    } else {
        summary.style.display = 'none';
    }
});