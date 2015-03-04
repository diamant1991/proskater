var autocomplete_city_cache = { byCity: {}, byZoneId: {} };
var defaultValidateSetup = {
	description : {
		commonDescription : {
			required : '<div class="error">Поле обязательно для заполнения</div>',
			rus : '<div class="error">Текст должен быть на русском языке</div>',
			email : '<div class="error">Не верно введён e-mail</div>',
			phone_10 : '<div class="error">Не верно введён номер телефона</div>',
			phone_11 : '<div class="error">Не верно введён номер телефона</div>',
			pass : '<div class="error">Пароль должен содержать минимум 5 символов</div>',
			passConfirm : '<div class="error">Поля "Пароль" и "Подтвердите пароль:" должны совпадать</div>',
			valid : '<div class="success">ОК</div>',
			autocompleteCity : '<div class="error">Не выбран город</div>',
			numeric : '<div class="error">Неверный формат</div>',
		}
	},
	eachInvalidField: function( event, statuses, options ) {
		var dataDescription = $(this).data('description') || 'commonDescription';
		var text = '';
		$.each( statuses, function(i, val) {
			if ( val == false ) {
				if( i == 'conditional' ) {
					text = options.description[ dataDescription ][ statuses.conditionalName ] || options.description[ 'commonDescription' ][ statuses.conditionalName ] || '';
				} else {
					text = options.description[ dataDescription ][ i ] || options.description[ 'commonDescription' ][ i ] || '';
				}
			}
		} );
		fieldDescribedby = $(this).data('describedby');
		$(this).addClass('valid-error');
		if( fieldDescribedby != undefined && $('#'+fieldDescribedby).length ) {
			$('#'+fieldDescribedby).html(text);
		} else {
			$(this).closest('.value').find('.validation-description').html(text);
		}
	},
	eachValidField : function() {
		fieldDescribedby = $(this).data('describedby');
		$(this).removeClass('valid-error');
		if( fieldDescribedby != undefined && $('#'+fieldDescribedby).length ) {
			$('#'+fieldDescribedby).html('');
		} else {
			$(this).closest('.value').find('.validation-description').html('');
		}
	},
	conditional: {
		rus: function( value, options ) {
			return value.length == 0 || /^[а-яА-ЯёЁ\s\-,]+$/.test(value);
		},
		email: function( value, options ) {
			return /[0-9a-z_]+@[0-9a-z_^.]+\.[a-z]{2,3}/i.test(value);
		},
		phone_11: function( value, options ) {
			value = value.replace(/[^0-9]/g,"");
			return value.length==PROSKTR.country.phoneLength || value.length==0;
		},
		pass: function( value, options ) {
			return value.length>=5;
		},
		autocompleteCity: function( value, options ) {
			var holder = $('.city-tab.active', $(this).closest('.value'));
			var city = $('input[name=city]', holder);
			var zone_id = $('[name=zone_id]', holder);
			return parseInt(zone_id.val()) > 0 && city.val().length > 0;
		},
		numeric: function( value, options ) {
			return isNaN( value.trim() );
		},
	}
};
$.validateSetup(defaultValidateSetup);

$.widget("ui.tooltip", $.ui.tooltip, {
	options: {
		content: function () {
			return $(this).prop('title');
		},
		open: function( event, ui ) {
			ui.tooltip.addClass($(this).data('tooltip-class'));
		}
	}
});

var default_ajax_form_options = {
	dataType: 'json',
	timeout: 15000,
	beforeSubmit: function(formData, jqForm, options, form) {
		if( jqForm.data('zone_id_check') == 1 && array_search( formData, 'zone_id' ).value == 0 ) {
			return false;
		}
		if( jqForm.data('disabled') == 1 ) {
			return false;
		}
		jqForm.addClass('form-loading');
		formData.push({name: 'ajax', value: 3});
	},
	success: function(responseText, statusText, additParam, form) {
		form.removeClass('form-loading');
		if( responseText.data ) {
			$.each( responseText.data, function( selector, data ) {
				el = $( selector );
				el.html( data );
				if( $('form.validate', el) ) {
					$('form.validate', el).validate();
				}
				$('.datepicker', el).datepicker();
				if( $('.default-validate-form', el).length ) {
					$('.default-validate-form', el).validate();
				}
				$('.default-ajax-form', el).ajaxForm( default_ajax_form_options );
				$('.phone-11-dig', el).phoneMask();
				var checkboxes = $('input:checkbox', el);
				if( checkboxes.length ) {
					checkboxes.checkbox();
				}
				$('.tooltip', el).tooltip_init();
				$('.tabset', el).tabset();
				init_sc_autocomplete( el );
				// el.find('.fancybox').fancybox();
				if( $.inArray('alignPopup', responseText.options) >= 0 ) {
					var popup = el.closest('.popup');
					if( popup.length ) {
						popup.css({
							'top': (popup.outerHeight() - $(window).height() > 10 ? 10 : (($(window).height()-popup.outerHeight())/2)) + $(window).scrollTop(),
							'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()
						});
					}
				}
			});
		}
	}
};
$.views.helpers({
	json_decode: function( val ) {
		return $.toJSON(val);
	},
});