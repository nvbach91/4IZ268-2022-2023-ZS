function readUploadedFile() {
    //verifies uploaded file
    filePath = document.getElementById("file-upload").value;
    extension = filePath.split('.').pop();
    filename = filePath.split('\\').pop();
    feedback = document.getElementById("upload-feedback");
    if (extension !== "txt") {
        feedback.innerHTML = "Soubor musí být textový soubory s txt koncovkou.";
        feedback.className = "bold incorrect";
        return;
    }
    let file = document.getElementById("file-upload").files[0];
    if(file.size > 2000000){
        feedback.innerHTML = "Soubor je moc velký. Maximum je 2MB.";
        feedback.className = "bold incorrect";
        return;
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        
        correct = verifyFormat(reader.result);
        if(correct == -1){
            feedback.innerHTML = "Soubor " + filename + " uploading...";
            feedback.className = "bold correct";
            //UPLOAD DRIVE
        }
        else{
            feedback.innerHTML = "Soubor " + filename + " je špatně naformátován - řádek číslo " + (i+1);
            feedback.className = "bold incorrect";
        }
        
    }
}
function verifyFormat(fileText){
    // verifies format, returns wrong line if bad, -1 if good 
    let state = 0;
    //0 - new question description or empty line
    //1 - question
    //2 - question or empty line
    let lines = fileText.split('\n');
    for (i = 0;i < lines.length;i++){
        let line = lines[i];
        if(state === 0){
            if(line === '' || line === '\r'){
                continue;
            }
            if(line[0] === '+' || line[0] === '-' || line === '' || line === '\r'){
                return i;
            }
            state = 1;
            continue;
        }
        if(state === 1){
            if(line[0] === '+' || line[0] === '-'){
                state = 2;
                continue;
            }
            return i;
        }
        if(state === 2){
            if(line[0] === '+' || line[0] === '-'){
                continue;
            }
            if(line === '' || line === '\r'){
                state = 0;
                continue;
            }
            return i;
        }
    }
    return -1;
}










const testFile = "/selectedTest/test.txt";
const testFormId = "test-form";

function viewTest() {
    makeTest("viewTest");
}
function test() {
    makeTest("test");
}
function testResult() {
    makeTest("testResult");
}
function processAnswers(testData) {
    //get boolean array of answers from URL
    const url = window.location.href;
    const thing = url.split('?');
    const ansText = thing[1].replaceAll("=on", "");
    const answerData = ansText.split('&');
    let answerNumber = 0;
    let answers = Array(testData.length);
    for (let line = 0; line < testData.length; line++) {
        if (parseInt(answerData[answerNumber]) === line) {
            answerNumber++;
            answers[line] = true;
        }
        else {
            answers[line] = false;
        }
    }
    return answers;

}
function makeTest(type) {
    const testFileString = (loadFile(testFile));
    const testData = testFileString.split('\n');
    const test = document.getElementById(testFormId);
    if (type === "testResult") {
        const answers = processAnswers(testData);
        for (let line = 0; line < testData.length; line++) {
            makeLine2(test, line, testData[line], type, answers[line]);

        }
    }
    else {
        for (let line = 0; line < testData.length; line++) {
            makeLine(test, line, testData[line], type);
        }
    }


    if (type === "test") {
        test.appendChild(createSubmit());
    }
    if (type === "testResult") {
        //markTest(testData)
    }
}
function makeLine2(test, lineNum, lineData, type, answer) {
    if (lineData.length === 0) {
        test.appendChild(createBreak());
        return;
    }
    if (lineData[0] === '+') {
        test.appendChild(createInput(lineNum, lineData, type, true, answer));
        test.appendChild(createLabel(lineNum, lineData, type, true, answer));
        test.appendChild(createBreak());
        return;
    }
    if (lineData[0] === '-') {
        test.appendChild(createInput(lineNum, lineData, type, false, answer));
        test.appendChild(createLabel(lineNum, lineData, type, false, answer));
        test.appendChild(createBreak());
        return;
    }
    else {
        test.appendChild(createDescription(lineData, type));
        return
    }
}
function makeLine(test, lineNum, lineData, type) {
    if (lineData.length === 0) {
        test.appendChild(createBreak());
        return;
    }
    if (lineData[0] === '+') {
        test.appendChild(createInput(lineNum, lineData, type, true));
        test.appendChild(createLabel(lineNum, lineData, type, true));
        test.appendChild(createBreak());
        return;
    }
    if (lineData[0] === '-') {
        test.appendChild(createInput(lineNum, lineData, type, false));
        test.appendChild(createLabel(lineNum, lineData, type, false));
        test.appendChild(createBreak());
        return;
    }
    else {
        test.appendChild(createDescription(lineData, type));
        return
    }
}

function markTest(testData) {
    const answers = processAnswers(testData);
    for (let i = 0; i < testData.length; i++) {
        line = document.getElementById(i);
        if (testData[i][0] === '+' || testData[i][0] === '-') {

        }
    }

    test.inp
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}
function createDescription(text, type) {
    let h3 = document.createElement('h3');
    h3.textContent = text;
    return h3;
}
function createInput(id, text, type, right, marked) {
    let input = document.createElement('input');
    input.type = "checkbox";
    input.id = id;
    input.name = id;
    if (type !== "test") {
        input.disabled = true;
    }
    if (type === "viewTest" && right) {
        input.checked = true;
    }
    if (type === "testResult" && marked) {
        input.checked = true;
    }
    return input;
}
function createLabel(id, text, type, right, marked) {
    let label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = text.substr(2);
    if (type === "viewTest" && right) {
        label.className = "correct yes";
    }
    if (type === "testResult" && right && marked) {
        label.className = "correct yes";
    }
    if (type === "testResult" && right && !marked) {
        label.className = "incorrect yes";
    }
    if (type === "testResult" && !right && marked) {
        label.className = "incorrect no";
    }
    if (type === "testResult" && !right && !marked) {
        label.className = "correct no";
    }
    return label;
}
function createBreak() {
    return document.createElement('br');
}
function createSubmit() {
    let submit = document.createElement('input');
    submit.type = "submit";
    submit.value = "Vyhodnotit test";
    submit.className = "submit-button";
    return submit;
}


