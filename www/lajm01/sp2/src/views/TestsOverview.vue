<template>
	<div v-if="error !== null">Nastala chyba při načítání</div>
	<LoaderComponent v-else-if="tests === null"></LoaderComponent>
	<div v-else class="test-wrapper">
		<a :href="'/test/select/' + test.url" v-for="test in tests" class="test" :key="test.url" :style="{ 'background-image': `url('${test.img}')` }">
			{{ test.name }}
		</a>
	</div>
</template>

<script lang="ts">
import { Test, TestSettings } from '@/classes';
import { defineComponent } from 'vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { sleep, get } from '../common';

export default defineComponent({
	data() {
		return {
			tests: null as Test[] | null,
			error: null as string | null,
			testSettings: null as TestSettings | null
		};
	},
	components: {
		LoaderComponent,
	},
	async mounted() {
		const { data, error }: { data: Test[] | null; error: string | null } = await get<Test[]>({
			endpoint: 'getTests',
		});

		if (error) this.error = error;
		this.tests = data;
	},
});
</script>

<style lang="less">
.test-wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;

	.test {
		width: 300px;
		display: flex;
		height: 100px;
		background-color: #cecece;
		border-radius: 10px;
		background-size: 100% 100%;
		justify-content: center;
		align-items: center;
		color: black;
		background-blend-mode: overlay;
		text-decoration: none;
	}
}
</style>
