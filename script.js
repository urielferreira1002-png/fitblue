// Criamos um objeto para guardar os intervalos de cada exercício separadamente
let contadores = {};

function iniciarDescanso(segundos, displayId) {
    // Se já houver um cronômetro rodando para este exercício, nós o paramos antes de reiniciar
    if (contadores[displayId]) {
        clearInterval(contadores[displayId]);
    }

    let tempoRestante = segundos;
    const display = document.getElementById(displayId);

    contadores[displayId] = setInterval(() => {
        let minutos = Math.floor(tempoRestante / 60);
        let segundosFinais = tempoRestante % 60;

        // Formata para ficar sempre com dois dígitos (ex: 01:30)
        display.innerText = 
            (minutos < 10 ? "0" + minutos : minutos) + ":" + 
            (segundosFinais < 10 ? "0" + segundosFinais : segundosFinais);

        if (tempoRestante <= 0) {
            clearInterval(contadores[displayId]);
            alert("O tempo de descanso acabou! Hora da próxima série.");
            // Reseta para o tempo original após o alerta
            display.innerText = segundos === 90 ? "01:30" : "01:00";
        }

        tempoRestante--;
    }, 1000);
}function iniciarTimer(segundos, botaoId) {
    const btn = document.getElementById(botaoId);
    let tempo = segundos;
    btn.disabled = true;
    btn.style.opacity = "0.5";

    const contagem = setInterval(() => {
        btn.innerText = `TEMPO: ${tempo}s`;
        tempo--;

        if (tempo < 0) {
            clearInterval(contagem);
            btn.innerText = "SÉRIE CONCLUÍDA! ✅";
            btn.style.opacity = "1";
            btn.style.backgroundColor = "#059669"; // Verde para sucesso
            btn.disabled = false;
        }
    }, 1000);
}
