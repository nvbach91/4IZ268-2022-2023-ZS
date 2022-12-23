<template>
	<div class="home">
		<h1>Vítejte v mém testeru</h1>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Response, Question } from "../classes";
import { get } from "../common";
import HelloWorld from "@/components/TestMain.vue"; // @ is an alias to /src

@Options({
	components: {
		HelloWorld,
	},
})
export default class HomeView extends Vue {
	// questions = null as Question[] | null;
	// async mounted() {
	//   const { data, error }: { data: Question[] | null; error: string | null } =
	//     await get<Question[]>({
	//       url: "getTests",
	//     });
	//   if (error) console.log("AAA");
	//   this.questions = data;
	// }
}
</script>
