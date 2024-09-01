const socket = io();

socket.on('contador', value => {
    console.log(value);
    let count = document.getElementById('counter');
    count.innerHTML = `contador: ${value}`;
})