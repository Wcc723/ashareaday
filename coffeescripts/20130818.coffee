$ ->
	$('.d0818click').click (event)->
		event.preventDefault()
		$(".old").animate left: "+=10"
		$(".new").is(":animated") or $(".new").animate(left: "+=10")