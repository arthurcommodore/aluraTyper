$('#button-frase').click(fraseAleatoria)
$('#button-frase-id').click(buscaFrase)

function showErro(data) {
    return function() {
        console.log(data)
        $('#erro').show()
        setTimeout(() => $('#erro').toggle(), 2000)
    }
    
}

function fraseAleatoria() {
    $('#spinner').show()

    $.get('http://localhost:3000/frases', function(data) {
        const sort = Math.floor(Math.random() * data.length)
        $('.frase').text(data[sort].texto)

        refreshQtd(data)
        refreshTime(data[sort].tempo)
    })
        .fail(showErro())
        .always(() => $('#spinner').hide())
}

function buscaFrase() {
    let id = $('#frase-id').val()
    const data = {id}
    $('#spinner').show()

    $.get('http://localhost:3000/frases', data, trocaFrase)
        .fail(showErro(data))
        .always(() => $('#spinner').hide())
}

function trocaFrase(data) {
    $('#spinner').toggle()
    $('.frase').text(data.texto)
    refreshQtd()
    refreshTime(data.tempo)
}