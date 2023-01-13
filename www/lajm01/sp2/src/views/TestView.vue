<template>
	<div v-if="testSettings == null">Nastala chyba při načítání</div>
	<div v-else-if="currentQuestion != null" class="wrapper">
		Uběhlo {{ formattedElapsedTime }} Zbývajících otázek: {{ questions?.length + 1 ?? 1 }}
		<test-main :show-right="isRight != null" :question="currentQuestion" @answersSelected="(x) => validateAnswers(x)"></test-main>
		<div v-if="isRight != null">
			<p>
				Odpověď byla
				<span class="answer-info-text" :style="{ color: isRight ? 'green' : 'red' }">{{ isRight ? 'Správně' : 'Špatně' }}!</span>
			</p>
			<button @click="loadNextQuestion" class="btn absolute-btn">Další</button>
		</div>
	</div>
	<div v-else>
		<h2>Test dokončen.</h2>
		<h3>Úspěšnost {{ successRate }}%</h3>
	</div>
</template>

<script lang="ts">
import { Question, SerializedTest, TestSettings } from '@/classes';
import TestMain from '@/components/TestMain.vue';
import { defineComponent } from 'vue';
// import LoaderComponent from '@/components/LoaderComponent.vue'
import { sleep, formatSeconds, copy, saveTestResult, getTestSettings, getTestID, saveTest, shuffle } from '../common';
import { toRaw } from 'vue';
import { tsParameterProperty } from '@babel/types';

export default defineComponent({
	components: {
		TestMain,
	},
	data() {
		return {
			questions: null as Question[] | null | undefined,
			error: null as string | null,
			currentQuestion: null as Question | null | undefined,
			isRight: null as boolean | null,
			answeredRight: 0 as number,
			answeredWrong: 0 as number,
			testName: '',
			testSettings: null as TestSettings | null,
			testId: null as number | null,
			elapsedSeconds: 0 as number,
			timer: null as any | null,
		};
	},
	async mounted() {
		this.testName = (this.$route.params.url ?? []).toString() ?? '';

		const restoredTest = localStorage.getItem('restoredTest');
		if (restoredTest) {
			const parsedRestoredTest = JSON.parse(restoredTest) as SerializedTest;

			this.answeredRight = parsedRestoredTest.answeredRight;
			this.answeredWrong = parsedRestoredTest.answeredWrong;
			this.testSettings = parsedRestoredTest.testSettings;
			this.testId = parsedRestoredTest.idTest;
			this.elapsedSeconds = parsedRestoredTest.elapsedSeconds;
			this.questions = copy(parsedRestoredTest.questions);

			localStorage.removeItem('restoredTest');
		} else {
			this.testSettings = getTestSettings();
			this.questions = copy(this.testSettings?.questions);
		}

		this.toggleTime(true);

		if (this.testSettings?.isTest && this.testId == null) this.testId = getTestID();

		if (this.questions != undefined) this.loadNextQuestion();
	},
	onDestroy() {
		this.toggleTime(false);
	},
	methods: {
		toggleTime(start: boolean) {
			if (start) {
				if (!this.timer) {
					this.timer = setInterval(() => {
						this.elapsedSeconds += 1;
					}, 1000);
				}
			} else {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		validateAnswers(event: Event) {
			const answers = (toRaw(event) as unknown as number[]).sort();

			const rightAnswers = (this.currentQuestion?.answers.filter((answer) => answer.isRight).map((x) => x.id) ?? []).sort();

			this.isRight = rightAnswers.join('') == answers.join('');

			if (!this.currentQuestion) return;

			if (this.isRight) {
				this.answeredRight++;
			} else {
				this.answeredWrong++;
			}

			if (this.testId && this.testSettings && this.testSettings.isTest)
				saveTest(this.testId, this.testName, this.questions ?? [], this.answeredRight, this.answeredWrong, this.testSettings, this.elapsedSeconds);
		},
		loadNextQuestion() {
			this.isRight = null;

			if (this.answeredRight + this.answeredWrong < (this.testSettings?.numberOfQuestions ?? 0)) {
				const tmp = this.questions?.pop();

				if (tmp != null) tmp.answers = shuffle(copy(tmp.answers));

				this.currentQuestion = tmp;
			} else this.currentQuestion = null;

			if (this.currentQuestion == null && this.testSettings?.isTest) {
				localStorage.removeItem(`savedTest_${this.testId}`);
				saveTestResult(this.testName, this.successRate, this.elapsedSeconds);
			}
		},
	},
	computed: {
		formattedElapsedTime(): string {
			return formatSeconds(this.elapsedSeconds);
		},
		successRate(): number {
			if (this.answeredRight + this.answeredWrong == 0) return 0;
			return ~~((this.answeredRight / (this.answeredRight + this.answeredWrong)) * 100);
		},
	},
});
</script>

<style lang="less">
.wrapper {
}

.answer-info-text {
	font-weight: 600;
}
</style>
