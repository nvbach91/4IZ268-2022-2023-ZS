<template>
	<div v-if="error !== null">Nastala chyba: {{ error }}</div>
	<LoaderComponent v-else-if="questions === null"></LoaderComponent>
	<div v-else class="wrapper">
		<div>
			<h2>Procvičování</h2>
			<button @click="startTest(false)" class="btn">Začít procvičovat</button>
		</div>
		<div>
			<h2>Test</h2>
			Počet otázek<input class="number-input" type="number" v-model="numberOfQuestions">
			<button @click="startTest(true)" class="btn">Začít test</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Question } from '@/classes'
import { defineComponent } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import { sleep, get, saveTestPreference,shuffle } from '../common'

export default defineComponent({
	components: {
		LoaderComponent,
	},
	data() {
		return {
			questions: null as Question[] | null,
			testName: "",
			error: null as string | null,
			numberOfQuestions: 0,
		}
	},
	watch: {
		"numberOfQuestions": function(){
			this.numberOfQuestions = Math.max(Math.min(this.numberOfQuestions, this.questions?.length ?? 0), 1)
		},
	},
	async mounted() {
		this.testName = (this.$route.params.url ?? []).toString() ?? "";
		const params = `?url=${this.testName}`;
		const {
			data,
			error,
		}: { data: Question[] | null; error: string | null } = await get<
			Question[]
		>({
			endpoint: 'getTest',
			params,
		})

		if (error) this.error = error

		this.questions = shuffle(data);

		if(this.questions == undefined || this.questions?.length == 0) this.error = "Test nemá otázky";
		else this.numberOfQuestions = Math.min(this.questions.length, 10);

	},
	methods: {
		startTest(isReal: boolean){
			if(this.questions == null) return;
			
			saveTestPreference(isReal, this.numberOfQuestions, this.questions);

			this.$router.push(`/test/${this.testName}`);
		}
	}
})
</script>

<style lang="less" scoped>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;

	gap: 20px;
	>div{
		padding: 10px;;
	}

	.number-input{
		width: 40px;
		text-align: center;
		padding: 0;
		border: none;
		border-bottom: 1px solid black;
		margin: 0 10px;
	}

	.number-input:focus{
		outline: none;
	}
}
</style>
