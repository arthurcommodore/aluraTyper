$('#button-placar').click(showPlacar)
$('#button-sync').click(syncPlacar)

function scrollPlacar() {
    const posicaoPlacar = $('.placar').height()
    const body = $("html, body")
    body.stop().animate({scrollTop:posicaoPlacar}, 500, 'swing')
}

function newLinha(usuario, numPalavra) {
	const botaoRemove = `<a href="" class='botao-remove'>
							<i class="small material-icons">delete</i>
						</a>`

	const linha = `<tr>
	<td> ${usuario}</td>
	<td> ${numPalavra} </td>
	<td> ${botaoRemove} </td>
	</tr>`
	return linha
}

function insertPlacar() {
	const tBody = $('.placar').find("tbody")
	const usuario = $('#usuarios').val()
	const numPalavra = $('#contadorPalavra').text()

	tBody.prepend($(newLinha(usuario, numPalavra)))
	eventRemove()
	scrollPlacar()
}

function eventRemove() {
	$('.botao-remove').click(function(e) {
		e.preventDefault()
		const linha = $(this)
        linha.parent().parent().stop().fadeOut(1000)
        setTimeout(() => linha.parent().parent().remove(), 1000)
        
	})
}

function showPlacar() {
    $('.placar').stop().slideToggle(1000)
	scrollPlacar()
}

function syncPlacar() {
	let placar = []
	let linhas = $('tbody tr')

	linhas.each((_, e) => {
		let usuario = $(e).find('td:nth-child(1)').text()
		let palavras = $(e).find('td:nth-child(2)').text()
		let score = {usuario, pontos: palavras}

		placar.push(score)
	})

	const dados = {placar}
	$.post('http://localhost:3000/placar', dados, function() {
		$('.tooltip').tooltipster('open')
		
	})
		.fail(() => {
			$('.tooltip')
				.tooltipster('open')
				.tooltipster('content', 'falha ao sincronizar')
		})
		.always(() => {
			setTimeout(() => $('.tooltip').tooltipster('close'), 2000)
		})
}

function refreshPlacar() {
	$.get('http://localhost:3000/placar', function(data) {
		console.log(data)
		data.forEach( e => {
			let linha = newLinha(e.usuario, e.pontos)
			$('tbody').append($(linha))
		})
		eventRemove()
	})
}