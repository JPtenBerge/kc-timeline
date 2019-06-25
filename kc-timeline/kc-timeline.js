import { timelineStyles } from './kc-timeline.styles.js';
import { timelineTemplate } from './kc-timeline.template.js';
const outerTemplate = `
  ${timelineStyles}
  ${timelineTemplate}
`;

customElements.define('kc-timeline', class extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.render();
	}

	connectedCallback() {
		let all = selector => this.shadowRoot.querySelectorAll(selector);

		all('input').forEach(i => i.addEventListener('click', () => {
			all('input').forEach(i => i.className = 'active');
			all('input:focus ~ input').forEach(i => i.className = '');
			i.className += ' current';

			this.shadowRoot.querySelector('#description').innerHTML = i.event.description;
		}));
	}

	render() {
		this.shadowRoot.innerHTML = outerTemplate;

		let template = this.shadowRoot.querySelector('#dot-template').content;
		let events;
		try {
			events = JSON.parse(this.getAttribute('events'));
		}
		catch (ex) {
			console.error('Kon events niet parsen:', ex);
			return;
		}
		events.forEach(event => {
			let clone = document.importNode(template, true);
			clone.querySelector('.year').innerHTML = event.year;
			clone.querySelector('.caption').innerHTML = event.caption;
			clone.querySelector('input').event = event;
			this.root.querySelector('#timeline').appendChild(clone);
		});
	}
});
