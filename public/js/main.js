const num = $('p.frase').text().split(' ').length

$('#qtdPalavras').text(num)

const area = $('textarea')

area.on('input', function() {

	let conteudo = area.val()
	let qtd = conteudo.trim().split(/\S+/).length - 1

	$('#contadorCaracter').text(conteudo.trim().length)
	$('#contadorPalavra').text(qtd)

	
})