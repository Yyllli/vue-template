<template>
	<div class="login-container">
		<div class="logo">
			<img
				src="@/assets/image/迅智魔方-03.png"
				alt=""
			/>
		</div>

		<el-card class="login-card">
			<div class="logo-title">
				<img
					src="@/assets/image/迅智魔方-02.png"
					alt=""
				/>
			</div>
			<el-tabs
				id="login-tab"
				v-model="activeTab"
			>
				<el-tab-pane
					label="验证码登录"
					name="code"
				>
					<el-form
						:model="form"
						ref="formCodeRef"
						:rules="phoneCodeRules"
					>
						<el-form-item prop="phone">
							<el-input
								v-model="form.phone"
								class="mb"
								placeholder="请输入手机号"
							>
								<template #prefix>
									<el-icon>
										<Iphone />
									</el-icon>
									<span class="tab-icon">+86</span>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="code">
							<el-row :gutter="10">
								<el-col :span="setTime ? 14 : 18">
									<el-input
										v-model="form.code"
										placeholder="请输入验证码"
									/>
								</el-col>
								<el-col :span="setTime ? 10 : 6">
									<el-button
										class="logo-color sendcode"
										type="primary"
										:disabled="setTime ? true : false"
										@click="sendCode"
									>
										<span v-if="!setTime">发送验证码</span>
										<span v-else
											>可在{{
												makeupTime(setTime.toString())
											}}秒后获取</span
										>
									</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane
					label="密码登录"
					name="password"
				>
					<el-form
						:model="formPass"
						ref="formRef"
						:rules="phonePasswordRules"
					>
						<el-form-item prop="phone">
							<el-input
								v-model="formPass.phone"
								class="mb"
								placeholder="请输入手机号"
							>
								<template #prefix>
									<el-icon>
										<Iphone />
									</el-icon>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="formPass.password"
								type="password"
								placeholder="请输入密码"
							>
								<template #prefix>
									<el-icon><Lock /></el-icon>
								</template>
							</el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-checkbox
				v-if="activeTab == 'code'"
				v-model="form.agree"
				><span class="info">
					我已阅读并同意
					<a
						href="#"
						@click="goRouter(1)"
						>用户协议</a
					>
					和
					<a
						href="#"
						@click="goRouter(2)"
						>隐私政策</a
					>,未注册的手机号将自动注册
				</span></el-checkbox
			>
			<el-checkbox
				v-else
				v-model="formPass.agree"
				><span class="info">
					我已阅读并同意 <a href="#">用户协议</a> 和
					<a href="#">隐私政策</a>,未注册的手机号将自动注册
				</span></el-checkbox
			>
			<el-button
				type="primary"
				class="login-button logo-color"
				@click="submit"
			>
				<span>登&nbsp;录</span>
			</el-button>
			<el-dialog
				class="dialog"
				v-model="validVisible"
				:before-close="handleClose"
				width="342"
			>
				<slide-verify
					ref="block"
					slider-text="向右滑动"
					:accuracy="5"
					@again="onAgain"
					@success="onSuccess"
					@fail="onFail"
					@refresh="onRefresh"
				></slide-verify>
				<div>{{ msg }}</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import SlideVerify, { SlideVerifyInstance } from 'vue3-slide-verify';
	import 'vue3-slide-verify/dist/style.css';
	import { makeupTime } from '@/utils/formatData';
	import { phoneCodeRules, phonePasswordRules } from './hooks/useLogin';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const activeTab = ref('code');
	const form = ref({ phone: '', code: '', agree: false });
	const formPass = ref({ phone: '', password: '', agree: false });

	const msg = ref('');
	const block = ref();
	const validVisible = ref(false);
	const formCodeRef = ref();
	const formRef = ref();
	const sendCode = async () => {
		if (setTime.value) {
			return;
		}
		await formCodeRef.value.validate((valid: boolean) => {
			if (valid) {
				validVisible.value = true;
				onRefresh();
			}
		});
	};

	const submit = () => {
		if (!form.value.agree) {
			ElMessage.warning('请先勾选用户协议');
			return;
		}
		ElMessage.success('登录成功');
		router.push({
			path: '/'
		});
	};

	const handleClose = () => {
		validVisible.value = false;
		msg.value = '';
	};

	const setTime = ref(0);
	const onSuccess = () => {
		validVisible.value = false;
		// 这里调用接口发送验证码，并开启60s计时
		setTimeData();
	};

	/** 开始计时 */
	const setTimeData = () => {
		setTime.value = 60;
		// 开启倒计时
		startCountdown(
			setTime.value,
			(seconds: number) => {
				setTime.value = seconds;
			},
			() => {
				console.log('倒计时结束！'); // 倒计时结束时执行的操作
			}
		);
	};

	const startCountdown = (
		duration: number,
		onTick: Function,
		onComplete: Function
	) => {
		let timer = duration;
		const intervalId = setInterval(() => {
			onTick(timer); // 每次tick时调用
			if (timer <= 0) {
				clearInterval(intervalId); // 停止计时器
				onComplete(); // 倒计时完成时调用
			} else {
				timer--; // 减少时间
			}
		}, 1000); // 每1000毫秒（1秒）执行一次
	};
	const onFail = () => {
		msg.value = '验证不通过';
	};

	const onRefresh = () => {
		// console.log("");
	};
	const onAgain = () => {
		msg.value = '请重试！';
		// 刷新
		block.value?.refresh();
	};

	const goRouter = (num: number) => {
		const routeUrl = router.resolve({
			path: num === 1 ? '/userAggrement' : '/privacyAggrement'
		});
		window.open(routeUrl.href, '_blank');
	};
</script>

<style scoped lang="less">
	.login-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100vh;
		background: url('@/assets/image/4021742310979_.pic_hd.jpg') no-repeat
			center center;
		background-size: cover;
		padding-left: 3vw;
	}

	.login-card {
		width: 400px;
		padding: 20px;
		position: relative;
		:deep(.el-card__body) {
			padding: 0;
		}
		transform: translateY(-15vh);
	}

	:deep(.el-card) {
		background: transparent;
		border: none;
		box-shadow: none;
	}

	.logo {
		position: fixed;
		left: 0;
		top: 0;
		width: 200px;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.login-button {
		width: 100%;
		margin-top: 15px;
		height: 40px;
		border-radius: 10px;
	}

	.custom-tabs :deep(.el-tabs__active-bar) {
		display: none;
	}

	:deep(.el-tabs__nav-wrap:after) {
		background-color: #f1f1f8;
	}

	:deep(.el-tabs__active-bar) {
		background-color: #566aec;
	}

	:deep(.el-tabs__header) {
		margin-bottom: 30px;
	}

	:deep(.el-input__wrapper) {
		height: 42px;
		border-radius: 20px;
		box-shadow: 0px 4px 4px #ddd;
	}

	.mb {
		:deep(.el-input__wrapper) {
			margin-bottom: 10px;
		}
	}

	:deep(.el-tabs__item.is-active) {
		color: #566aec;
	}

	:deep(.el-tabs__item:hover) {
		color: #566aec;
	}

	.tab-icon {
		color: #4a4a4a;
		margin-left: 5px;
	}

	.logo-color {
		background-color: #566aec;
	}

	.sendcode {
		height: 42px;
		border-radius: 20px;
	}

	.info {
		display: inline-block;
		width: 100%;
		white-space: wrap;
		font-size: 12px;
		line-height: 21px;
		color: rgb(64, 64, 64);
		font-weight: 400;
		transform: translateY(-3px);
	}

	:deep(.el-checkbox) {
		align-items: normal;
	}

	:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
		background-color: #566aec;
		border-color: #566aec;
	}

	.logo {
		position: fixed;
		top: 0;
		left: 0;
		width: 200px;
		height: 200px;
		img {
			width: 100%;
			height: 100%;
			transform: translate(-50px, -50px);
		}
	}

	.logo-title {
		img {
			transform: translateY(12vh);
			width: 100%;
			height: 100%;
		}
	}
</style>
