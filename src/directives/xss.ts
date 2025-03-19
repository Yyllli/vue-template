import type { Directive } from 'vue';
import { filterXSS } from '../utils/xssUtils';

export const vXss: Directive = {
	mounted(el, binding) {
		const content = binding.value;
		if (content) {
			el.innerHTML = filterXSS(content);
		}
	},
	updated(el, binding) {
		const content = binding.value;
		if (content) {
			el.innerHTML = filterXSS(content);
		}
	}
};
