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
				new_line.split('')
					.every(
						(c, k, arr) => {
							if (c === '\t') {
								const tab = document.createElement('span');
								tab.className = 'tab';
								tab.appendChild(document.createTextNode('\t'));
								row.appendChild(tab);
								return true;
							}
							row.appendChild(document.createTextNode(new_line.substring(k)));
							return false;
						}
					)
				listing.appendChild(row);
			});
		console.log(listing.innerHTML);
	}
})();
