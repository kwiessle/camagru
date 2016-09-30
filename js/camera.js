(function() {

	var streaming = false,
video = document.getElementById('video'),
cover = document.getElementById('cover'),
canvas = document.getElementById('canvas'),
photo = document.getElementById('photo'),
test = document.getElementById('test'),
startbutton = document.getElementById('startbutton'),
deletebutton = document.getElementById('deletebutton'),
finish = document.getElementById('finish'),
imgInp = document.getElementById('imgInp'),
width = 700,
height = 220;

navigator.getMedia = ( navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia);

navigator.getMedia(
	{
		video: true,
	audio: false
	},
	function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
		video.play();
	},
	function(err) {
		console.log("An error occured! " + err);
	}
	);

video.addEventListener('canplay', function(ev){
	if (!streaming) {
		height = video.videoHeight / (video.videoWidth/width);
		video.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		streaming = true;
	}
}, false);

function takepicture() {

	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(video, 0, 0, width, height);
	var data = canvas.toDataURL('image/png');
}

startbutton.addEventListener('click', function(ev){
	takepicture();
	document.getElementById("video").setAttribute("style", "display:none");
	document.getElementById("canvas").setAttribute("style", "display:block");
	document.getElementById("photo").setAttribute("style", "display:none");
	ev.preventDefault();
}, false);

deletebutton.addEventListener('click', function(ev){
	document.getElementById("canvas").setAttribute("style", "display:none");
	document.getElementById("video").setAttribute("style", "display:block");
	document.getElementById("photo").setAttribute("style", "display:none");
	document.getElementById("photo").setAttribute("src", "");
	ev.preventDefault();
}, false);


finish.addEventListener('click', function(ev){
// si canvas--> on upload la photo du canvas
// si img src="sadfg" ---> upload la photo img
// else wallou
	var data = canvas.toDataURL('image/png');
	var data_img = photo.getAttribute('src');
	var check = document.getElementById("video").getAttribute("style");
	if (check == "display:none") {
		test.setAttribute('value', data);
	}
	var check_canvas = document.getElementById("canvas").getAttribute("style")
	if (check == "display:none" && check_canvas == "display:none") {
		test.setAttribute('value', data_img);
	}
	console.log(test);
		}, false);
})();

function previewFile() {
	var preview = document.getElementById('photo');
	var file    = document.querySelector('input[type=file]').files[0];
	var reader  = new FileReader();
	reader.addEventListener("load", function () {
		preview.src = reader.result;
	}, false);

	if (file) {
		reader.readAsDataURL(file);
		document.getElementById("canvas").setAttribute("style", "display:none");
		document.getElementById("video").setAttribute("style", "display:none");
		document.getElementById("photo").setAttribute("style", "display:block");
	}
}
