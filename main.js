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
        if (e.cells[0].childNodes[0].checked) {
            feito.innerHTML += `<tr><td>${e.cells[1].innerHTML}</td> <td>${e.cells[2].innerHTML}</td> <td>${e.cells[3].innerHTML}</td></tr>`;
            listaFazer.deleteRow(e.rowIndex);
            
        }
        if (e.cells[4].childNodes[0].checked) {
            listaFazer.deleteRow(e.rowIndex);
        }
    })
});