if (!window.$){
  // Paddle, unfortunately, requires a global jQuery install
  window.$ = jQuery;
}

window.EagerPaddle = {

    options: {},

    init: function(options) {
        this.options = options;
        this.install();
    },

    install: function() {
        var paddle = document.createElement('script'),
            source = document.getElementsByTagName('script')[0];

        // build up the element properties
        paddle.id = 'paddle-checkout';
        paddle.type = 'text/javascript';
        paddle.src = 'https://paddle.s3.amazonaws.com/checkout/checkout.js';

        // insert the element where scripts were found
        source.parentNode.insertBefore(paddle, source);

        // begin building the links
        this.build();
    },

    build: function() {
        var products = this.options.products;

        for (var index = 0; index < products.length; index++) {
            var product = products[index],
                wrapper = Eager.createElement(product.element);

            if (wrapper) {
                var link = document.createElement('a');

                // build up the link properties
                link.id = 'paddle-checkout-' + product.product;
                link.className = 'paddle_button';
                link.href = 'https://pay.paddle.com/checkout/' + product.product;
                link.textContent = this.options.button;
                link.setAttribute('data-theme', this.options.theme);

                // insert the data attributes
                for (var property in product) {
                    if (product.hasOwnProperty(property)) {
                        link.setAttribute('data-' + property, product[property]);
                    }
                }

                // append the link to the DOM
                wrapper.appendChild(link);
            }
        }
    }

};
