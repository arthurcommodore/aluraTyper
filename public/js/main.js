let tempoInicial = $('#tempo').text()
const area = $('textarea')

$(function() {
	areaEvent()
	timeEvent()
	eventReset()
	eventRemove()
	refreshPlacar()
})

function refreshQtd() {
	const num = $('p.frase').text().split(' ').length
	$('#qtdPalavras').text(num)
}

function refreshTime(time) {
	tempoInicial = time
	$('#tempo').text(time)
}

function areaEvent() {
	refreshQtd()
	area.on('input', function() {
		let frase = $('.frase').text()
		let conteudo = area.val()
		let qtd = conteudo.trim().split(/\S+/).length - 1
		let comparavel = frase.substr(0, conteudo.length)

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
				clearInterval(id)
				finish()
			}
		}, 1000)
	})
}

function finish() {
	area.attr('disabled', true)
	$('#reset').attr('disabled', false)
	area.addClass('campo-desativado')
	insertPlacar()
}

function eventReset() {
	$('#reset').on('click', () => {
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

function parallax() {
	
}