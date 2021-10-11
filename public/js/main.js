const tempoInicial = $('#tempo').text()
const area = $('textarea')

$(function() {
	areaEvent()
	timeEvent()
	buttonEvent()
})

function areaEvent() {
	const num = $('p.frase').text().split(' ').length
	$('#qtdPalavras').text(num)

	

	area.on('input', function() {

		let conteudo = area.val()
		let qtd = conteudo.trim().split(/\S+/).length - 1
	
		$('#contadorCaracter').text(conteudo.trim().length)
		$('#contadorPalavra').text(qtd)
	})
}

function timeEvent() {
	const tempo = $('#tempo')
	let count = parseInt(tempo.text())
	area.one('focus', function() {
		$('button').attr('disabled', true)
		const id = setInterval(() => {
			count--

			tempo.text(count)
			if(count < 1) {
				area.attr('disabled', true)
				clearInterval(id)

				$('#contadorCaracter').text(0)
				$('#contadorPalavra').text(0)
				$('button').attr('disabled', false)
			}
		}, 1000)
	})
}

function buttonEvent() {
	$('button').click(() => {
		area.attr('disabled', false)
		area.val("")
		$('#tempo').text(tempoInicial)
		timeEvent()
	})
}