$(document).ready(function() {
    var userCash = "100";

    var apple = new Fruit("apple", 2, 0, 0, 0);
    var banana = new Fruit("banana", 2, 0, 0, 0);
    //var grape = new Fruit ("grape", 2, 0, 0, 0);
    var orange = new Fruit("orange", 2, 0, 0, 0);
    var pear = new Fruit("pear", 2, 0, 0, 0);

    var fruitBasket = [apple, banana, orange, pear];

    $('.cash-avail').text(userCash);

    $('.apple').data('fruit', 0);
    $('.banana').data('fruit', 1);
    $('.orange').data('fruit', 2);
    $('.pear').data('fruit', 3);


    var intervalID = window.setInterval(loopPrice, 15000);

    window.setTimeout(clearer, 300000);

    function clearer() {
        clearInterval(intervalID);
        endGame();
        alert("game over! You finished with: $" + userCash.toFixed(2));
    }

    $('.container').on('click', '.buy-button', function() {
        var $fl = fruitBasket[$(this).parent().data('fruit')];
        if (userCash - $fl.price < 0) {
            alert("You're out of money!");
        } else {

            //increments inventory in object
            $fl.inv += 1;
            //finds inventory, increments on DOM
            $(this).parent().find('.inventory').text($fl.inv);
            //depletes userCash
            userCash -= $fl.price;
            $('header').find('.cash-avail').text(userCash.toFixed(2));

            //increments amount spent, figures average price
            $fl.spent += $fl.price;
            $fl.avgPrice = $fl.spent / $fl.inv;
            $(this).parent().find('.avg-price').text($fl.avgPrice.toFixed(2));
            console.log($fl);
        }
    });
    $('.container').on('click', '.sell-button', function() {
        var $fl = fruitBasket[$(this).parent().data('fruit')];
        if ($fl.inv <= 0) {
            alert("You're out of " + $fl.name + "!");
        } else {
            $fl.inv--;
            userCash += $fl.price;
            $fl.spent -= $fl.avgPrice;
            $(this).parent().find('.inventory').text($fl.inv);
            $('.cash-avail').text(userCash.toFixed(2));
        }


    });

    //market fluctuation
    function priceChange(i) {
        var random = returnRandom();
        fruitBasket[i].price += random / 100; //parseFloat((random / 100).toFixed(2));

        if (fruitBasket[i].price < 0.50) {
            fruitBasket[i].price = 0.50;
        } else if (fruitBasket[i].price > 11.50) {
            fruitBasket[i].price = 11.50
        };
        $('.' + fruitBasket[i].name).find('.price').text(fruitBasket[i].price.toFixed(2));
    }

    function loopPrice() {
        for (var i = 0; i < fruitBasket.length; i++) {
            priceChange(i);
        }
    }

    //testing windowTimers
    function returnRandom() {
        var random = randomNumber(-50, 50);
        console.log('random: ', random / 100);

        return random;
    }
    //useful functions
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    function Fruit(name, price, avgPrice, inv, amtSpent) {
        this.name = name,
            this.price = price,
            this.avgPrice = avgPrice,
            this.inv = inv,
            this.spent = amtSpent
    }

    function endGame() {
        var addScore = 0;
        for (var i = 0; i < fruitBasket.length; ++i) {
            addScore += (fruitBasket[i].inv * fruitBasket[i].price);
            fruitBasket[i].inv = 0;
        }
        userCash += addScore;
        $('.cash-avail').text(userCash.toFixed(2));
        $('.inventory').text('0');
    }
		(function() {
    var timer = 301; // 5 minutes worth of seconds + 1 for the first call

    function countDown() {
        if (--timer) {
            var minutes = timer % 60;
            if (!minutes) {
                minutes = '00';
            }
            $('.timer').text(Math.floor(timer/60) + ':' + minutes);
            setTimeout(countDown, 1000);
        } 
    }

    countDown();
})();
});
