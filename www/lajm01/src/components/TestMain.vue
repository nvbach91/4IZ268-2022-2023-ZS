<template>
	<div class="wrapper">
		<div class="question">
			<h1>{{ question.body }}</h1>
			<img v-if="question.image" :src="question.image" />
		</div>
		<div class="answers">
			<button
				v-for="answer in question.answers"
				:key="answer.body"
				@click="selectAnswer(answer.id)"
			>
				{{ selectedAnswers.includes(answer.id) ? "(vybrano)" : "" }}
				{{ answer.body }}
			</button>
		</div>
		<button @click="$emit('answersSelected', selectedAnswers)">
			Odpovědět
		</button>
	</div>
</template>

<script lang="ts">
import { Question } from "@/classes";
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		question: Question,
		required: true,
	},
})
export default class TestMain extends Vue {
	question: Question | undefined;
	selectedAnswers = [] as number[];

	mounted(){
		this.$watch("question", () => {
			this.selectedAnswers = [];
		})
	}

	private selectAnswer(id: number) {
		if (this.selectedAnswers.includes(id)) {
			this.selectedAnswers = this.selectedAnswers.filter((x) => x != id);
		} else {
			this.selectedAnswers.push(id);
		}
		//this.$emit("selectedAnswer", id);
	}
}
</script>

<style scoped lang="less"></style>
