<template>
	<div class="knowledge-base">
		<div class="knowledge-header">
			<el-button
				class="import-btn"
				round
				>导入知识</el-button
			>
		</div>
		<div class="knowledge-content">
			<el-row :gutter="20">
				<el-col
					:span="6"
					v-for="(item, index) in cardList"
					:key="index"
				>
					<el-card
						class="knowledge-card"
						shadow="hover"
					>
						<div class="card-content">
							<div
								class="card-image"
								:style="{ backgroundColor: '#E91E63' }"
							>
								<img
									src="@/assets/image/840E8534-5243-4ED1-9256-B22B937C6A08_1_105_c.jpeg"
									:alt="item.title"
								/>
							</div>
							<div class="card-info">
								<div class="card-header">
									<h3>{{ item.title }}</h3>
									<el-dropdown>
										<span class="el-dropdown-link">
											<el-icon><More /></el-icon>
										</span>
										<template #dropdown>
											<el-dropdown-menu>
												<el-dropdown-item
													>编辑</el-dropdown-item
												>
												<el-dropdown-item
													>删除</el-dropdown-item
												>
											</el-dropdown-menu>
										</template>
									</el-dropdown>
								</div>
								<p class="card-description">
									{{ item.description }}
								</p>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { More } from '@element-plus/icons-vue';

	const cardList = ref([
		{
			title: '文案创作',
			description:
				'FoloToy 智能体模板 该模板在日常聊天的基础上，增加了控制玩具功能。',
			image: '@/assets/image/840E8534-5243-4ED1-9256-B22B937C6A08_1_105_c.jpeg'
		},
		{
			title: '文案创作',
			description:
				'FoloToy 智能体模板 该模板在日常聊天的基础上，增加了控制玩具功能。',
			image: '@/assets/image/840E8534-5243-4ED1-9256-B22B937C6A08_1_105_c.jpeg'
		}
	]);
</script>

<style scoped lang="less">
	.knowledge-base {
		padding: 20px;

		.knowledge-header {
			margin-bottom: 24px;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			h2 {
				font-size: 24px;
				font-weight: 600;
				color: #333;
				margin: 0;
			}

			.import-btn {
				padding: 8px 24px;
				font-size: 14px;
				border-radius: 20px;
				background: linear-gradient(45deg, #536af6 0%, #758bff 100%);
				border: none;
				color: #fff;
				margin-right: 40px;

				&:hover {
					background: linear-gradient(
						45deg,
						#758bff 0%,
						#536af6 100%
					);
				}

				&:focus {
					outline: none;
				}
			}
		}

		.knowledge-content {
			.el-row {
				margin: -10px;
				.el-col {
					padding: 10px;
				}
			}
		}

		.knowledge-card {
			border-radius: 16px;
			overflow: hidden;
			transition: all 0.3s ease;
			border: 1px solid #e4e7ed;
			background: #fff;

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
			}

			&:focus {
				outline: none;
			}

			:deep(.el-card__body) {
				padding: 0;
			}

			.card-content {
				display: flex;
				flex-direction: column;

				.card-image {
					width: 100%;
					height: 160px;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 20px;
					box-sizing: border-box;
					border-radius: 16px 16px 0 0;
					background: linear-gradient(
						45deg,
						#536af6 0%,
						#758bff 100%
					);

					img {
						height: 100%;
						width: auto;
						object-fit: contain;
						filter: brightness(1.02);
					}
				}

				.card-info {
					padding: 16px 20px;

					.card-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 8px;

						h3 {
							font-size: 18px;
							font-weight: 600;
							color: #333;
							margin: 0;
						}

						.el-dropdown {
							cursor: pointer;

							&:focus {
								outline: none;
							}

							.el-icon {
								font-size: 20px;
								color: #666;

								&:hover {
									color: #333;
								}
							}
						}
					}

					.card-description {
						font-size: 14px;
						color: #666;
						line-height: 1.5;
						margin: 0;
					}
				}
			}
		}
	}
</style>
