const mainURL = 'https://api.publicapis.org/entries'

let giphyApi = `https://api.giphy.com`;

let key = 'qf6h6A7W8N7GvADHR46N6JIKRuWXunJN'

const form = document.querySelector('.trial')
const list = document.querySelector('ul')
let infoTitle = document.getElementById('infoH1')
const alphabet = document.getElementById('alphaList')
const alphaResult = document.getElementById('alphaResults')
const slideInfo = document.getElementById("slideDiv")
const slides = document.getElementById('slides')
const filter = document.getElementById('filter')
const logo = document.getElementById('logo')
const descript = document.getElementById('description')



let answer


logo.addEventListener('mouseover', (e)=>{
    e.preventDefault()
    logo.src = './images/IMG_2300.PNG'
})

logo.addEventListener('mouseout', (e)=>{
    e.preventDefault()
    logo.src = "./images/IMG_2299.PNG"
})

function printResults(entries, input){
    list.innerHTML = ``
    for (let i=0; i<entries.length; i++){
        //console.log (entries[i])
        newItem = document.createElement('li')
        if (input.toLowerCase() == entries[i].Category.toLowerCase()){
            if (entries[i].Auth === ""){
                entries[i].Auth = "none"
            }
            
            entry = entries[i].API
            newItem.innerHTML= `
            <h2>${entry}</h2>
            `
            let info = document.createElement('p')
            let fullInfo = document.createElement('p')
            fullInfo.setAttribute('class', 'fullinfo')
            info.setAttribute('class', 'infoP')
            newItem.append(info)
            newItem.append(fullInfo)
            // let link = document.querySelector('a')
            // console.log(link)
            
            newItem.addEventListener('mouseover', ()=>{
                info.textContent = entries[i].Description 
            })
            newItem.addEventListener('click', ()=>{
                ///e.preventDefault()
                // gettingInfo(x, entry)
                // infoArt.innerHTML = `<p>hello, ${entry}</p>`
                fullInfo.innerHTML = `
                <p><strong>Authentication Needed:</strong> ${entries[i].Auth}</p>
                <p><strong>CORS?</strong> ${entries[i].Cors}</p>
                <p><strong>HTTPS?</strong> ${entries[i].HTTPS}</p>
                <a href="${entries[i].Link}">TAKE ME TO THE API!</A>
                `
                })
                
                newItem.addEventListener('mouseout', ()=>{
                    info.textContent = ``
                })
                newItem.addEventListener('dblclick', ()=>{
                    fullInfo.textContent =``
                })
                //console.log(newItem.innerHTML.includes(entry))
                list.append(newItem)
            }
            
        } 
    }
let entry, newItem, wholeList
            
            
            
function makingAlpha(entries){
                let final, li, letter, newLi, text
                for (let i =0; i<26; i++){
                    li = document.createElement('li')
                    //let p =document.createElement('p')
                    //let a = document.createElement('a')
                    li.setAttribute('class', 'alphaLink')
                    li.innerHTML = `
                    <a href="">${(i+10).toString(36).toUpperCase()}</a>`
                    //li.append(p)
                    alphabet.append(li)
                }
                let list = document.querySelectorAll('.alphaLink a')
                
                let catArr = []
                
                for (let i=0; i<entries.length; i++){
                    if(!catArr.includes(entries[i].Category)){
                        catArr.push(entries[i].Category)
                    }
                }
                
                console.log(catArr)
                list.forEach((item)=>{
                    letter = item.innerText
                    let letterCatArr = catArr.filter((cat)=>{
                        return cat.charAt(0) == letter
                    })
                    
                    item.addEventListener('click', (e)=>{
                        e.preventDefault()
                        alphaResult.innerHTML= ``
                        if (!letterCatArr.length){
                            alphaResult.innerHTML = `There aren't any categories that start with this letter :(`
                        }
                        for (let i=0; i<letterCatArr.length; i++){
                            newLi = document.createElement('li')
                            newLi.setAttribute('id', 'alphaResultLi')
                            newLi.innerHTML= `
                            <a href="">${letterCatArr[i]}</a>
                            `
                            // let search = document.('#alphaResults')
                            alphaResult.append(newLi)
                            
                            //console.log(search)
                            
                        }
                        let resultList = document.querySelectorAll('#alphaResultLi a')
                        
                        resultList.forEach((item)=>{
                            item.addEventListener('click', (e)=>{
                                e.preventDefault()
                                text = item.innerText
                                printResults(entries, text)
                            })
                            
                        })
                        console.log(resultList)
                        
                    })
                    
                    // console.log(letter)
                })
                
                
            }
            
            
function makingSlideShow(entries){
                let arr = ['Select a Category'];
                for (let i= 0; i<entries.length; i++){
                    if(!arr.includes(entries[i].Category)){
                        arr.push(entries[i].Category)
                    }
                }
                for (let i=0; i<arr.length; i++){
                    let li = document.createElement('li')
                    li.setAttribute('class', 'slide')
                    li.innerHTML = `
                    <a href="">${arr[i]}</a>
                    `
                    slides.append(li)
                }
                let slides1 = document.querySelectorAll('.slide')
                slides1[0].setAttribute('class', 'showing')
                let currentSlide = 0
                let slideInt = setInterval(nextSlide, 2500);
                
                function nextSlide(){
                    slides1[currentSlide].className= 'slide';
                    currentSlide = (currentSlide+1)%slides1.length;
                    slides1[currentSlide].className = 'slide showing'
                    
                    showing = document.querySelector('.showing').innerText
                    console.log(showing)
                    fetch(`${giphyApi}/v1/gifs/search?api_key=${key}&q=${showing}&limit=50`)
                    .then((res)=> res.json())
                    .then((x)=>{
                        console.log(x)
                        let gif = x.data
                        for (let g of gif){
                            let gifObj = g.images.fixed_height_small.url;
                            document.querySelector('.gifShow').src = gifObj
                        }
                    })
                    
                }
                
                slides1.forEach((item)=>{
                    item.addEventListener('click', (e)=>{
                        e.preventDefault()
                        printResults(entries, showing)
                    })
                })
            }
            
            
            
            
 window.addEventListener('load', (e)=>{
                
                
                let input;
                e.preventDefault
                fetch(mainURL)
                .then((res)=> res.json())
                .then((x)=>{
                    let entries = x.entries
                    makingAlpha(entries)
                    makingSlideShow(entries)
                    
                    console.log(x)
                })
                .catch((e)=> console.log(e))
                //console.log("page loaded")
            })
            
            const results = document.getElementById('secondDiv')
            
function noResults(){
                window.alert(`Sorry, we don't have that category yet :/`)
            }
            
            
 form.addEventListener('submit', (e)=>{
                let element;
                e.preventDefault()
                //slideInfo.innerHTML= ``
                logo.style.backgroundColor = 'pink'
                logo.style.height = '60px'
                logo.addEventListener('click', (e)=>{
                    e.preventDefault()
                    window.location.reload()
                })
                let input = e.target.input.value
                descript.innerHTML= `<h2>Click each API to view information. Double click to view less.</h2>`
                fetch(mainURL)
                .then((res) => res.json())
                .then((x)=>{
                    list.innerHTML=``
                    let entries = x.entries
                    
                    let newArr = [];
                    
                    for (let i=0; i<entries.length; i++){
                        //console.log (entries[i])
                        newItem = document.createElement('li')
                        if (input.toLowerCase() == entries[i].Category.toLowerCase()){

                                                element = entries[i]
                                                newArr.push(element)
                                                
                                            } 
                                        } 
                                        if (!newArr.length){
                                            noResults()
                                        } else {
                                            printResults(newArr, input)  
                                        }
                                        
                                        //console.log(x)
                                        e.target.reset()
                                    });
                                    fetch(`${giphyApi}/v1/gifs/search?api_key=${key}&q=${input}&limit=50`)
                                    .then((res)=> res.json())
                                    .then((x)=>{
                                        console.log(x)
                                        let gif = x.data
                                        for (let g of gif){
                                            let gifObj = g.images.fixed_height_small.url;
                                            let body = document.querySelector('body')
                                            body.style.cssText = `background-image: url(${gifObj})`;
                                        }
                                    })
                                    
                                    .catch((e)=> console.log(e))
   })
                                
                                
                                

                                    
                                    
             