$(document).ready(() => {

    const randomnumber = ((Math.random() * (1008 - 1 + 1)) + 1) << 0;
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
        if (Object.keys(data.types).length == 1) {
            var type2 = "none";
        } else {
            var type2 = data.types[1].type.name;
        }
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
        } else {
            $('#help-popup').append($('<div class="help-title"><h4>H E L P</h4></div><div class="help-content"><div class="help-msg"><p>This message will provide basic information on how to play this game, your goal is to guess the randomly generated pokemon by comparing it in the 5 above attributes to pokemon you guess. Under the attributes results will show you how the target pokemon compares to the pokemon you guessed.<br><br>= - The value of this attribute is same between the target pokemon and the pokemon you guessed.<br>↑ - The value of this attribute is higher for the target pokemon than for the pokemon you guessed.<br>↓ - The value of this attribute is lower for the target pokemon than for the pokemon you guessed.<br><br>✓ - The target pokemon has the same type in this type slot as the pokemon you guessed.<br>~ - The target pokemon has the same type as the pokemon you guessed, but in the other slot.<br>✕ - The target pokemon does not have this type.<br><br>Another important information is that if a pokemon has no secondary typing, it is treated as a separate type we call "none".</p></div><div class="help-exit"><input type="button" value="Close help" class="help-btn" id="help-btn"></input></div></div>'));
            isHelpDisplayed = true;
        }
    });

    $('#help-popup').on("click", '#help-btn', function () {
        isHelpDisplayed = false;
        $('#help-popup').empty();
    });

    $("#input-box").submit(function () {

        var test = document.getElementById('input')

        $.ajax({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + test.value,
            dataType: 'json',
        }).done(function (data) {
            const name = data.species.name;
            const baseHP = data.stats[0].base_stat;
            const type1 = data.types[0].type.name;
            if (Object.keys(data.types).length == 1) {
                var type2 = "none";
            } else {
                var type2 = data.types[1].type.name;
            }
            const height = data.height;
            const weight = data.weight;
            const sprites = data.sprites.front_default;
            guessData = [name, baseHP, type1, type2, height, weight, sprites];
            guessAbilities = 'Abilities: ';
            for (let i = 0; i < Object.keys(data.abilities).length; i++) {
                guessAbilities += data.abilities[i].ability.name;
                guessAbilities += ", ";
            }
            guessAbilities = guessAbilities.slice(0, -2);

            console.log(guessAbilities);
            console.log(guessData);

            $('#game-board').append($('<div class="row" id="row' + guessIteration + '"></div>'));

            $('#row' + guessIteration).append($('<div class="sna-holder" id="sna-holder' + guessIteration + '"></div>'));

            $('#sna-holder' + guessIteration).append($('<div class="pokemon-holder" id="pokemon-holder' + guessIteration + '"></div>'));

            $('#pokemon-holder' + guessIteration).append($('<img class="sprite" src="' + guessData[6] +'" class="pokemon-name">'));
            $('#pokemon-holder' + guessIteration).append($('<div class="name">' + guessData[0] + '</div>'));

            $('#sna-holder' + guessIteration).append($('<div class="abilities" id="abilities' + guessIteration + '">' + guessAbilities + '</div>'));

            $('#row' + guessIteration).append($('<div class="box-holder" id="box-holder' + guessIteration + '"></div>'));

            if (guessData[1] == resultData[1]) {
                $('#box-holder' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[1] < resultData[1]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[1] > resultData[1]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↓</div>'));
            }
            if (guessData[2] == resultData[2]) {
                $('#box-holder' + guessIteration).append($('<div class="box">✓</div>'));
            } else if (guessData[2] == resultData[3]) {
                $('#box-holder' + guessIteration).append($('<div class="box">~</div>'));
            } else {
                $('#box-holder' + guessIteration).append($('<div class="box">✕</div>'));
            }
            if (guessData[3] == resultData[3]) {
                $('#box-holder' + guessIteration).append($('<div class="box">✓</div>'));
            } else if (guessData[3] == resultData[2]) {
                $('#box-holder' + guessIteration).append($('<div class="box">~</div>'));
            } else {
                $('#box-holder' + guessIteration).append($('<div class="box">✕</div>'));
            }
            if (guessData[4] == resultData[4]) {
                $('#box-holder' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[4] < resultData[4]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[4] > resultData[4]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↓</div>'));
            }
            if (guessData[5] == resultData[5]) {
                $('#box-holder' + guessIteration).append($('<div class="box">=</div>'));
            } else if (guessData[5] < resultData[5]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↑</div>'));
            } else if (guessData[5] > resultData[5]) {
                $('#box-holder' + guessIteration).append($('<div class="box">↓</div>'));
            }

            if (guessData[0] == resultData[0]) {
                $('#input-box').empty();
                $('#input-box').append($('<div class="win">You Win!</div>'));
                const caughtPokemon = {
                    name: guessData[0],
                    sprite: guessData[6]
                };
                localStorage.setItem(guessData[0], JSON.stringify(caughtPokemon));
            }

            guessIteration = guessIteration + 1;
        })
    
        test.value = '';
        //document.getElementById('input-box').reset();
        return false;
    });

    const caughtPokemons = { ...localStorage };
    pokemonElements = [];
    //vytvořit dočasné pole

    for (pokemon in caughtPokemons) {
        //vytvořit elementy, každý element přidat do dočasného pole
        var pokemonTransfer = JSON.parse(localStorage.getItem(pokemon));
        elementName = $('<div>' + pokemonTransfer.name + '</div>');
        elementSprite = $('<img src=' + pokemonTransfer.sprite + '>');
        pokemonElements.push(elementName);
        pokemonElements.push(elementSprite);
    }

    $('#caught-pokemon').append(pokemonElements);
    //obsah dočasného pole appendovat na místo v html
});