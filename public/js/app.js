
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    try{
        fetch("/weather?search="+location).then((response) => {
        response.json().then((data) => {
            if(!response) {
                console.log('Error',response)
            }
            else {
                msg1.textContent = data[0].location;
                msg2.textContent = data[0].forecast;
            }
        })
    })
}catch(e){
    msg1.textContent = "API Failed"
}
})