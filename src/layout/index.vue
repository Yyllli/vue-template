<template>
	<div
		class="app-wrapper"
		:class="[true ? '' : 'hide-sidebar']"
	>
		<div class="main-container">
			<!-- 左侧菜单 -->
			<div><Aside /></div>
			<!-- 系统主区 -->
			<div class="main">
				<div class="radius">
					<div class="fixed-header">
						<!-- 顶部导航 -->
						<Header />
					</div>
					<div>
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Header from './components/Header.vue';
	import Aside from './components/Aside.vue';
</script>

<style lang="less" scoped>
	// 外层容器
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		&:after {
			visibility: hidden;
			display: block;
			font-size: 0;
			content: ' ';
			clear: both;
			height: 0;
		}
	}

	// 固定表头
	.fixed-header {
		// position: fixed;
		// top: 0;
		// right: 0;
		// z-index: 9;
		// width: 100%;
		transition: width 0.28s;
	}

	// 主要容器
	.main-container {
		// height: calc(100vh - 60px);
		height: 100vh;
		position: relative;
		overflow: hidden;
		display: flex;
		.main {
			width: 100%;
			height: 100%;
			// padding: 30px;
			padding: 15px 10px 20px 0;
			.radius {
				border-radius: 60px;
				height: 100%;
				border: 1px solid #e5e7eb;
				background-color: #fff;
			}
		}
	}

	.header {
		height: 60px;
		overflow: hidden;
		position: relative;
		// background: #0f1d37;
		display: flex;
	}
</style>
