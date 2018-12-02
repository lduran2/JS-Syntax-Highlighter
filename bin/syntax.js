(() => {
	document.addEventListener('DOMContentLoaded', (e) => { 
		Array.from(document.getElementsByClassName('program-listing'))
			.forEach((el, k, arr) => {
				setTimeout(highlight, 500, el);
			});
	});

	function highlight(listing) {
		if (!listing.firstChild) {
			setTimeout(highlight, 500, listing);
			return;
		}
		const nodeValue = listing.firstChild.nodeValue;
		listing.removeChild(listing.firstChild);
		nodeValue.split(/\r?\n|\r/)
			.forEach((line, k, arr) => {
				const row = document.createElement('div');
				row.className = 'row';
				const new_line = (line || '\r\n');
				row.appendChild(document.createTextNode(new_line));
				listing.appendChild(row);
			});
		console.log(listing.innerHTML);
	}
})();
