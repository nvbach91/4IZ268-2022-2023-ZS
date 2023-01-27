(() => {
   class Jeopardy {
      constructor(element, options = {}) {

         // kategorie otazek k pouziti, zatim prazdne score, kategorie a napovedy k otazkam, elementy k zobrazeni
         // 27784 we love you, toronto!
         // 22110 top 10 brands
         // 51 geography
         // 1052 official languages
         this.useCategoryIds = [20559, 22110, 51, 1052];

         this.categories = [];
         this.clues = {};

         this.currentClue = null;
         this.score = 0;
         
         this.boardElement = element.querySelector(".board");
         this.scoreCountElement = element.querySelector(".score-count");
         this.formElement = element.querySelector("form");
         this.inputElement = element.querySelector("input[name=user-answer]");
         this.modalElement = element.querySelector(".card-modal");
         this.clueTextElement = element.querySelector(".clue-text");
         this.resultElement = element.querySelector(".result");
         this.resultTextElement = element.querySelector(".result_correct-answer-text");
         this.successTextElement = element.querySelector(".result_success");
         this.failTextElement = element.querySelector(".result_fail");
         this.loader = element.querySelector(".loader");
         this.restart = element.querySelector(".restart");

         // bindovani event handlers
         this.boardElement.addEventListener("click", event => {
            // zpracovat click kdyz ma clueId
            if (event.target.dataset.clueId) {
               this.handleClueClick(event);
            }
         });
         this.formElement.addEventListener("submit", event => {
            this.handleFormSubmit(event);
         });

         this.restart.addEventListener("click", event => {
            this.handleRestartClick(event);
         });
      }

      initGame() {
         
         // obnovit score s minulym score v local storage, vrati string, musi byt integer
         // na zacatku localstorage je prazdny, musi se zobrazovat 0
         if (localStorage.getItem('prevScore') == null) {
            this.updateScore(0);
         } else {
            this.updateScore(parseInt(localStorage.prevScore));
         }
         this.fetchCategories();
      }

      // fetch kategorii z api
      fetchCategories() {
         const categories = this.useCategoryIds.map(category_id => {
            return new Promise((resolve, reject) => {
               fetch(`https://jservice.io/api/category?id=${category_id}`)
                  .then(response => response.json()).then(data => {
                     resolve(data);
                  });
            });
         });

         // projit data kdyz se vrati, zacit budovat seznam kategorii
         Promise.all(categories).then(results => {
            document.querySelector(".loader").style.display = "none";
            results.forEach((result, categoryIndex) => {

               var category = {
                  title: result.title,
                  clues: []
               }

               // pridat vsechny napovedy k otazkam (clue) pro kazdou kategorii,
               // omezit na 4 na 1 kategorii pro prehlednost
               var clues = shuffle(result.clues).splice(0, 4).forEach((clue, index) => {
                  console.log(clue)

                  // id pro kazdou napovedu, pridat do prazdneho array s hodnotami
                  var clueId = categoryIndex + "-" + index;
                  category.clues.push(clueId);

                  this.clues[clueId] = {
                     question: clue.question,
                     answer: clue.answer,
                     value: (index + 1) * 100
                  };
               })

               this.categories.push(category);
            });

            // zpracovat a vytvorit kategorii
            this.categories.forEach((c) => {
               this.renderCategory(c);
            });

            //this.boardElement.removeChild(this.boardElement.lastChild);
         });
      }

      // vytvoreni sloupcu kategorii
      renderCategory(category) {
         let column = document.createElement("div");
         column.classList.add("column");
         // ?
         column.innerHTML = (
            `<header>${category.title}</header>
         <ul>
         </ul>`
         );

         // pridani clueId k elementum li
         var ul = column.querySelector("ul");
         category.clues.forEach(clueId => {
            var clue = this.clues[clueId];
            ul.innerHTML += `<li><button data-clue-id="${clueId}">${clue.value}</button></li>`
         })

         this.boardElement.appendChild(column);
      }

      // obnoveni score
      updateScore(change) {
         this.score += change;
         // var cleanScore = String(this.score);
         // cleanScore = cleanScore.replace(/^0/, "");
         // parseInt(cleanScore, 10)
         this.scoreCountElement.textContent = this.score;
      }

      handleRestartClick(event) {
         this.restartGame();
      }
      // zpracovani clicku na karty
      handleClueClick(event) {
         var clue = this.clues[event.target.dataset.clueId];

         // oznacit button otazky jako pouzity
         event.target.classList.add("used");
         this.inputElement.value = "";

         // obnoveni current clue
         this.currentClue = clue;

         this.clueTextElement.textContent = this.currentClue.question;
         this.resultTextElement.textContent = this.currentClue.answer;

         // otazka je videt, odpoved zatim ne
         this.modalElement.classList.remove("showing-result");

         this.modalElement.classList.add("visible");
         this.inputElement.focus();
      }

      // zpracovani odpovedi, pridani score
      handleFormSubmit(event) {
         event.preventDefault();
         var isCorrect = this.cleanAnswer(this.inputElement.value) === this.cleanAnswer(this.currentClue.answer);
         if (isCorrect) {
            this.updateScore(this.currentClue.value);
            
         }
         this.revealAnswer(isCorrect);
      }

      // ocisteni odpovedi z api od chybnych tagu, lowercase a smazani mezer
      // pro lepsi vyhodnoceni odpovedi
      cleanAnswer(input = "") {
         var cleanedAnswer = input.toLowerCase();
         cleanedAnswer = cleanedAnswer.replace("<i>", "");
         cleanedAnswer = cleanedAnswer.replace("</i>", "");
         cleanedAnswer = cleanedAnswer.replace(/ /g, "");
         cleanedAnswer = cleanedAnswer.replace(/\\/g, "");
         cleanedAnswer = cleanedAnswer.replace(/"/g, "");
         cleanedAnswer = cleanedAnswer.replace(/^a/, "");
         cleanedAnswer = cleanedAnswer.replace(/^an/, "");
         return cleanedAnswer.trim();
      }

      // ukazat odpoved na zaklade toho zda je spravne/spatne,
      // ukazat kartu s odpovedi a po timeoutu odebrat
      revealAnswer(isCorrect) {
         this.successTextElement.style.display = isCorrect ? "block" : "none";
         this.failTextElement.style.display = !isCorrect ? "block" : "none";

         this.modalElement.classList.add("showing-result");
         
         setTimeout(() => {
            this.modalElement.classList.remove("visible");
         }, 3000);
         
         // ulozit score po spravne odpovedi do localstorage
         localStorage.setItem('prevScore', this.score);
      }
      
      restartGame() {
         localStorage.clear();
         this.score = 0;
         this.categories = [];
         this.clues = {};
         this.currentClue = null;

         this.boardElement.innerHTML = "";

         game.initGame();
      }
   }

   

   // funkce k michani 
   function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         x = a[i];
         a[i] = a[j];
         a[j] = x;
      }
      return a;
   }

   const game = new Jeopardy(document.querySelector(".app"), {});
   game.initGame();
})()