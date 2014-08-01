(function ( $ ) {
	$.fn.scrollify = function() {
		

		function visuallyWrap(el){ 
			
			var ul = $(el)
			
			ul.addClass('jq-scroller-mover');
			
			ul.wrap('<div class="jq-scroller-wrapper"><div class="jq-scroller"></div></div>');
			
			var prevNextBtn = '<i class="fa fa-arrow-circle-left jq-scroller-prev"></i><i class="fa fa-arrow-circle-right jq-scroller-next"></i>'
			
			var overlay = '<div class="jq-scroller-overlay"><div class="jq-overlay-item"><i class="jq-overlay-close fa fa-times-circle"></i><i class="fa fa-arrow-circle-left jq-scroller-overlay-prev"></i><i class="fa fa-arrow-circle-right jq-scroller-overlay-next"></i><div class="jq-overlay-content"></div></div></div>';
			
			var wrapper = ul.parents('.jq-scroller-wrapper')
			
			wrapper.append(prevNextBtn)
			
			wrapper.append(overlay)

			$(el).find('li').each(function(index, elem){
				var li = $(elem)
				var a = li.find('a').first(); 
				a.addClass('jq-scroller-preview')
				li.addClass('jq-scroller-item');
				a.attr('style', 'background-image:url('+a.children('img').attr('src')+');')
				li.append('<div class="jq-scroller-caption">'+a.attr('data-title')+'</div>')
			})
		}

		function attachEventHandlers(el){

			var wrapper = $(el).parents('.jq-scroller-wrapper')
			
			var nextBtn = wrapper.find('.jq-scroller-next')
			
			var prevBtn = wrapper.find('.jq-scroller-prev')
			
			var mover = wrapper.find('.jq-scroller-mover')
			
			var overlay = wrapper.find('.jq-scroller-overlay')
			
			var items = wrapper.find('.jq-scroller-item')
			
			var overlayContent = wrapper.find('.jq-overlay-content')
			
			var overlayN = wrapper.find('.jq-scroller-overlay-next')
			
			var overlayP = wrapper.find('.jq-scroller-overlay-prev')

			var w = $(items[0]).outerWidth()+"px"; 
			
			var animN = function(){
				var l = $(items).last().offset().left + $(items).last().width(); 
				var m = $(wrapper).offset().left + $(wrapper).width(); 
				if ( l >= m){
					return {left: "-="+w}
				} else {
					return {left: "-="+0}	
				}

			}; 
			
			var animP = function(){
				if ($(mover).position().left == 0){
					return {left: "+="+0}
				} else {
					return {left: "+="+w}	
				}
			}; 
			var animDur = {duration: "medium"}

			var indexOfCurrentItem; 

			$(nextBtn).click( function(){
				mover.animate(animN(),animDur)
				console.log($(mover).position().left); 
			})

			$(prevBtn).click( function(){
				mover.animate(animP(),animDur)
				console.log(); 
			})
			
			$(overlay).click( function(){
				overlay.removeClass('active')
				overlayContent.empty(); 
			});
			
			$(items).click( function(event){
				event.preventDefault(); 
				overlayContent.empty(); 
				indexOfCurrentItem = items.index(this)
				var contentLink =  $(this).children('.jq-scroller-preview')
				var contentImageSrc = contentLink.attr('href')
				var caption = contentLink.attr('data-title')
				var maxHeight = ($(document).height() - 200)+"px"; 

				if (contentLink.attr('data-type') == 'iframe'){
					var content = $('<iframe src="'+contentImageSrc+'"  frameborder="0" allowfullscreen></iframe><p>'+caption+'</p>');
				} else {
					var content = $('<img src="'+contentImageSrc+'" style="max-height:'+maxHeight+';"/><p>'+caption+'</p>');
				}
				content.appendTo(overlayContent);
				overlay.addClass('active')
			})


			$(overlayN).click( function(event){
				event.stopPropagation(); 
				$(items[indexOfCurrentItem+1]).trigger('click')
			})

			$(overlayP).click( function(event){
				event.stopPropagation(); 
				$(items[indexOfCurrentItem-1]).trigger('click')
			})


		}
		
		visuallyWrap(this);

		attachEventHandlers(this)

		return this; 
	}

}( jQuery ));