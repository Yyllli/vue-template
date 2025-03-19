<template>
	<div class="header">
		<div class="title">首页</div>
		<div class="btns">
			<div class="btn">
				<el-icon class="icon"><ShoppingCart /></el-icon>
			</div>
			<el-popover
				width="300px"
				:offset="5"
			>
				<template #reference>
					<div class="btn call">
						<el-icon class="icon"><Service /></el-icon>
					</div>
				</template>
				<template #default>
					<div class="popover">
						<div class="qr-title">加入用户群</div>
						<div class="qr-subtitle">获取最新产品活动消息</div>
						<div class="qr-code">
							<img
								src="@/assets/image/Snipaste_2025-03-19_00-20-35.png"
								alt="QR Code"
							/>
						</div>
						<div class="qr-tip">扫描二维码进入微信用户群</div>
						<div class="feedback">
							<div class="feedback-item">
								<el-icon><EditPen /></el-icon>
								<span>问题反馈</span>
							</div>
							<div class="feedback-item">
								<el-icon><List /></el-icon>
								<span>反馈列表</span>
							</div>
						</div>
					</div>
				</template>
			</el-popover>

			<!-- 用户信息 -->
			<el-dropdown>
				<div class="avatar">
					<i class="iconfont icon-my_light"></i>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>Action 1</el-dropdown-item>
						<el-dropdown-item>Action 2</el-dropdown-item>
						<el-dropdown-item>Action 3</el-dropdown-item>
						<el-dropdown-item disabled>Action 4</el-dropdown-item>
						<el-dropdown-item divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		padding-top: 8px;
		.title {
			color: #212529;
			font-size: 26px;
			margin-left: 50px;
		}
		.btns {
			margin-right: 50px;
			display: flex;

			.btn {
				width: 45px;
				height: 45px;
				cursor: pointer;
				color: #4a4a4a;
				text-align: center;
				z-index: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 10px;
				.icon {
					font-size: 28px;
				}
				span {
					font-size: 14px;
				}
			}
			.call {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.avatar {
				width: 45px;
				height: 45px;
				border-radius: 50%;
				background-color: #f3f4f8;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				margin-left: 20px;
				.iconfont {
					font-size: 36px;
					color: #6b7385;
				}
			}
		}
	}
	.popover {
		padding: 20px 30px 0 30px;
		text-align: center;

		.qr-title {
			font-size: 20px;
			font-weight: 500;
			color: #000000;
			margin-bottom: 12px;
		}

		.qr-subtitle {
			font-size: 14px;
			color: #666666;
			margin-bottom: 24px;
		}

		.qr-code {
			width: 160px;
			height: 160px;
			margin: 0 auto 16px;
			background: #ffffff;
			border: 1px solid #eeeeee;
			padding: 8px;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		.qr-tip {
			font-size: 12px;
			color: #666666;
			margin-bottom: 24px;
		}

		.feedback {
			display: flex;
			justify-content: space-around;
			border-top: 1px solid #eeeeee;
			padding-top: 14px;
			margin: 0 -24px;
			padding-left: 24px;
			padding-right: 24px;

			.feedback-item {
				display: flex;
				align-items: center;
				cursor: pointer;
				color: #409eff;
				font-size: 14px;

				.el-icon {
					margin-right: 4px;
					font-size: 16px;
				}

				&:hover {
					opacity: 0.8;
				}
			}
		}
	}
</style>
