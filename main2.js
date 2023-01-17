
const suggestButton = document.getElementById('submitSuggest')
const infoArt = document.querySelector('.info')

suggestButton.addEventListener('click', (e)=>{
    e.preventDefault()
    infoArt.innerHTML = `
    <h2> THANK YOU FOR YOUR SUGGESTION :)</h2>
    <a href="./index.html">RETURN TO HOME</a>
    `
})

logo.addEventListener('mouseover', (e)=>{
    e.preventDefault()
    logo.src = './images/IMG_2300.PNG'
})

logo.addEventListener('mouseout', (e)=>{
    e.preventDefault()
    logo.src = "./images/IMG_2299.PNG"
})