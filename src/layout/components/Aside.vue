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
				:default-active="activeMenu"
				:collapse="isCollapse"
				text-color="#4A4A4A"
				active-text-color="#409EFF"
				background-color="#f9fafb"
				:unique-opened="true"
				router
				@select="handleSelect"
			>
				<el-menu-item index="/home">
					<i class="iconfont icon-home"></i>
					<template #title>
						<span class="menu-title">首页</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/knowledgeBase">
					<i class="iconfont icon-menucaidan2"></i>
					<template #title>
						<span class="menu-title">知识库</span>
					</template>
				</el-menu-item>
				<el-sub-menu index="tools">
					<template #title>
						<i class="iconfont icon-tubiao_gongjuxiang"></i>
						<span class="menu-title">工具箱</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/tools/video">
							<span class="menu-title">视频</span>
						</el-menu-item>
						<el-menu-item index="/tools/image">
							<span class="menu-title">图片</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
			</el-menu>
			<div
				class="collapse-icon"
				@click="isCollapse = !isCollapse"
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
	import { ref, computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { Expand, Fold } from '@element-plus/icons-vue';
	import { useMenuStore } from '@/store/modules/menu';

	const route = useRoute();
	const menuStore = useMenuStore();
	const isCollapse = ref(false);
	const windowHeight = ref(0);

	// 菜单路径与标题的映射
	const menuTitles: Record<string, string> = {
		'/home': '首页',
		'/knowledgeBase': '知识库',
		'/tools/video': '视频',
		'/tools/image': '图片'
	};

	onMounted(() => {
		windowHeight.value =
			document.documentElement.clientHeight || document.body.clientHeight;
		// 初始化当前页面标题
		const currentPath = route.path;
		menuStore.setCurrentTitle(menuTitles[currentPath] || '首页');
	});

	const activeMenu = computed(() => route.path);

	// 处理菜单选择
	const handleSelect = (index: string) => {
		menuStore.setCurrentTitle(menuTitles[index] || '首页');
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
		max-width: 260px;
	}

	.menu-title {
	}
</style>
