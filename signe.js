document.getElementById('sig').addEventListener('submit', function(event) {
    event.preventDefault();
    const equation = document.getElementById('functionInput').value;
    const debut = parseFloat(document.getElementById('a').value);
    const fi = parseFloat(document.getElementById('b').value);
    fetch('https://resourdri.onrender.com/signe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            equation: equation ,
            deb: debut ,
            fin: fi ,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('signe');
        if (data.sign_changes) {
            console.log(data.sign_changes)
            resultDiv.innerHTML = `le signe: ${data.sign_changes.join(', ')}`;
        } else {
            resultDiv.innerText = `Error: ${data.error}`;
        }
    })
    .catch(error => {
        document.getElementById('signe').innerText = `Error: ${error}`;
    });
});
