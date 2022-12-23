<template>
	<div v-if="error !== null">Nastala chyba při načítání</div>
	<loader v-else-if="questions === null"></loader>
	<div v-else-if="currentQuestion != null" class="wrapper">
		<test-main
			v-if="isRight == null"
			:question="currentQuestion"
			@answersSelected="(x) => validateAnswers(x)"
		></test-main>
		<div v-else>
			Odpověď je {{ isRight }}
			<button @click="loadNextQuestion">
			Další
			</button>
		</div>
		
	</div>
	<div v-else>
		test dont
	</div>
</template>

<script lang="ts">
import { Question } from "@/classes";
import TestMain from "@/components/TestMain.vue";
import { Options, Vue } from "vue-class-component";
import Loader from "@/components/Loader.vue";
import { sleep, get } from "../common";
import { toRaw } from "@vue/reactivity";

@Options({
	components: {
		TestMain,
		Loader,
	},
})
export default class TestVue extends Vue {
	questions = null as Question[] | null;
	error = null as string | null;
	currentQuestion = null as Question | null | undefined;
	isRight = null as boolean | null;

	async mounted() {
		const params = `?url=${this.$route.params.url}`;
		const {
			data,
			error,
		}: { data: Question[] | null; error: string | null } = await get<
			Question[]
		>({
			endpoint: "getTest",
			params,
		});

		if (error) this.error = error;

		this.questions = data;

		this.loadNextQuestion();
	}

	private validateAnswers(event: Event) {
		const answers = (toRaw(event) as unknown as number[]).sort();

		const rightAnswers = (this.currentQuestion?.answers.filter(answer => answer.isRight).map(x => x.id) ?? []).sort();

		this.isRight = rightAnswers.join("") == answers.join("")

	}

	private loadNextQuestion(){
		this.isRight = null;
		this.currentQuestion = this.questions?.pop();
	}
}
</script>

<style lang="less">
.wrapper {
}
</style>
