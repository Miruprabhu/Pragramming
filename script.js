function calculate_percentage() {
    document.getElementById("percent-detail").style.display = "block";
    document.getElementById("details").style.display = "none";
}

function flame_calculate() {
    document.getElementById("flame-detail").style.display = "block";
    document.getElementById("details").style.display = "none";
}

function work_percent() {
    const p1 = document.getElementById("percet1").value.trim();
    const p2 = document.getElementById("percet2").value.trim();
    if (p1 === '') {
        alert("Enter The name");
    } else if (p2 === '') {
        alert("Enter The name");
    } else {
        document.getElementById("%").innerHTML = Math.floor(Math.random() * 100) + "%";
    }
}

function work_flame() {
    const f1 = document.getElementById("flame1").value.trim();
    const f2 = document.getElementById("flame2").value.trim();
    if (f1 == '') {
        alert("Enter The name");
    } else if (f2 == '') {
        alert("Enter The name");
    } else {
        var names = ['close friend', 'best friend', 'friend', 'no friend', 'enemy'];
        document.getElementById('f').innerHTML = names[Math.floor(Math.random() * names.length)];
    }
}
document.getElementById("back").onclick = function() {
    document.getElementById("percent-detail").style.display = "none";
    document.getElementById("details").style.display = "block";
}
document.getElementById("backh").onclick = function() {
    document.getElementById("flame -detail").style.display = "none";
    document.getElementById("details").style.display = "block";
}