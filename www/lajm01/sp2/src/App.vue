<template>
	<nav>
	  <router-link to="/tests/all">Testy</router-link>
	  <router-link to="/tests/unfinished">Nedokončené</router-link>
	  <router-link to="/tests/history">Historie</router-link>
	</nav>
	<router-view />
  </template>
  
  <style lang="less">
  #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
  }
  nav {
	padding: 30px;
	a {
	  margin: 30px;
	  font-weight: bold;
	  color: #2c3e50;
	  &.router-link-exact-active {
		color: #42b983;
	  }
	}
  }

  
.btn {
	appearance: button;
	backface-visibility: hidden;
	background-color: #405cf5;
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
		rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	font-family: -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue',
		Ubuntu, sans-serif;
	font-size: 100%;
	height: 44px;
	line-height: 1.15;
	margin: 12px 0 0;
	outline: none;
	overflow: hidden;
	padding: 0 25px;
	position: relative;
	text-align: center;
	text-transform: none;
	transform: translateZ(0);
	transition: all 0.2s, box-shadow 0.08s ease-in;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	width: fit-content;
}

.btn:disabled {
	cursor: default;
}

.btn:focus {
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
		rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
		rgba(50, 151, 211, 0.3) 0 0 0 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
  </style>