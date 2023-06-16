const btnConfirma = document.getElementById('btnConfirma');
const erro = document.getElementById('erro');
const listaFazer = document.getElementById('fazer');
const feito = document.getElementById('feito');

btnConfirma.addEventListener('click', () => {
    let content = document.getElementById('content').value;
    if (content == '') {
        erro.style.display = 'block';
        setTimeout(() => {
            erro.style.display = 'none';
        }, 1000);
    } else {
        let date = document.getElementById('date').value;
        if (date == '') {
            date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            if (d < 10) d = '0' + d;
            if (m < 10) m = '0' + m;

            date = d + '/' + m + '/' + y;
        } else {
            let y = date[0] + date[1] + date[2] + date[3];
            let m = date[5] + date[6];
            let d = date[8] + date[9];
            date = d + '/' + m + '/' + y;
        }
        let hour = document.getElementById('hour').value;
        listaFazer.innerHTML += `<tr>
                                    <td><input type="checkbox" name="feito" id="feito"></td>
                                    <td>${content}</td>
                                    <td>${hour}</td>
                                    <td>${date}</td>
                                    <td><input type="checkbox" name="cancela" id="feito"></td>
                                </tr>`;
    }

});

const btnAtualiza = document.getElementById('btnAtualiza');

btnAtualiza.addEventListener('click', () => {
    const lista = [...document.getElementsByTagName('tr')];
    console.log(lista);
    lista.forEach(e => {
        if (e.parentElement.innerHTML == '') {
            e.parentElement.innerHTML = '';
        }
        if (e.cells[0].childNodes[0].checked) {
            feito.innerHTML += `<tr><td>${e.cells[1].innerHTML}</td> <td>${e.cells[2].innerHTML}</td> <td>${e.cells[3].innerHTML}</td></tr>`;
            listaFazer.deleteRow(e.rowIndex);
        }
        if (e.cells[4].childNodes[0].checked) {
            listaFazer.deleteRow(e.rowIndex);
        }
    })
});


btnConfirma.addEventListener('click', () => {
    if (localStorage) {
        let table = document.getElementById('fazer').innerHTML;
        localStorage.setItem('tabela', table);
    }
});

btnAtualiza.addEventListener('click', () => {
    if (localStorage) {
        let table = document.getElementById('fazer').innerHTML;
        localStorage.setItem('tabela', table);
    }
});



window.onload = function () {
    table = localStorage.getItem('tabela');

    if (table != 'undefined' || table != 'null') {
        document.getElementById('fazer').innerHTML =  table;
    }
}

function sortTable() {
    let rows, switching, i, shouldSwitch;
    let table = document.getElementById("fazer");
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            let x = rows[i].getElementsByTagName("TD")[3];
            let y = rows[i + 1].getElementsByTagName("TD")[3];
            x = x.innerText.replace(/\//g, '');
            y = y.innerText.replace(/\//g, '');
            let arrX = [...x];
            let arrY = [...y];
            x = arrX.reverse().join('');
            y = arrY.reverse().join('');
            console.log(x, y);
            if (Number(x) > Number(y)) {
                console.log('é maior');
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

