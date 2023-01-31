var randomnumber = (Math.random() * (1008 - 1 + 1) ) << 0;

$(document).ready(() => {

    i = 1;
    
    $.ajax({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + randomnumber,
        dataType: 'json',
    }).done(function(data){
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

    $('#reset').click(function(){
        location.reload();
    });

    $("#button").click(function(){
        const guessValue = document.getElementById('input').value;
        
        $.ajax({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + guessValue,
            dataType: 'json',
        }).done(function(data){
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
                console.log("win");
                //win
            } else {
                $('#game-board').append($('<div class="row" id="row' + i + '"></div>'));
                
                if (guessData[1] == resultData[1]) {
                    $('#row' + i).append($('<div class="box">=</div>'));
                } else if (guessData[1] < resultData[1]) {
                    $('#row' + i).append($('<div class="box">^</div>'));
                } else if (guessData[1] > resultData[1]) {
                    $('#row' + i).append($('<div class="box">˘</div>'));
                }

                if (guessData[2] == resultData[2]) {
                    $('#row' + i).append($('<div class="box">G</div>'));
                } else if (guessData[2] == resultData[3]) {
                    $('#row' + i).append($('<div class="box">Y</div>'));
                } else {
                    $('#row' + i).append($('<div class="box">R</div>'));
                }

                if (guessData[3] == resultData[3]) {
                    $('#row' + i).append($('<div class="box">G</div>'));
                } else if (guessData[3] == resultData[2]) {
                    $('#row' + i).append($('<div class="box">Y</div>'));
                } else {
                    $('#row' + i).append($('<div class="box">R</div>'));
                }
                
                if (guessData[4] == resultData[4]) {
                    $('#row' + i).append($('<div class="box">=</div>'));
                } else if (guessData[4] < resultData[4]) {
                    $('#row' + i).append($('<div class="box">^</div>'));
                } else if (guessData[4] > resultData[4]) {
                    $('#row' + i).append($('<div class="box">˘</div>'));
                }
                
                if (guessData[5] == resultData[5]) {
                    $('#row' + i).append($('<div class="box">=</div>'));
                } else if (guessData[5] < resultData[5]) {
                    $('#row' + i).append($('<div class="box">^</div>'));
                } else if (guessData[5] > resultData[5]) {
                    $('#row' + i).append($('<div class="box">˘</div>'));
                }
            
                i = i + 1;
            }
    
        })
        document.getElementById('input').value = '';
    });
    
});