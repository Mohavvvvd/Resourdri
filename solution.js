document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('equationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const equation = document.getElementById('functionInput').value;

        fetch('/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ equation: equation }),
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('solution');
            if (data.solution) {
                if (Array.isArray(data.solution)) {
                    console.log(data.solution)
                    resultDiv.innerHTML = `Solutions: ${data.solution.join(', ')}`;
                } else {
                    resultDiv.innerHTML = `Solution: ${data.solution}`;
                }
            } else {
                resultDiv.innerText = `Error: ${data.error}`;
            }
        })
        .catch(error => {
            document.getElementById('solution').innerText = `Error: ${error}`;
        });
    });
});
