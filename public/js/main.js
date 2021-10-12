const tempoInicial = $('#tempo').text()
const area = $('textarea')
const frase = $('.frase').text()
$(function() {
	areaEvent()
	timeEvent()
	buttonEvent()
	eventRemove()
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

function insertPlacar() {
	const tBody = $('.placar').find("tbody")
	const usuario = "Arthur"
	const numPalavra = $('#contadorPalavra').text()
	const botaoRemove = `<a href="" class='botao-remove'>
							<i class="small material-icons">delete</i>
						</a>`

	const linha = `<tr>
						<td> ${usuario}</td>
						<td> ${numPalavra} </td>
						<td> ${botaoRemove} </td>
					</tr>`
	tBody.prepend($(linha))
	eventRemove()
}

function eventRemove() {
	$('.botao-remove').click(function(e) {
		e.preventDefault()
		$(this).parent().parent().remove()
	})
}