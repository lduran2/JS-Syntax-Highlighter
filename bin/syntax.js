'use strict';

(() => {
	let javascript = {
		"delimiters": [
			{
				"class": "block comment",
				"begin": "/*",
				"end": "*/"
			},
			{
				"class": "end of line comment",
				"begin": "//",
				"end": ""
			},
			{
				"class": "string-double",
				"begin": "\"",
				"end": "\""
			},
			{
				"class": "string-single",
				"begin": "'",
				"end": "'"
			},
			{
				"class": "template string",
				"begin": "`",
				"end": "`"
			}
		],
		"literals": [
			{
				"class": "keyword",
				"pattern": "\\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|enum|implements|interface|let|package|private|protected|public|static|await|abstract|boolean|byte|char|double|final|float|goto|int|long|native|short|synchronized|throws|transient|volatile|null|true|false)\\b"
			},
			{
				"class": "integer",
				"pattern": "\\b\\d[0-9a-zA-Z]*"
			},
		]
	};
	let javascript_keywords = new RegExp(javascript.literals[0].pattern);

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
				let indent = 0;
				new_line.split('')
					.every((c, k, arr) => {
						if (c === '\t') {
							const tab = document.createElement('span');
							tab.className = 'tab';
							tab.appendChild(document.createTextNode('\t'));
							row.appendChild(tab);
							return true;
						}
						indent = k;
						return false;
					});
				new_line.substring(indent).split(javascript_keywords)
					.forEach((s, k, arr) => {
						if (javascript_keywords.test(s)) {
							const keyword = document.createElement('span');
							keyword.className = 'keyword';
							keyword.appendChild(document.createTextNode(s));
							row.appendChild(keyword);
						}
						else {
							row.appendChild(document.createTextNode(s));
						}
					});
				listing.appendChild(row);
			});
	}
})();
