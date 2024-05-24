    function test() {
        var ch = document.getElementById('functionInput').value;
        var deb = document.getElementById('a').value;
        var fin = document.getElementById('b').value;

        console.log(ch, deb, fin);
        console.log("test function called");
        if (ch.length == 0) {
            alert("Saisie la fonction svp!");
            return false;
        }
        if (!deb) {
            alert("Saisie le début de l'intervalle!");
            return false;
        }
        if (!fin) {
            alert("Saisie la fin de l'intervalle!");
            return false;
        }

        if (ch.includes("log") || ch.includes("log10")) {
            if (deb <= 0) {
                alert("Le début pour le log et log10 doit être >= 0");
                return false;
            }
        }

        return true;
    }
    function show() {
        const d = document.getElementById("res");
        if (d) {
            d.style.opacity = "1"; 
            setTimeout(() => {
                d.style.transitionDelay = "0s";
            }, 300);
        } else {
            console.error("Element with ID 'res' not found.");
        }
    }
    

    
