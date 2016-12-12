;(function (window) {
	window.onload = function () {
		var container = document.querySelector('[data-role=richtext]');
		var richText = document.createElement('div');
		var panel = document.createElement('div');
		var title = document.createElement('p');
		var target, startX, startY;
		// richText init.
		richText.contentEditable = true;
		richText.shellcheck = false;
		richText.className = 'rich-text';
		title.innerHTML = '&#8203;';
		container.appendChild(richText);
		richText.appendChild(title);

		richText.addEventListener('touchstart', function (event) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
		});

		richText.addEventListener('touchend', function (event) {
			if (startX !== event.changedTouches[0].clientX || startY !== event.changedTouches[0].clientY) {
				return;
			}
			if (event.target.nodeName !== 'P' && event.target.nodeName !== 'H1') {
				panel.style.display = 'none';
				if (target) target.style.background = 'transparent';
				return;
			}
			if (target) target.style.background = 'transparent';
			if (event.target.innerText === '') return;
			var oldTarget = target;
			target = event.target;
			if (oldTarget === target && panel.style.display === 'flex') {
				target.style.background = 'transparent';
				panel.style.display = 'none';
				return;
			}
			target = event.target;
			target.style.background = '#B2DFEE';

			panel.style.top = event.changedTouches[0].clientY - 35 + 'px';
			panel.style.display = 'flex';
		});

		richText.addEventListener('keydown', function (event) {
			if (event.keyCode === 8) {
				if (richText.children.length === 1 && (richText.firstChild.nodeName === 'P' && richText.querySelector('p').innerHTML === '<br>') 
				|| (richText.firstChild.nodeName === 'H1' && richText.firstChild.innerHTML === '<br>')) {
					event.preventDefault();
					if (target) target.style.background = 'transparent';
					panel.style.display = 'none';
					return;
				}
			}
			if (event.keyCode === 13) {
				if (target) target.style.background = 'transparent';
				panel.style.display = 'none';
			}
		});

		richText.addEventListener('keyup', function (event) {
			if (event.keyCode === 13) {
				var lastChild = richText.lastChild;
				lastChild.style.fontSize = 'normal';
				lastChild.style.fontStyle = 'normal';
				lastChild.style.fontWeight = 'normal';
				lastChild.style.textAlign = 'left';
				lastChild.style.textIndent = '0';
			}
		});

		// panel init.
		panel.className = 'panel';
		panel.innerHTML = '<span id="rich-header" class="fa fa-header"></span><span id="rich-indent" class="fa fa-info"></span><span id="rich-italic" class="fa fa-italic"></span><span id="rich-bold" class="fa fa-bold"></span><span id="rich-align-left" class="fa fa-align-left"></span><span id="rich-align-center" class="fa fa-align-center"></span><span id="rich-align-right" class="fa fa-align-right"></span><span id="rich-picture" class="fa fa-picture-o"></span>';
		container.appendChild(panel);

		var header = document.getElementById('rich-header');
		var italic = document.getElementById('rich-italic');
		var bold = document.getElementById('rich-bold');
		var align_left = document.getElementById('rich-align-left');
		var align_center = document.getElementById('rich-align-center');
		var align_right = document.getElementById('rich-align-right');
		var picture = document.getElementById('rich-picture');
		var indent = document.getElementById('rich-indent');
		// header event.
		header.addEventListener('click', function () {
			var nextChild = target.nextElementSibling;
			if (target.nodeName === 'P') {
				var header = document.createElement('h1');

				header.innerText = target.innerText;
				richText.removeChild(target);
				header.style.fontSize = 'larger';
				header.style.textAlign = 'center';
				header.style.fontWeight = 'bold';
				header.style.lineHeight = '1.8';
				header.style.margin = '10px 0';

				if (!nextChild) {
					var newElem = document.createElement('p');
					richText.appendChild(header);
					newElem.innerHTML = '&#8203;';
					richText.appendChild(newElem);
				} else {
					richText.insertBefore(header, nextChild);
				}
			}
			if (target.nodeName === 'H1') {
				var p = document.createElement('p');
				p.innerText = target.innerText;
				richText.removeChild(target);
				console.log(123);
				if (!nextChild) {
					richText.appendChild(p);
				} else {
					richText.insertBefore(p, nextChild);
				}
			}
			panel.style.display = 'none';
		});

		italic.addEventListener('click', function () {
			if (target.style.fontStyle === 'italic') {
				target.style.fontStyle = 'normal';
				return;
			} else {
				target.style.fontStyle = 'italic';
			}
		});

		bold.addEventListener('click', function () {
			if (target.style.fontWeight === 'bold') {
				target.style.fontWeight = 'normal';
				return;
			} else {
				target.style.fontWeight = 'bold';
			}
		});

		align_left.addEventListener('click', function () {
			target.style.textAlign = 'left';
			target.style.background = 'transparent';
			panel.style.display = 'none';
		});

		align_center.addEventListener('click', function () {
			target.style.textAlign = 'center';
			target.style.background = 'transparent';
			panel.style.display = 'none';
		});

		align_right.addEventListener('click', function () {
			target.style.textAlign = 'right';
			target.style.background = 'transparent';
			panel.style.display = 'none';
		});

		picture.addEventListener('click', function () {
			var nextChild = target.nextElementSibling;
			if (nextChild) {
				var img = new Image();
				img.src = './img/header.jpg';
				richText.appendChild(img);

				richText.insertBefore(img, nextChild);
			} else {
				var img = new Image();
				img.src = './img/header.jpg';
				richText.appendChild(img);

				var p = document.createElement('p');
				p.innerHTML = '&#8203;';
				richText.appendChild(p);
			}
			target.style.background = 'transparent';
			panel.style.display = 'none';
		});

		indent.addEventListener('click', function () {
			if (target.style.textIndent === '2em') {
				target.style.textIndent = '0';
				return;
			}
			target.style.textIndent = '2em';
		});
	};
})(window);

// function create