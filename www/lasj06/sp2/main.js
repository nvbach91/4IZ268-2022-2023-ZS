var randomnumber = (Math.random() * (1008 - 1 + 1) ) << 0;

$(document).ready(() => {
    
    $.ajax({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + randomnumber,
        dataType: 'json',
    }).done(function(data){
        const name = data.species.name;
        const gen = "";
        const type1 = data.types[0].type.name;
        console.log(Object.keys(data.types).length)
        if (Object.keys(data.types).length = 1) {
            var type2 = "none";
        } else {
            var type2 = data.types[1].type.name;
        };
        const height = data.height;
        const weight = data.weight;
        resultData = [name, gen, type1, type2, height, weight]
        console.log(resultData);
    });

    $("#button").click(function(){
        const guessValue = document.getElementById('input').value;
        
        $.ajax({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + guessValue,
            dataType: 'json',
        }).done(function(data){
            const name = data.species.name;
            const gen = "";
            const type1 = data.types[0].type.name;
            console.log(Object.keys(data.types).length)
            if (Object.keys(data.types).length = 1) {
                var type2 = "none";
            } else {
                var type2 = data.types[1].type.name;
            };
            const height = data.height;
            const weight = data.weight;
            guessData = [name, gen, type1, type2, height, weight]
            console.log(guessData);
        
            if (guessData[0] == resultData[0]) {
                console.log(true);
            } else {
                ;
            }
    
        })
        document.getElementById('input').value = '';
    });
    
});