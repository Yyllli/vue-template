import { defineStore } from 'pinia';

interface MenuState {
	currentTitle: string;
}

export const useMenuStore = defineStore('menu', {
	state: (): MenuState => ({
		currentTitle: '首页'
	}),

	actions: {
		setCurrentTitle(title: string) {
			this.currentTitle = title;
		}
	}
});
