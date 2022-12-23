<template>
	<div v-if="error !== null">Nastala chyba při načítání</div>
	<loader v-else-if="tests === null"></loader>
	<div v-else class="test-wrapper">
		<a
			:href="'/test/' + test.url"
			v-for="test in tests"
			class="test"
			:key="test.url"
			:style="{ 'background-image': `url('${test.img}')` }"
		>
			{{ test.name }}
		</a>
	</div>
</template>

<script lang="ts">
import { Test } from "@/classes";
import { Options, Vue } from "vue-class-component";
import Loader from "@/components/Loader.vue";
import { sleep, get } from "../common";

@Options({
	components: {
		Loader,
	},
})
export default class TestVue extends Vue {
	tests = null as Test[] | null;
	error = null as string | null;

	async mounted() {
		const { data, error }: { data: Test[] | null; error: string | null } =
			await get<Test[]>({
				endpoint: "getTests",
			});
		if (error) this.error = error;
		this.tests = data;
	}
}
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
		height: 100px;
		background-color: antiquewhite;
		border-radius: 10px;
		background-size: 100% 100%;
	}
}
</style>
