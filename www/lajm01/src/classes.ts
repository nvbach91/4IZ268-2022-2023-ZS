class Question {
  public id: number;
  public body: string;
  public image: string | null;
  public answers: [Answer];

  public constructor(
  	id: number,
  	body: string,
  	answers: [Answer],
  	image: string | null
  ) {
  	this.id = id;
  	this.body = body;
  	this.answers = answers;
  	this.image = image;
  }
}

class Answer {
  public id: number;
  public body: string;
  public isRight: boolean;

  public constructor(id: number, body: string, isRight: boolean | null) {
  	this.id = id;
  	this.body = body;
  	this.isRight = isRight ?? false;
  }
}

class Response<A> {
  public data: A | null;
  public error: string | null;

  public constructor(data: A | null, error: string | null) {
  	this.data = data ?? null;
  	this.error = error ?? null;
  }
}

type Test = {
  name: string;
  url: string;
  img: string;
};

class TestRequest {
  public url: string;
  public constructor(url: string) {
  	this.url = url;
  }
}

export { Answer, Question, Response, TestRequest, Test };
