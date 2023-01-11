<template>
	<div class="wrapper">
		<ul v-if="testData.length > 0">
			<li v-for="(test, index) in testData" :key="index" @click="restoreTest(test)">({{ test.idTest }}) - {{ test.testName }} - {{ test.questions.length }} zbývají <button class="btn">Začít</button></li>
		</ul>
		<h2 v-else>
			Nemáte žádné rozpracované testy
		</h2>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import LoaderComponent from '@/components/LoaderComponent.vue';
import { sleep, get, getUnfinishedTests } from '../common';
import { SerializedTest } from '@/classes'

export default defineComponent({
	data() {
		return {
			testData: [] as SerializedTest[]
		}
	},
	components: {
		// LoaderComponent,
	},
	async mounted() {
		this.testData = getUnfinishedTests();
	},
	methods: {
		restoreTest(test: SerializedTest){
			localStorage.setItem("restoredTest", JSON.stringify(test));
			this.$router.push(`/test/${test.testName}`)
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
		display: flex;
    	justify-content: center;
		align-items: center;
		gap: 20px;

		.btn{
			margin: 0;
		}
		margin-bottom: 20px;
	}
}
</style>
