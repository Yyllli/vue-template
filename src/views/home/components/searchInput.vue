<template>
	<div class="search-container">
		<div class="search-input">
			<div class="welcome-tip">智能创作助手，助您高效生成精准内容</div>
			<!-- 顶部标签栏 -->
			<el-tabs
				v-model="activeTab"
				class="tab-group"
			>
				<el-tab-pane
					label="改写助手"
					name="rewrite"
				/>
				<el-tab-pane
					label="文案工坊"
					name="content"
				/>
				<el-tab-pane
					label="分镜速绘"
					name="storyboard"
				/>
			</el-tabs>

			<!-- 搜索区域 -->
			<div class="search-area">
				<div class="all-input">
					<textarea
						ref="textareaRef"
						v-model="searchText"
						placeholder="问我一些问题"
						class="search-input"
						@input="adjustHeight"
					/>
					<div style="position: relative">
						<el-button
							class="btn knowledge-base"
							text
						>
							<i class="iconfont icon-tushuguan"></i>
							<span>知识库</span>
						</el-button>
						<el-button
							class="btn active-knowledge-base"
							text
						>
							<!-- <i class="iconfont icon-tushuguan"></i> -->
							<span>需要原视频截图</span>
						</el-button>

						<el-popconfirm
							title="是否需要在文案生成之后生成分镜头图片?"
							width="320"
							v-if="activeTab == 'rewrite'"
						>
							<template #reference>
								<el-button
									class="back-to-top"
									circle
									@click="scrollToTop"
								>
									<el-icon class="icon"><Top /></el-icon>
								</el-button>
							</template>
						</el-popconfirm>
						<el-button
							class="back-to-top"
							circle
							@click="scrollToTop"
							v-else
						>
							<el-icon class="icon"><Top /></el-icon>
						</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const activeTab = ref('rewrite');
	const searchText = ref('');
	const textareaRef = ref<HTMLTextAreaElement>();

	const adjustHeight = () => {
		const textarea = textareaRef.value;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
		}
	};

	onMounted(() => {
		adjustHeight();
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<style scoped lang="less">
	.search-container {
		width: 100%;
		background: var(--el-bg-color);
		border-radius: 12px;
		overflow: hidden;
	}

	:deep(.tab-group) {
		padding: 0;
		margin-top: 20px;
		display: flex;
		justify-content: center;

		.el-tabs__header {
			margin: 0;
			border: none;
		}

		.el-tabs__nav-wrap {
			&::after {
				display: none;
			}
		}

		.el-tabs__nav {
			display: flex;
			justify-content: center;
			gap: 48px;
			float: none;
			position: relative;
		}

		.el-tabs__item {
			font-size: 16px;
			color: #000;
			padding: 0 0 20px 0;
			height: auto;
			line-height: 1;
			border: none;
			font-weight: 400;

			&.is-active {
				color: #409eff;
				font-weight: 500;
			}
		}

		.el-tabs__content {
			display: none;
		}

		.el-tabs__active-bar {
			height: 3px;
			background-color: #409eff;
			bottom: 12px;
		}
	}

	.search-area {
		padding: 0px 10% 20px 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		.all-input {
			width: 90%;
			border: 1px solid #e9ecef;
			padding: 10px 20px;
			border-radius: 33px;
			.search-input {
				width: 100%;
				resize: none;
				border: none;
				min-height: 24px;
				max-height: 300px;
				overflow-y: auto;
				line-height: 1.5;
				font-size: 16px;
				word-break: break-word;
				white-space: pre-wrap;
				margin-bottom: 12px;
				padding: 0;
				font-family: inherit;
				&:focus {
					outline: none;
				}
				&::placeholder {
					color: #999;
				}
			}

			.btn {
				height: 35px;
			}
		}
	}

	:deep(.search-input .el-input__wrapper) {
		padding: 8px 16px;
		border-radius: 12px;
	}

	:deep(.search-input .el-input__inner) {
		font-size: 16px;
		height: 24px;
		color: var(--el-text-color-regular);
	}

	.knowledge-base {
		margin-top: 12px;
		padding: 6px 20px;
		border: 1px solid #e9ecef;
		border-radius: 20px;
		font-size: 14px;
		color: var(--el-text-color-regular);
		cursor: pointer;
		.iconfont {
			margin-right: 4px;
			font-size: 16px;
			color: #4a4a4a;
		}
		span {
			color: #6c757d;
		}
	}

	.active-knowledge-base {
		margin-top: 12px;
		padding: 6px 20px;
		border: 1px solid rgba(0, 122, 255, 0.15);
		border-radius: 20px;
		font-size: 14px;
		color: #5a9cf8;
		cursor: pointer;
		.iconfont {
			margin-right: 4px;
			font-size: 16px;
			color: #4a4a4a;
		}
		span {
			color: #5a9cf8;
		}
	}

	.back-to-top {
		position: absolute;
		bottom: 0px;
		right: 0px;
		width: 46px;
		height: 46px;
		padding: 0;
		font-size: 28px;
		color: var(--el-color-primary);
		background: var(--el-bg-color);
		box-shadow: var(--el-box-shadow-light);
	}

	.welcome-tip {
		text-align: center;
		color: #6c757d;
		font-size: 22px;
		letter-spacing: 2px;
	}
</style>
