import { Question, Response, TestResult, TestSettings,SerializedTest } from "./classes";

async function sleep(time: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

type GetRequest = {
  endpoint: string;
} & {
  params?: string | null;
};

function get<TResponse>(request: GetRequest): Promise<Response<TResponse>> {
	const options = {
		method: "get",
		headers: {
			Accept: "application/json",
		},
	};

	return fetch(
		`https://desu.lajtkep.dev/api/${request.endpoint}.php${request.params ?? ""}`,
		options
	).then((response) => response.json());
}

function shuffle(array: any) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }

function getTestResults(): TestResult[]{
	const storageData = localStorage.getItem("testResults") ?? "[]";
	return JSON.parse(storageData)
}

function saveTestResult(testName: string, successRate: number){
	const parsedStorageData = getTestResults();
	
	parsedStorageData.push({
		testName,
		successRate
	})

	localStorage.setItem("testResults", JSON.stringify(parsedStorageData));
}

function saveTestPreference(isTest: boolean, numberOfQuestions: number, questions: Question[]){
	localStorage.setItem("testPreference", JSON.stringify({
		isTest,
		numberOfQuestions,
		questions
	}));
}

function getTestSettings():(TestSettings|null){
	const storageData = localStorage.getItem("testPreference") || "{}";
	localStorage.setItem("testPreference", "{}");

	return storageData == "{}" ? null : JSON.parse(storageData);
}

function saveTest(idTest: number, testName: string, questions: Question[], answeredRight: number, answeredWrong: number, testSettings: TestSettings){
	
	localStorage.setItem(`savedTest_${idTest}`, JSON.stringify({
		idTest,
		testName,
		questions,
		answeredRight,
		answeredWrong,
		testSettings
	}));
}

function getUnfinishedTests(): SerializedTest[]{
	const tests = [] as SerializedTest[];
	
	Object.keys(localStorage).forEach(key => {
		if(key.startsWith("savedTest_")){
			tests.push(JSON.parse(localStorage.getItem(key) ?? ""));
		}
	});

	return tests;
}

function getTestID(){
	const storageData = parseInt(localStorage.getItem("lastTestID") || "0");
	localStorage.setItem("lastTestID", (storageData+1).toString());
	return storageData;
}

function copy(object:any){
	return JSON.parse(JSON.stringify(object));
}

export { sleep, get, copy, saveTestResult, getTestResults, saveTestPreference, getTestSettings, getTestID, saveTest,getUnfinishedTests,shuffle };
