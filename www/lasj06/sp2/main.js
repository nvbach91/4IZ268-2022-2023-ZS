$(document).ready(() => {

    const randomnumber = (Math.random() * (1008 - 1 + 1)) << 0;
    var guessIteration = 1;
    var isHelpDisplayed = false;

    $.ajax({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + randomnumber,
        dataType: 'json',
    }).done(function (data) {
        const name = data.species.name;
        const baseHP = data.stats[0].base_stat;
        const type1 = data.types[0].type.name;
        console.log(Object.keys(data.types).length)
        if (Object.keys(data.types).length == 1) {
            var type2 = "none";
        } else {
            var type2 = data.types[1].type.name;
        };
        const height = data.height;
        const weight = data.weight;
        resultData = [name, baseHP, type1, type2, height, weight]
        console.log(resultData);
    });

    $('#reset').click(function () {
        location.reload();
    });

    $('#help').click(function () {
        if (isHelpDisplayed) {
            ;
        } else {
            $('#help-popup').append($('<div class="help-title"><h4>H E L P</h4></div><div class="help-content"><div class="help-msg"><p>This message will provide basic information on how to play this game, your goal is to guess the randomly generated pokemon by comparing it in the 5 above attributes to pokemon you guess. Under the attributes results will show you how the target pokemon compares to the pokemon you guessed.<br><br>= - The value of this attribute is same between the target pokemon and the pokemon you guessed.<br>↑ - The value of this attribute is higher for the target pokemon than for the pokemon you guessed.<br>↓ - The value of this attribute is lower for the target pokemon than for the pokemon you guessed.<br><br>✓ - The target pokemon has the same type in this type slot as the pokemon you guessed.<br>~ - The target pokemon has the same type as the pokemon you guessed, but in the other slot.<br>✕ - The target pokemon does not have this type.<br><br>Another important information is that if a pokemon has no secondary typing, it is treated as a separate type we call "none".</p></div><div class="help-exit"><input type="button" value="Close help" class="help-btn" id="help-btn"></input></div></div>'));
            isHelpDisplayed = true;
        }
    });

    $('#help-popup').on("click", '#help-btn', function () {
        isHelpDisplayed = false;
        $('#help-popup').empty();
    });

    $("#button").click(function () {
        const guessValue = document.getElementById('input').value;

        $.ajax({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + guessValue,
            dataType: 'json',
        }).done(function (data) {
            const name = data.species.name;
            const baseHP = data.stats[0].base_stat;
            const type1 = data.types[0].type.name;
            if (Object.keys(data.types).length == 1) {
                var type2 = "none";
            } else {
                var type2 = data.types[1].type.name;
            };
            const height = data.height;
            const weight = data.weight;
            guessData = [name, baseHP, type1, type2, height, weight]
            console.log(guessData);

            if (guessData[0] == resultData[0]) {
                $('#input-box').empty();
                $('#input-box').append($('<div class="win">You Win!</div>'));
            }

            $('#game-board').append($('<div class="row" id="row' + guessIteration + '"></div>'));
            if (guessData[1] == resultData[1]) {
                $('#row' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[1] < resultData[1]) {
                $('#row' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[1] > resultData[1]) {
                $('#row' + guessIteration).append($('<div class="box">↓</div>'));
            }
            if (guessData[2] == resultData[2]) {
                $('#row' + guessIteration).append($('<div class="box">✓</div>'));
            } else if (guessData[2] == resultData[3]) {
                $('#row' + guessIteration).append($('<div class="box">~</div>'));
            } else {
                $('#row' + guessIteration).append($('<div class="box">✕</div>'));
            }
            if (guessData[3] == resultData[3]) {
                $('#row' + guessIteration).append($('<div class="box">✓</div>'));
            } else if (guessData[3] == resultData[2]) {
                $('#row' + guessIteration).append($('<div class="box">~</div>'));
            } else {
                $('#row' + guessIteration).append($('<div class="box">✕</div>'));
            }
            if (guessData[4] == resultData[4]) {
                $('#row' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[4] < resultData[4]) {
                $('#row' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[4] > resultData[4]) {
                $('#row' + guessIteration).append($('<div class="box">↓</div>'));
            }
            if (guessData[5] == resultData[5]) {
                $('#row' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[5] < resultData[5]) {
                $('#row' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[5] > resultData[5]) {
                $('#row' + guessIteration).append($('<div class="box">↓</div>'));
            }
            guessIteration = guessIteration + 1;
            

        })
        document.getElementById('input').value = '';
    });

});