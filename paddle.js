window.EagerPaddle = {

	options: {},

	init: function(options)
	{
		this.options = options;
        this.install();
	},

	install: function()
	{
		var paddle   = document.createElement('script'),
            source = document.getElementsByTagName('script')[0];

        // build up the element properties
		paddle.id    = 'paddle-checkout';
		paddle.type  = 'text/javascript';
		paddle.src   = 'https://paddle.s3.amazonaws.com/checkout/checkout.js';

        // insert the element where scripts were found
		if (source !== undefined) {
          source.parentNode.insertBefore(paddle, source);
    	}

    	// if paddle was installed, begin building the links
		if (typeof document.getElementById(paddle.id) !== undefined) {
			this.build();
		}
	},

	build: function()
	{
		var products = this.options.products;
		
		for(var index = 0; index < products.length; index++)
		{
			var product = products[index],
				wrapper = document.getElementById(product.element);

			// @todo remove once finished testing.
			console.log(product);

			if (wrapper !== null)
			{
				var link = document.createElement('a');

				// build up the link properties
				link.id = 'paddle-checkout-' + product.product;
				link.className = 'paddle_button';
				link.href = 'https://pay.paddle.com/checkout/' + product.product;
				link.text = this.settings.button;

				// insert the data attributes
				for(var property in product) {
					link.dataset[property] = product[property];
				}

				// append the link to the DOM
				wrapper.appendChild(link, wrapper);
			}
		}
	}

};
