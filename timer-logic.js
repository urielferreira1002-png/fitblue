const timers = {};

function renderCards(lista) {
    const container = document.getElementById('container');
    lista.forEach(ex => {
        container.innerHTML += `
            <div class="ex-card">
                <h3 class="font-black italic uppercase">${ex.nome}</h3>
                <div class="timer-display" id="display-${ex.id}">${formatTime(ex.tempo)}</div>
                <div class="controls">
                    <button class="btn btn-start" onclick="startTimer('${ex.id}', ${ex.tempo})">Iniciar / Continuar</button>
                    <button class="btn btn-pause" onclick="pauseTimer('${ex.id}')">Pausar</button>
                    <button class="btn btn-reset" onclick="resetTimer('${ex.id}', ${ex.tempo})">Reiniciar</button>
                </div>
            </div>
        `;
    });
}

function formatTime(s) {
    const min = Math.floor(s / 60);
    const seg = s % 60;
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function startTimer(id, total) {
    if (timers[id]?.interval) return;
    if (!timers[id]) timers[id] = { time: total };
    timers[id].interval = setInterval(() => {
        if (timers[id].time > 0) {
            timers[id].time--;
            document.getElementById(`display-${id}`).innerText = formatTime(timers[id].time);
        } else {
            clearInterval(timers[id].interval);
            document.getElementById(`display-${id}`).innerText = "CONCLUÍDO! ✅";
            document.getElementById(`display-${id}`).style.color = "#059669";
        }
    }, 1000);
}

function pauseTimer(id) {
    clearInterval(timers[id]?.interval);
    if(timers[id]) delete timers[id].interval;
}

function resetTimer(id, total) {
    pauseTimer(id);
    timers[id] = { time: total };
    document.getElementById(`display-${id}`).innerText = formatTime(total);
    document.getElementById(`display-${id}`).style.color = "#3b82f6";
}