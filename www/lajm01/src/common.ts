import { Response } from "./classes";

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

export { sleep, get };
