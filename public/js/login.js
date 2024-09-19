// s
// e
// f
// t
// y

// document.addEventListener("contextmenu", function (e) {
//     e.preventDefault()
//   })
  
//   document.onkeydown = function (e) {
//     if (event.keyCode == 123) {
//       return false
//     }
  
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
//       window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
//       return false
//     }
  
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
//       window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
//       return false
//     }
  
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
//       window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
//       return false
//     }
  
//     if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
//       window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
//       return false
//     }
//   }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              window.location.href = '/list'; // Redirect to protected page
          } else {
              alert('Login failed: ' + data.message);
          }
      })
      .catch(err => console.error('Login error:', err));
      
    });
});
