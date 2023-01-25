const API_KEY = 'lymvppQcIT5/lCWCAng6YA==UiiiNhc3PAs95IvM'

const form = document.querySelector('#search_form')
const input = document.querySelector('#search_term')
const msg = document.querySelector(".form_msg")
const list = document.querySelector(".cats")
const container = document.querySelector('#container');


function checkIfHasDuplicates(newBreed) {
	const catsList = Array.from(list.querySelectorAll('.cats li'))
	if (catsList.length > 0) {
		return catsList.some(el => {
			let oldBreed = el.querySelector('.breed_name').textContent
			return oldBreed === newBreed
		})
	}
}


form.addEventListener('submit', e => {
	e.preventDefault()

	msg.textContent = ''
	msg.classList.remove('visible')

	let inputValue = input.value.toLowerCase()
	const url = `https://api.api-ninjas.com/v1/cats?name=${inputValue}`
	const options = {
		headers: {
			'X-Api-Key': API_KEY
		}
	}

	fetch(url, options)
		.then(response => response.json())
		.then(data => {
			const { name, origin, max_weight: weight, image_link: imageSrc, intelligence } = data[0]

			if (checkIfHasDuplicates(name)) {
				msg.textContent = `You already have ${name} in your list`;
				msg.classList.add('visible')
				return
			}
			const li = document.createElement('li')
			const markup = `
			<button><img src="./img/close.png" alt="" class="close-button"></button>
			<h3 class="breed_name">${name}</h3>
			<div class="info" >
			<div class="center_cropped">
				<img src="${imageSrc}" alt="${name}">
			</div>
			<div class="features" >Origin: ${origin} </br>  </br> Max weight: ${weight}kg </br>  </br> Intelligence: ${intelligence} </div>
			</div>
		`
			li.innerHTML = markup

			li.onclick = e => {
				if (e.target.className === "close-button") li.remove()
			}

			list.appendChild(li)
		})
		.catch(() => {
			msg.textContent = 'Please search for a valid cat breed.'
			msg.classList.add('visible')
		})

	msg.textContent = ''
	form.reset()
	input.focus()
})

