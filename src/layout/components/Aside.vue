<template>
	<el-scrollbar>
		<div
			class="aside"
			:style="{ height: windowHeight + 'px' }"
		>
			<div>
				<img
					src="@/assets/image/迅智魔方_画板 1.png"
					style="width: 205px"
					v-if="!isCollapse"
					alt=""
				/>
				<img
					src="@/assets/image/迅智魔方-02.png"
					style="width: 64px"
					alt=""
					v-else
				/>
			</div>
			<el-menu
				default-active="1"
				:collapse="isCollapse"
				text-color="#4A4A4A"
				active-text-color="#409EFF"
				:unique-opened="true"
			>
				<el-menu-item index="1">
					<i class="iconfont icon-home"></i>
					<template #title>
						<span class="menu-title">首页</span>
					</template>
				</el-menu-item>
				<el-menu-item index="2">
					<i class="iconfont icon-menucaidan2"></i>
					<template #title>
						<span class="menu-title">知识库</span>
					</template>
				</el-menu-item>
				<el-sub-menu index="3">
					<template #title>
						<i class="iconfont icon-tubiao_gongjuxiang"></i>
						<span class="menu-title">工具箱</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<span class="menu-title">视频</span>
						</el-menu-item>
						<el-menu-item index="1-2">
							<span class="menu-title">图片</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
			</el-menu>
			<div
				class="collapse-icon"
				@click="toggleClick"
			>
				<el-icon
					v-if="!isCollapse"
					style="font-size: 20px"
					><Fold
				/></el-icon>
				<el-icon
					v-else
					style="font-size: 20px"
					><Expand
				/></el-icon>
			</div>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
	import { ref, reactive, onBeforeMount } from 'vue';
	const windowHeight = ref(0);
	onBeforeMount(() => {
		windowHeight.value =
			document.documentElement.clientHeight || document.body.clientHeight;
	});
	interface Tree {
		id: string;
		label: string;
		icon?: string;
		activeIcon?: string;
		children?: Tree[];
	}

	const menu = reactive<Tree[]>([
		{
			id: 'home',
			label: '首页',
			icon: 'icon-home',
			activeIcon: 'icon-my_light-copy'
		},
		{
			id: 'repository',
			label: '知识库',
			icon: 'icon-menucaidan2',
			activeIcon: 'icon-menu-copy'
		},
		{
			id: 'toolbox',
			label: '工具箱',
			icon: 'icon-tubiao_gongjuxiang',
			activeIcon: 'icon-tubiao_gongjuxiang',
			children: [
				{
					id: '视频',
					label: '视频'
				}
			]
		}
	]);

	const id = ref('home');

	const handleNodeClick = (data: Tree) => {
		// console.log(data);
		id.value = data.id;
	};

	const isCollapse = ref(false);
	const toggleClick = () => {
		isCollapse.value = !isCollapse.value;
	};
</script>

<style lang="less" scoped>
	:deep(.el-menu) {
		border: none;
	}
	.sidebar-container {
		background-color: rgb(255, 255, 255);
		position: relative;
		transition: width 0.28s;
		width: 205px !important;
		height: calc(100vh - 60px);
		overflow: hidden;
		.el-menu {
			border: none;
			height: 100%;
			width: 100% !important;

			.el-sub-menu__title {
				padding-left: 17px !important;
				padding-right: 0 !important;
				font-weight: 600;
				height: 50px;
				line-height: 50px;
			}

			.is-active .el-sub-menu__title,
			.el-sub-menu__title:hover {
				span {
					color: #409eff !important;
				}
				svg {
					color: #409eff !important;
				}
			}
			.is-active .el-sub-menu__title:hover {
				background-color: #fff !important;
			}
			.el-sub-menu__title:hover {
				background-color: #eff6ff !important;
			}

			.el-menu-item {
				padding-left: 17px !important;
				padding-right: 0 !important;
				height: 50px;
				line-height: 50px;
			}

			.el-menu-item.is-active,
			.el-menu-item:hover {
				background-color: #eff6ff !important;
				svg {
					color: #409eff !important;
				}
			}

			.el-menu-item.is-active:after {
				position: absolute;
				right: -2px;
				width: 6px;
				height: 100%;
				background-color: #409eff;
				border-radius: 10px;
				content: '';
			}
		}
	}
	.collapse-icon {
		width: 30px;
		height: 30px;
		position: fixed;
		bottom: 30px;
		left: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		cursor: pointer;
	}

	.hide-sidebar {
		.sidebar-container {
			width: 54px !important;

			.el-sub-menu__title {
				span {
					display: none !important;
				}
			}
			.el-menu-item {
				span {
					display: none !important;
				}
			}
		}
	}

	.iconfont {
		margin: 0 12px 0 6px;
	}

	.aside {
		// min-width: 150px;
		max-width: 260px;
		// width: 18vw;
	}

	.menu-title {
	}
</style>
