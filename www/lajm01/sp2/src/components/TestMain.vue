<template>
	<div class="wrapper">
		<div class="question">
			<h1>{{ question.body }}</h1>
			<img v-if="question.image" :src="question.image" class="test-img" />
		</div>
		<div class="answers">
			<button
				v-for="answer in question.answers"
				:key="answer.body"
				:disabled="showRight"
				@click="selectAnswer(answer.id)"
				:class="{
					selected: selectedAnswers.includes(answer.id),
					isRight: showRight && isAnswerRight(answer),
					isWrong: showRight && !isAnswerRight(answer),
				}"
			>
				{{ answer.body }}
			</button>
		</div>
		<button
			v-if="!showRight"
			@click="$emit('answersSelected', selectedAnswers)"
			class="btn"
		>
			Odpovědět
		</button>
	</div>
</template>

<script lang="ts">
import { Answer, Question } from "@/classes";
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		question:{
			type: Question,
			required: true,
		},
		showRight: {
			type: Boolean
		}
	},
	data(){
		return {
			selectedAnswers: [] as number[]
		}
	},
	mounted(){
		this.$watch("question", () => {
			this.selectedAnswers = [];
		})
	},
	methods: {
		selectAnswer(id: number) {
			if (this.selectedAnswers.includes(id)) {
				this.selectedAnswers = this.selectedAnswers.filter((x) => x != id);
			} else {
				this.selectedAnswers.push(id);
			}
		},
		isAnswerRight(answer: Answer){
			const shouldBeSelected = this.question.answers.find(x => x.id == answer.id)?.isRight;
			const isSelected = this.selectedAnswers.includes(answer.id);
			return shouldBeSelected == isSelected;
		}
	}
})
</script>

<style scoped lang="less">
.test-img {
	max-height: 40vh;
}
.answers {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	margin-top: 30px;
	margin-bottom: 30px;

	button {
		padding: 10px;
		width: min(650px, 60%);
	}

	.selected {
		border: 2px solid rgba(179, 58, 255, 0.754);
	}

	.isRight {
		background-color: green;
	}

	.isWrong {
		background-color: red;
	}
}
</style>

