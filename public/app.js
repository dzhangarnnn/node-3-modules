document.addEventListener("click", (event) => {
	if (event.target.dataset.type === "remove") {
		const id = event.target.dataset.id;

		remove(id).then(() => {
			event.target.closest("li").remove();
		});
	}
});

document.addEventListener("click", (event) => {
	if (event.target.dataset.type === "edit") {
		const id = event.target.dataset.id;

		const value = event.target.closest("li").firstElementChild.innerText;
		const content = prompt("Введите новое название", value);
		const data = { title: content };

		if (content) {
			update(id, data).then(() => {
				event.target.closest("li").firstElementChild.innerText = content;
			});
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, data) {
	await fetch(`/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
}
