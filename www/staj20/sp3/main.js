window.addEventListener('load', function () {
    callDrive("selectTest");
});
function createTestList(files) {
    const testFiles = document.getElementById("test-files");
    let testFileArray = [];
    if (files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
            testFileArray.push(createTestFile(files[i].id, files[i].name));
        }
        testFiles.append(...testFileArray);
    }
    
}
function createTestText(id, filename) {
    let testText = document.createElement("pre");
    testText.id = id + "-test";
    testText.style = "white-space: pre-wrap;";
    return testText;
}
function createTestFile(id, filename) {
    let testFile = document.createElement("button");
    testFile.innerHTML = filename;
    testFile.addEventListener("click", function () {
        localStorage.setItem("id",id);
        callDrive("selectedTest", id);
        let testText = createTestText(id, filename);
        let preElements = document.querySelector("pre");
        if(preElements){
        preElements.remove();
        }

        testFile.parentNode.append(testText);

    });
    //testFile.href = "../selectedTest/?name=" + btoa(filename) + "&id=" + id;
    testFile.className = "link-button";
    return testFile;
}
function createSelectedTest(file) {
    text = file.body;
    id = localStorage.getItem("id");
    const testText = document.getElementById(id + "-test");
    testText.innerHTML = text;
    //localStorage.setItem("text", text);
    //const downloadTest = document.getElementById("dl-test");
    //downloadTest.href = "data:attachment/text," + encodeURI(text);
    //downloadTest.target = "_blank";
}
