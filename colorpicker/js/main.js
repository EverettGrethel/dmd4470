picker = document.getElementById("picker");
label = document.getElementById("label");
text = document.getElementById("text");
body = document.querySelector("body");
btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");

if (window.localStorage.getItem('color')) {
    let color = window.localStorage.getItem('color');
    let backgroundColor = window.localStorage.getItem('backgroundColor');

    body.style.backgroundColor = backgroundColor;
    label.style.color = color;
    text.style.color = color;
}
else {
    body.style.backgroundColor = picker.value;
    label.style.color = invertColor(picker.value);
    text.style.color = invertColor(picker.value);
}

picker.addEventListener("input", updateColor, false);
btn1.addEventListener("click", setTheme1, false);
btn2.addEventListener("click", setTheme2, false);

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function updateColor(event) {
    let classes = body.classList;
    body.style.backgroundColor = event.target.value;
    invertedColor = invertColor(event.target.value);
    label.style.color = invertedColor;
    text.style.color = invertedColor;
    window.localStorage.setItem('color', invertedColor);
    window.localStorage.setItem('backgroundColor', event.target.value);
}

function setTheme1() {
    body.style.backgroundColor = "";
    label.style.color = "";
    text.style.color = "";
    body.classList.remove("theme2Body");
    label.classList.remove("theme2Text");
    text.classList.remove("theme2Text");
    body.classList.add("theme1Body");
    label.classList.add("theme1Text");
    text.classList.add("theme1Text");
}

function setTheme2() {
    body.style.backgroundColor = "";
    label.style.color = "";
    text.style.color = "";
    body.classList.remove("theme1Body");
    label.classList.remove("theme1Text");
    text.classList.remove("theme1Text");
    body.classList.add("theme2Body");
    label.classList.add("theme2Text");
    text.classList.add("theme2Text");
}