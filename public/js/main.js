const tempoInicial = $('#tempo').text()
const area = $('textarea')
const frase = $('.frase').text()
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
		let comparavel = frase.substr(0, conteudo.length)

		console.log(conteudo)
		$('#contadorCaracter').text(conteudo.trim().length)
		$('#contadorPalavra').text(qtd)

		console.log(comparavel, conteudo)
		if(comparavel == conteudo){
			area.removeClass('campo-errado')
			area.addClass('campo-correto')
		}else {
			area.addClass('campo-errado')
		}
	})
}

function timeEvent() {
	const tempo = $('#tempo')
	let count = parseInt(tempo.text())
	area.one('focus', function() {
		$('#reset').attr('disabled', true)
		const id = setInterval(() => {
			count--

			tempo.text(count)
			if(count < 1) {
				area.attr('disabled', true)
				clearInterval(id)

				$('#reset').attr('disabled', false)
				area.addClass('campo-desativado')
			}
		}, 1000)
	})
}

function buttonEvent() {
	$('#reset').click(() => {
		$('#contadorCaracter').text(0)
		$('#contadorPalavra').text(0)

		area.removeClass('campo-errado')
		area.removeClass('campo-correto')

		area.removeClass('campo-desativado')
		area.attr('disabled', false)
		area.val("")
		$('#tempo').text(tempoInicial)
		timeEvent()
	})
}