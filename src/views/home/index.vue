<template>
	<div
		class="container"
		:style="{ height: windowHeight + 'px' }"
	>
		<div class="input-content">
			<SearchInput />
		</div>
	</div>
</template>

<script setup lang="ts">
	import SearchInput from './components/searchInput.vue';
	import { ref, onBeforeMount } from 'vue';
	const windowHeight = ref(0);
	onBeforeMount(() => {
		windowHeight.value =
			(document.documentElement.clientHeight ||
				document.body.clientHeight) - 105;
	});
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		.input-content {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			padding-bottom: 30px;
		}
	}
</style>
