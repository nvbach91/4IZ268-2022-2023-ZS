(() => {
    const keywordElement = document.getElementById('keywords');
    const buttonElement = document.getElementById('search');
    const resultElement = document.getElementById('tweets');

    //TODO: bez výsledku na API
    //TODO: backend user lookup

    // Fetch tweets based on entered keyword
    const handleClick = async (e) => {
        e.preventDefault();
        resultElement.innerHTML = null;
        keywordElement.setAttribute('placeholder', keywordElement.value);

        if (keywordElement.value === null) return;

        const tweets = await fetch(`https://twitter.asitanc.cz/api/tweets`,{
            method: 'POST',
            body: JSON.stringify({
                query: `${encodeURIComponent(keywordElement.value)}`
            })
        })
            .then(res => res.json())
            .then(res => res.data);
        
        keywordElement.value = null;

        tweets.forEach(item =>{
            const tweetElement = document.createElement('div');
            const tweetIdElement = document.createElement('div');
            const tweetTextElement = document.createElement('div');
            tweetIdElement.innerText = item.id;
            tweetTextElement.innerText = item.text;
            tweetElement.appendChild(tweetIdElement);
            tweetElement.appendChild(tweetTextElement);
            tweetElement.classList.add('tweet');
            resultElement.appendChild(tweetElement);
            //TODO: přidat buttons ke všem tweetum
        })

    }

    buttonElement.addEventListener('click', handleClick, false)

})();