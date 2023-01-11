<template>
	<div class="wrapper">
		<ul v-if="testData.length > 0">
			<li v-for="(test, index) in testData" :key="index" :style="{ '--bg-color': getColor(test.successRate) }">
				{{ test.testName }} - {{ test.successRate }}%
			</li>
		</ul>
		<h2 v-else>
			Nemáte ještě žádné výsledky
		</h2>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import LoaderComponent from '@/components/LoaderComponent.vue';
import { sleep, get, getTestResults } from '../common';
import { TestResult } from '@/classes'

export default defineComponent({
	data() {
		return {
			testData: [] as TestResult[]
		}
	},
	components: {
		// LoaderComponent,
	},
	async mounted() {
		this.testData = getTestResults();
	},
	methods:{
		getColor(score:number){
			if(score >= 80) return "green";
			else if(score >= 40) return "orange";
			return "red";
		}
	}
});
</script>

<style lang="less" scoped>
.wrapper {
	ul{
		padding: 0;
	}
	li{
		list-style: none;
		background-color: var(--bg-color, rgb(207, 207, 207));
		margin-bottom: 10px;
		border-radius: 10px;
		padding: 20px;
		color:black;
	}
}
</style>
