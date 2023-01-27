(() => {
  const bmiContainer = $("#bmi-container");
  const h2BMI = $("<h2>BMI</h2>");
  const formDiv = $("<div></div>");
  const formBmi = $("<form></form>");

  const weightLabel = $("<label>Weight (kg):</label>");
  weightLabel.attr("for", "weight");
  const weightInput = $("<input></input>");
  weightInput.attr("type", "number");
  weightInput.attr("min", "40");
  weightInput.attr("max", "160");
  weightInput.attr("id", "weight");

  const heightLabel = $("<label>Height (cm):</label>");
  heightLabel.attr("for", "height");
  const heightInput = $("<input></input>");
  heightInput.attr("type", "number");
  heightInput.attr("min", "130");
  heightInput.attr("max", "230");
  heightInput.attr("id", "height");

  const ageLabel = $("<label>Age:</label>");
  ageLabel.attr("for", "age");
  const ageInput = $("<input></input>");
  ageInput.attr("type", "number");
  ageInput.attr("min", "20");
  ageInput.attr("id", "age");

  const resultButtonBMI = $("<button>Calculate</button>");
  resultButtonBMI.attr("id", "bmi-result");

  const bmiTextContainer = $("<div></div>");
  bmiTextContainer.attr("id", "bmi-result-text");

  const bmiTextResultSpan = $("<span></span>");

  const alertTextWeight = $("<p></p>");
  const alertTextHeight = $("<p></p>");
  const alertTextAge = $("<p></p>");

  bmiContainer.append(h2BMI);
  bmiContainer.append(formDiv);
  bmiContainer.append(bmiTextContainer);
  formDiv.append(formBmi);
  formBmi.append(weightLabel);
  formBmi.append(weightInput);
  formBmi.append(heightLabel);
  formBmi.append(heightInput);
  formBmi.append(ageLabel);
  formBmi.append(ageInput);
  formDiv.append(resultButtonBMI);

  function validateWeight() {
    let weight = $("#weight").val();
    if (weight < 40 || weight > 160) {
      alertTextWeight.text("Weight must be between 40 and 160 kg.");
      alertTextWeight.insertAfter(formDiv);
      weightInput.addClass("wrong-input");
      return false;
    }
    weightInput.removeClass("wrong-input");
    alertTextWeight.remove();
    return true;
  }
  weightInput.on("input", validateWeight);

  function validateHeight() {
    let height = $("#height").val();
    if (height < 130 || height > 230) {
      alertTextHeight.text("Height must be between 130 and 230 cm.");
      alertTextHeight.insertAfter(formDiv);
      heightInput.addClass("wrong-input");
      return false;
    }
    alertTextHeight.remove();
    heightInput.removeClass("wrong-input");
    return true;
  }
  heightInput.on("input", validateHeight);

  function validateAge() {
    let age = $("#age").val();
    if (age < 20 || age > 130) {
      alertTextAge.text("Age must be greater than 20.");
      alertTextAge.insertAfter(formDiv);
      ageInput.addClass("wrong-input");
      return false;
    }
    ageInput.removeClass("wrong-input");
    alertTextAge.remove();
    return true;
  }
  ageInput.on("input", validateAge);

  resultButtonBMI.click(() => {
    let height = $("#height").val();
    let weight = $("#weight").val();
    let age = $("#age").val();

    if (validateWeight() && validateHeight() && validateAge()) {
      axios({
        method: "get",
        url: "https://fitness-calculator.p.rapidapi.com/bmi",
        params: {
          age: age,
          weight: weight,
          height: height,
        },
        headers: {
          "X-RapidAPI-Key":
            "fb3f0e0dd8msh4df178b5707f104p115907jsn28fc0d39f032",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      })
        .then(function (response) {
          const data = response.data.data;
          let bmi = data.bmi;
          let health = data.health;
          let date = new Date();
          let shortVersionDate = date.toLocaleDateString();
          bmiTextContainer.append(bmiTextResultSpan);
          bmiTextResultSpan.text("Bmi: " + bmi + " - " + health);

          localStorage.setItem("date", shortVersionDate.toString());
          let storageBMI = bmiTextResultSpan.text();
          localStorage.setItem("bmi", storageBMI);
          Swal.fire({
            title: "BMI Result",
            text: "Your BMI is: " + bmi + " - " + health,
            icon: "success",
            confirmButtonText: "Let's go",
            confirmButtonColor: "green",
            showClass: {
              popup: "animate__animated animate__zoomInDown",
            },
            hideClass: {
              popup: "animate__animated animate__rotateOut",
            },
          });
        })
        .catch(function (error) {
          alert("There is something wrong with the API!!");
          console.log(error);
        });
    } else {
      validateWeight();
      validateHeight();
      validateAge();
    }
    heightInput.val("");
    weightInput.val("");
    ageInput.val("");
  });

  $(document).ready(() => {
    if (localStorage.getItem("bmi") !== null) {
      const savedBMI = localStorage.getItem("bmi");
      const savedDate = localStorage.getItem("date");
      Swal.fire({
        template: "#my-template",
        title: "Your last BMI result",
        text: "Date: " + savedDate + " - " + savedBMI,
        icon: "info",
        confirmButtonText: "Okay",
        confirmButtonColor: "#a2d2ff",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  });

  const calculatorCal = $("#calculator");

  const h2Name = $("<h2>Caloric Calculator</h2>");
  const calculatorForm = $("<form></form>");
  const calculatorTextArea = $("<textarea></textarea>");
  calculatorTextArea.attr("id", "ingredient-text-area");

  const calculatorButton = $("<button>Add ingredient</button>");
  calculatorButton.attr("type", "button");
  calculatorButton.attr("id", "add-ingredients");

  const resultDiv = $("<div></div>");
  resultDiv.attr("id", "result");

  const resultDivTable = $(
    "<table><thead><tr><th>Qty</th><th>Unit</th><th>Food</th><th>Calories</th><th>Weight</th><th>Delete</th></tr></thead><tbody></tbody></table>"
  );

  resultDiv.append(resultDivTable);

  const textAreaText = $("<p></p>");
  const calculatorHelpText = $(
    `<p>Enter an ingredient that you ate today in this form <span>"10g chicken, 1oz salmon"</span>. If there are more ingredients add each new ingredient on a new line!</p>`
  );

  const resultNutrContainer = $("<div></div>");
  resultNutrContainer.attr("id", "result-nutrition");

  const h2Nutrition = $("<h2>Nutrition Facts</h2>");
  const divCalories = $("<div></div>");
  const h3Calories = $("<h3>Calories:</h3>");
  const h3AmountCal = $("<h3></h3>");
  const totalNutrientsDiv = $("<div></div>");

  h3AmountCal.attr("id", "amount-cal");
  totalNutrientsDiv.attr("id", "total-nutrients");

  const nutrForm = $("<div></div>");
  nutrForm.attr("id", "nutr-form");

  resultNutrContainer.append(h2Nutrition);
  resultNutrContainer.append(divCalories);
  resultNutrContainer.append(totalNutrientsDiv);

  divCalories.append(h3Calories);
  divCalories.append(h3AmountCal);

  const h3TotalFat = $("<h3>Fat:</h3>");
  const h3TotalProtein = $("<h3>Protein:</h3>");
  const h3TotalCarbs = $("<h3>Carbs:</h3>");
  const h3TotalSatFat = $("<h3>Saturated Fat:</h3>");
  const h3TotalTranFat = $("<h3>Trans Fat:</h3>");
  const h3TotalChole = $("<h3>Cholesterol:</h3>");
  const h3TotalSodium = $("<h3>Sodium:</h3>");
  const h3TotalCalcium = $("<h3>Calcium:</h3>");
  const h3TotalPotassium = $("<h3>Potassium:</h3>");
  const h3TotalIron = $("<h3>Iron:</h3>");

  totalNutrientsDiv.append(h3TotalFat);
  totalNutrientsDiv.append(h3TotalSatFat);
  totalNutrientsDiv.append(h3TotalTranFat);
  totalNutrientsDiv.append(h3TotalProtein);
  totalNutrientsDiv.append(h3TotalCarbs);
  totalNutrientsDiv.append(h3TotalChole);
  totalNutrientsDiv.append(h3TotalSodium);
  totalNutrientsDiv.append(h3TotalCalcium);
  totalNutrientsDiv.append(h3TotalPotassium);
  totalNutrientsDiv.append(h3TotalIron);

  nutrForm.append(calculatorForm);
  nutrForm.append(resultNutrContainer);
  nutrForm.append(resultDiv);

  calculatorCal.append(h2Name);
  calculatorCal.append(calculatorHelpText);
  calculatorCal.append(nutrForm);

  calculatorForm.append(calculatorTextArea);
  calculatorForm.append(calculatorButton);

  const informationText = $(
    "<p>Total nutritional values of every ingredient</p>"
  );

  resultNutrContainer.append(informationText);

  const tbodyTable = $("#result table tbody");

  let caloriesAll = 0;
  let totalFat = 0;
  let totalSaturatedFat = 0;
  let totalTransFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalCholes = 0;
  let totalSodium = 0;
  let totalCalcium = 0;
  let totalPotassium = 0;
  let totalIron = 0;

  const spinner = $("<div></div>");
  spinner.addClass("spinner");

  async function makeApiCall(ingredient) {
    try {
      const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=bf6f13f2&app_key=53d5866d5468cc4330686629e83d2f39&ingr=${ingredient}`;
      const response = await axios.get(apiUrl);
      const { data } = response;

      if (
        !data.ingredients ||
        !data.ingredients[0].parsed ||
        !data.ingredients[0].parsed[0] ||
        !data.ingredients[0].parsed[0].quantity
      ) {
        textAreaText.text(
          `${ingredient} does not exist in our Database or the input is incorrect!`
        );
        Swal.fire({
          title: "We are sorry!",
          text: `${ingredient} does not exist in our Database or the input is incorrect!`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "red",
          showClass: {
            popup: "animate__animated animate__tada",
          },
          hideClass: {
            popup: "animate__animated animate__backOutDown",
          },
        });
        textAreaText.insertAfter(addIngr);
        return;
      }

      const {
        quantity: qty,
        measure: unit,
        food,
      } = data.ingredients[0].parsed[0];
      const totalNutrients = data.totalNutrients;
      const { calories, totalWeight } = data;
      const weight = `${Math.trunc(totalWeight * 1000) / 1000} g`;
      const { FAT, PROCNT, CHOCDF, FASAT, CHOLE, NA, CA, K, FE } =
        totalNutrients;

      console.log(data);

      tbodyTable.append(
        `<tr>
          <td>${qty}</td>
          <td>${unit}</td>
          <td>${food}</td>
          <td>${calories}</td>
          <td>${weight}</td>
          <td>
            <img 
              src="assets/delete.png"
              alt="delete-button-image" 
              data-fat="${FAT.quantity}" 
              data-protein="${PROCNT.quantity}" 
              data-carbs="${CHOCDF.quantity}" 
              data-satfat="${FASAT.quantity}" 
              data-cholesterol="${CHOLE.quantity}" 
              data-sodium="${NA.quantity}" 
              data-calcium="${CA.quantity}" 
              data-potassium="${K.quantity}" 
              data-iron="${FE.quantity}"
            >
          </td>
        </tr>`
      );

      textAreaText.remove();
      addCalories(calories);
      addNutrients(FAT, PROCNT, CHOCDF, FASAT, CHOLE, NA, CA, K, FE);
    } catch (error) {
      alert("There is something wrong with the API!!");
      console.error(error);
    }
  }

  const ingredientTextArea = $("#ingredient-text-area");

  const addIngr = $("#add-ingredients");
  addIngr.click(async function () {
    const ingredientText = $("#ingredient-text-area").val().trim();
    if (!ingredientText) {
      textAreaText.text("Please enter an ingredient!");
      textAreaText.insertAfter(addIngr);
      return;
    }

    const ingredients = ingredientText.split("\n");

    if (ingredients.length > 0) {
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }

    for (const ingredient of ingredients) {
      spinner.addClass("show");
      tbodyTable.append(spinner);
      await makeApiCall(ingredient);
      spinner.removeClass("show");
    }

    updateTotalNutrients();
    ingredientTextArea.val("");
  });

  $(document).ready(() => {
    if (localStorage.getItem("ingredients") !== null) {
      const savedIngredients = JSON.parse(localStorage.getItem("ingredients"));
      ingredientTextArea.val(savedIngredients.join("\n"));
    }
  });

  ingredientTextArea.on("input", function () {
    if (this.value.length === 0) {
      localStorage.removeItem("ingredients");
    }
  });

  const addCalories = (calories) => {
    caloriesAll += calories;

    h3AmountCal.text(caloriesAll);
  };

  tbodyTable.on("click", "img", function () {
    const row = $(this).closest("tr");
    const calories = row.find("td:nth-child(4)").text();

    if (!isNaN(caloriesAll)) {
      caloriesAll -= calories;
      h3AmountCal.text(caloriesAll);
    }
    row.remove();

    let fat = parseFloat($(this).attr("data-fat"));
    let protein = parseFloat($(this).attr("data-protein"));
    let carbs = parseFloat($(this).attr("data-carbs"));
    let satFat = parseFloat($(this).attr("data-satfat"));
    let cholesterol = parseFloat($(this).attr("data-cholesterol"));
    let sodium = parseFloat($(this).attr("data-sodium"));
    let calcium = parseFloat($(this).attr("data-calcium"));
    let potassium = parseFloat($(this).attr("data-potassium"));
    let iron = parseFloat($(this).attr("data-iron"));

    subtractNutrients(
      fat,
      protein,
      carbs,
      satFat,
      cholesterol,
      sodium,
      calcium,
      potassium,
      iron
    );
    updateTotalNutrients();
  });

  const addNutrients = (
    fat,
    protein,
    carbs,
    satFat,
    cholesterol,
    sodium,
    calcium,
    potassium,
    iron
  ) => {
    totalFat += fat.quantity;
    totalProtein += protein.quantity;
    totalCarbs += carbs.quantity;
    totalSaturatedFat += satFat.quantity;
    totalCholes += cholesterol.quantity;
    totalSodium += sodium.quantity;
    totalCalcium += calcium.quantity;
    totalPotassium += potassium.quantity;
    totalIron += iron.quantity;
  };

  function subtractNutrients(
    fat,
    protein,
    carbs,
    satFat,
    cholesterol,
    sodium,
    calcium,
    potassium,
    iron
  ) {
    totalFat -= fat;
    totalProtein -= protein;
    totalCarbs -= carbs;
    totalSaturatedFat -= satFat;
    totalCholes -= cholesterol;
    totalSodium -= sodium;
    totalCalcium -= calcium;
    totalPotassium -= potassium;
    totalIron -= iron;
  }

  function updateTotalNutrients() {
    h3TotalFat.text(`Fat: ${Math.trunc(totalFat * 100) / 100} g`);
    h3TotalProtein.text(`Protein: ${Math.trunc(totalProtein * 100) / 100} g`);
    h3TotalCarbs.text(`Carbs: ${Math.trunc(totalCarbs * 100) / 100} g`);
    h3TotalSatFat.text(
      `Saturated Fat: ${Math.trunc(totalSaturatedFat * 100) / 100} g`
    );
    h3TotalTranFat.text(
      `Trans Fat: ${Math.trunc(totalTransFat * 100) / 100} g`
    );
    h3TotalChole.text(`Cholesterol: ${Math.trunc(totalCholes * 100) / 100} mg`);
    h3TotalSodium.text(`Sodium: ${Math.trunc(totalSodium * 100) / 100} mg`);
    h3TotalCalcium.text(`Calcium: ${Math.trunc(totalCalcium * 100) / 100} mg`);
    h3TotalPotassium.text(
      `Potassium: ${Math.trunc(totalPotassium * 100) / 100} mg`
    );
    h3TotalIron.text(`Iron: ${Math.trunc(totalIron * 100) / 100} mg`);
  }
})();
