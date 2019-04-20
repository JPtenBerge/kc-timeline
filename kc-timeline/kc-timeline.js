const template = `<style>
@font-face {
	font-family: 'Quicksand';
	src: url("./fonts/Quicksand-Regular.ttf"); }
  
  @font-face {
	font-family: 'Quicksand-Bold';
	src: url("./fonts/Quicksand-Bold.ttf"); }
  
  body {
	padding: 100px 0 0 100px;
	font-family: Quicksand, arial; }
  
  #timeline {
	display: flex; }
  
  input {
	width: 25px;
	height: 25px;
	background-color: #AEB6BF;
	position: relative;
	border-radius: 50%;
	display: block;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	z-index: 2;
	cursor: pointer; }
  
  input.active, input.active:before {
	background-color: #2C3E50; }
  
  input:focus {
	outline: none; }
  
  /* the lines */
  input:before {
	content: '';
	display: block;
	width: 89px;
	height: 5px;
	background: #AEB6BF;
	z-index: 1;
	transform: translate(-72px, 10px); }
  
  /* year and label */
  .dot-info {
	position: relative; }
  
  input + .dot-info .caption {
	transform: translate(-50%, -70px) rotate(-45deg);
	display: block;
	max-width: 70px;
	text-indent: -10px;
	position: absolute;
	top: 0;
	left: 0; }
  
  input + .dot-info .year {
	width: 64px;
	display: block;
	transform: translate(-50%, 50px); }
  
  input.current + .dot-info {
	font-family: 'Quicksand-Bold'; }
</style>

<div id="timeline">
	<template id="dot-template">
		<input type="radio">
		<div class="dot-info">
			<span class="year">2011</span>
			<span class="caption">fronteers presentation</span>
		</div>
	</template>
	<input type="radio">
	<div class="dot-info">
		<span class="year">2011</span>
		<span class="caption">fronteers presentation</span>
	</div>

	<input type="radio">
	<div class="dot-info">
		<span class="year">2013</span>
		<span class="caption">polymer</span>
	</div>

	<input type="radio">
	<div class="dot-info">
		<span class="year">2015</span>
		<span class="caption">v0 spec</span>
	</div>
</div>`;

customElements.define('kc-timeline', class extends HTMLElement {
	constructor() {
		super();

		this.root = this.attachShadow({ mode: 'closed' });

		this.root.innerHTML = template;
	}

	connectedCallback() {
		let all = selector => this.root.querySelectorAll(selector);
		all('input').forEach(i => i.addEventListener('click', () => {
			all('input').forEach(i => i.className = 'active');
			all('input:focus ~ input').forEach(i => i.className = '');
			i.className += ' current';
		}));
	}
});