var products = (function(){

	var actualPage = 0;

	function getNextPage(){
		this.getPage(actualPage + 1);
	}

	function getPrevPage(){
		this.getPage(actualPage - 1);
	}

	function getPage(page){

		if(page >= 0 && page < 3){

			actualPage = page;
			$.ajax({
				url: "index.php?rest=api/product/getProdPage&page=" + page,
				dataType: "json",
				beforeSend: function(){
					products.startLoading();
				},
				success: function(prods){
					
					$("div#prods_container").promise().done(function(){
						var prods_html = "";
		
						var i = 0;
						while(prods[i]){
							prods_html = prods_html + products.getProdHtml(prods[i]);
							i++;
						}
		
						$("div#prods_container").prop("innerHTML",prods_html);
					});
				},
				complete: function(){
					products.stopLoading();
				},
				error: function(){
					alert("something happend!");
				}
			});
		}
	}

	function getProdHtml(prod){
		
		var prod_html = `
		<div class='col s6' >	
			<div id="${prod.product_id}" class='card small'>
				<div class="card-image">
					<img src='site/view/images/data/${prod.image}' />
					<span class="card-title black-text">${prod.title}</span>
				</div>
				<div class="card-content">
					<p>${prod.short_description}</p>
				</div>
				<div class="card-action">
					<a name="prod_info" class="waves-effect waves-green btn-flat">More</a>
				</div>
			</div>
		</div>`

		return prod_html;
	}

	function showProdInfo(){
		
		var prod_id = $(this).parent().parent().prop("id");
		var modal_content = $("div#prod_modal div.modal-content");

		M.Modal.init($('div#prod_modal')[0]);

	}

	function startLoading(){
		$("div#prods_container").children().fadeOut();
	}

	function stopLoading(){
		$("div#prods_container").children().fadeIn();
	}

	return {
		getNextPage,
		getPrevPage,
		getPage,
		startLoading,
		stopLoading,
		getProdHtml,
		showProdInfo
	};

})();

products.getPage(0);

$("body").on("click", "div#nextPage i", function(){
	products.getNextPage();
});

$("body").on("click", "div#prevPage i", function(){
	products.getPrevPage();
});

$("body").on("click", "a[name='prod_info']", function(){
	products.showProdInfo();
});