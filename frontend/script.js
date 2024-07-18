function openModal(projectId) {
    event.preventDefault();
    const modal = document.getElementById(`modal-${projectId}`);
    modal.classList.remove('hidden');
    modal.children[0].classList.remove('scale-0');
    modal.children[0].classList.add('scale-100');
}

function closeModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    modal.children[0].classList.remove('scale-100');
    modal.children[0].classList.add('scale-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

document.getElementById('contact-form').addEventListener('submit', async function (event) {
event.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

try {
const response = await fetch('http://127.0.0.1:3000/submit-contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, email, message })
});

const result = await response.json();

if (result.success) {
  alert('Message sent successfully!');
  window.location.href = 'index.html'; // Redirect to index.html
} else {
  alert('Error sending message: ' + result.message);
}
} catch (error) {
alert('An error occurred: ' + error.message);
}
});

let currentTheme = getTheme();

document.addEventListener('DOMContentLoaded',()=>{
changeTheme(currentTheme);
});

function changeTheme(currentTheme) {
//set to web page
document.querySelector('html').classList.add(currentTheme);

//set the listener to page theme btn
const changeThemeBtn = document.getElementById("theme_change_btn");
changeThemeBtn.addEventListener("click",()=>{
document.querySelector('html').classList.remove(currentTheme);
currentTheme = (currentTheme==="dark" ? "light" : "dark");
setTheme(currentTheme);
document.querySelector('html').classList.add(currentTheme);
});

}

//set theme to local storage
function setTheme(theme) {
localStorage.setItem("theme",theme);
}

//get theme from local storage
function getTheme() {
let theme = localStorage.getItem("theme");
return theme ? theme : "light";
}