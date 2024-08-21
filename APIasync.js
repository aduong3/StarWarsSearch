const seekInfo = document.querySelector('#seekInfo');
const parseNewInfo = document.querySelector('#findNewInfo');
const displayInfo = document.querySelector('.display-info');
const searchButton = document.querySelector('.searchButton');
const continueButton = document.querySelector('.continue-button');
const beginningWarning = document.querySelector('.beginning-warning');
const formContainer = document.querySelector('.form-container');
const clearStorage = document.querySelector('.clearStorage');
const yesButton = document.querySelector('.yes');
const noButton = document.querySelector('.no');
const confirmation = document.querySelector('.confirmation');


let html = ``;
let categoryArray = [];
let peopleArray = [];
let planetsArray = [];
let filmsArray = [];
let speciesArray = [];
let vehiclesArray = [];
let starshipsArray = [];


async function loadingData(){
    try{
        let response = await fetch('https://swapi.dev/api/');

        if(!response.ok) throw new Error("Could not connect to API");

        let info = await response.json();
        let categoryInfo = Object.keys(info);
        //console.log(Object.keys(info));

        // categoryInfo.forEach(item => {
        //     categoryArray.push(item);
        // })

        categoryArray = Object.keys(info);

        //console.log(categoryArray);
    }
    catch(error){
        console.log(error);
    }
}

function setFirstCategory(){
    html = `<option value="default" id="default_option" selected>Select a category</option>`;
    categoryArray.forEach(item => {
        html += `<option value=${item}>${item}</option>`
    });
    seekInfo.innerHTML = html;
    html = '';
}

async function findingSecondData(){
    try{
        for(var i=0; i < categoryArray.length;i++){
        let response = await fetch(`https://swapi.dev/api/${categoryArray[i]}`);
        if(!response.ok){
            throw new Error("Could not connect to API");
        }
        let info = await response.json();
        //console.log(info);
        let infoCount = Math.ceil(info.count / 10);

        //console.log(`${categoryArray[i]}: ${infoCount}`);
        //for(var x=1; x <= info.count; x++){
        for(var x=1; x <= infoCount; x++){
            //let url = `https://swapi.dev/api/${categoryArray[i]}/${x}/` //`https://swapi.dev/api/${categoryArray[i]}/?page=2`
            

            let url = `https://swapi.dev/api/${categoryArray[i]}/?page=${x}`;
            //console.log(url);
            switch(categoryArray[i]){
                case 'people':                
                    let peopleResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                        //console.log(`${x} + ': ' + ${item.name}`);
                        //console.log(Object.values(item.results))
                        //console.log(item.results);
                        if(!item.detail)
                            peopleArray.push(item.results);               
                        });
                        }
                peopleResponse();
                break;
                case 'planets':
                    let planetsResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                            planetsArray.push(item.results);
                        });
                    }
                planetsResponse();
                break;
                case 'films':
                    let filmsResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                            filmsArray.push(item.results);
                        });
                    }
                filmsResponse();

                break;
                case 'species':
                    let speciesResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                            speciesArray.push(item.results);
                        });
                    }
                speciesResponse();
                break;
                case 'vehicles':
                    let vehiclesResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                            if(!item.detail)
                            vehiclesArray.push(item.results);
                        });
                    }
                vehiclesResponse();
                break;
                case 'starships':
                    let starshipsResponse = () => {
                        fetch(url)
                        .then(data => data.json())
                        .then(item => {
                            if(!item.detail)
                            starshipsArray.push(item.results);
                        });
                    }
                starshipsResponse();
                break;
                default:
                console.log("findingSecondData() switch case not working");
                break;
            }
        }
        }
        
        //console.log(peopleArray);
        // console.log(planetsArray);
        // console.log(filmsArray);
        // console.log(speciesArray);
        // console.log(vehiclesArray);
        // console.log(starshipsArray);
    }

    catch(error){
        console.log(error);
    }
}

function setSecondCategory(){
    let currentCategory = seekInfo.value;
    //console.log(currentCategory);
    html += `<option value="default" id="default_option" selected>Select a category first</option>`;
    switch(currentCategory){
        case 'default':
            displayInfo.innerHTML = '';
            displayInfo.style.display = 'none';
            formContainer.style.flex = 1;
        break;
        case 'people':
            peopleArray.forEach((item,i) => {
                //console.log(`Array ${i + 1}`);
                item.forEach((element,x) => {
                    //console.log(`${x+1}. ${element.name}`);
                    html += `<option value="${element.name}">${element.name}</option>`;
                });
            });
        break;
        case 'planets':
            planetsArray.forEach((item,i) => {
                item.forEach(element => {
                html += `<option value="${element.name}">${element.name}</option>`;
            });
            });
        break;
        case 'films':
            filmsArray.forEach((item,i) => {
                item.forEach(element => {
                html += `<option value="${element.title}">${element.title}</option>`;
            });
            });
        break;
        case 'species':
            speciesArray.forEach((item,i) => {
                item.forEach(element => {
                html += `<option value="${element.name}">${element.name}</option>`;
            });
            });
        break;
        case 'vehicles':
            vehiclesArray.forEach((item,i) => {
                //console.log(item.name);
                item.forEach(element => {
                html += `<option value="${element.name}">${element.name}</option>`;
            });
            });
        break;
        case 'starships':
            starshipsArray.forEach((item,i) => {
                //console.log(item.name);
                item.forEach(element => {
                html += `<option value="${element.name}">${element.name}</option>`;
            });
            });
        break;
        default:
        console.log('setSecondCategory() switch case does not work');
        break;

    }
    parseNewInfo.innerHTML = html;
    html = '';
}

function clickSearch(){
    //console.log(parseNewInfo.value);
    let currentCategory = seekInfo.value;
    switch (currentCategory){
        case 'people':
            peopleArray.forEach(item =>{
                //console.log(Object.keys(item));
                item.forEach(element =>{
                    if(element.name == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        } 
                       
                    }
                    
                })
            })
        break;
        case 'planets':
            planetsArray.forEach(item => {
                //console.log(item);
                item.forEach(element =>{
                    //console.log(element);
                    if(element.name == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        }
                       
                    }
                })
            })

        break;
        case 'films':
            filmsArray.forEach(item => {
                //console.log(item);
                item.forEach(element =>{
                    //console.log(element);
                    if(element.title == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        }
                       
                    }
                })
            })

        break;
        case 'species':
            speciesArray.forEach(item => {
                //console.log(item);
                item.forEach(element =>{
                    //console.log(element);
                    if(element.name == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        }
                       
                    }
                })
            })

        break;
        case 'vehicles':
            vehiclesArray.forEach(item => {
                //console.log(item);
                item.forEach(element =>{
                    //console.log(element);
                    if(element.name == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        }
                       
                    }
                })
            })

        break;
        case 'starships':
            starshipsArray.forEach(item => {
                //console.log(item);
                item.forEach(element =>{
                    //console.log(element);
                    if(element.name == parseNewInfo.value){
                        //console.log(element.films);
                        for(const [key, value] of Object.entries(element)){
                        //console.log(element);
                        
                        if(key != 'url' && !Array.isArray(value) && key != 'created' && key != 'edited')
                        html += `<p style="color:red">${key}: <span style="color:white">${value}</span> </p>`;       
                        else if(Array.isArray(value) && value.length > 0){
                        
                            html += `<p style="color:red">${key}: <span style="color:white">${value.join('<br>')}</span></p>`; 
                        }
                        else if(Array.isArray(value) && value.length == 0){}

                        }
                       
                    }
                })
            })

        break;
        default:
            console.log('information not searched');
        break;
    }
    displayInfo.style.display = 'flex';
    displayInfo.style.flex = 1;
    formContainer.style.flex = 0;
    displayInfo.innerHTML = html;
    html = '';
    saveData();
}
//searchButton.addEventListener('click', clickSearch);

async function parseSecondInfo(){
        peopleArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

    planetsArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

    filmsArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

    speciesArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

    vehiclesArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

    starshipsArray.forEach(item => {
        item.forEach(element => {            
            for(const [key,value] of Object.entries(element)){
                //console.log(`${key}: ${value}`);
                if(typeof value === 'string' && value.includes('https://swapi.dev/api/')){
                    //console.log(key);
                    let urlResponse = () => {
                        fetch(value)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(item.name);
                            if(key == 'films'){
                            element[key] = newItem.title;
                            }
                            else if(key == 'url'){}
                            else{
                            element[key] = newItem.name;
                            }
                        })
                    }
                    urlResponse();
                } 
                else if(Array.isArray(value)){
                    //console.log(key);
                    console.log(value);
                    value.forEach(subElement => {
                        //console.log(subElement);
                        let urlResponse = () => {
                        fetch(subElement)
                        .then(data => data.json())
                        .then(newItem => {
                            //console.log(element[key]);
                            let pushThis;
                            if(key == 'films'){         
                                pushThis = newItem.title;
                            }
                            else{
                                pushThis = newItem.name;
                            }
                            if(!Array.isArray(element[key])){
                                element[key] = [];
                            }                            
                            element[key].push(pushThis);                            
                        })
                        }
                        urlResponse();
                    })
                    element[key] = element[key].filter(url => !url.includes('https://swapi.dev/api/'));
                }
            }
        })
    })

}

function continueButtonPress(){
    beginningWarning.style.display = 'none';
}

async function loadAll(){
    if(window.localStorage.length == 0){
    await loadingData();
    await findingSecondData();
    await parseSecondInfo();
    } else{
        loadData();
    }
    //console.log("finished first");
    setFirstCategory();

    setSecondCategory();

    
    //console.log('finished second');
    
    seekInfo.addEventListener('change', setSecondCategory);
    // parseSecondInfo();
    const wait = ms => new Promise(resolve =>
        setTimeout(resolve, ms));
        wait(99 * 1000);
    continueButton.style.color = "skyblue";
    continueButton.addEventListener('click', continueButtonPress);
    searchButton.addEventListener('click', clickSearch);
    
}

loadAll();


function openConfirmPanel(){
    confirmation.style.display = 'flex';
}
clearStorage.addEventListener('click', openConfirmPanel)

function confirmButton(){ //CREATE NEW PANEL THAT ASKS FOR CONFIRMATION. MAKE A YES OR NO BUTTON. THEN CHECK IF CONFIRMATION IS TRUE OR FALSE. THEN CLEAR.
    let confirmed = false;
    if(this == yesButton)
    confirmed = true;
    else
    confirmed = false;

    confirmation.style.display = 'none';
    if(confirmed)
    localStorage.clear();
    location.reload();
}
yesButton.addEventListener('click', confirmButton);
noButton.addEventListener('click', confirmButton);

function saveData(){
    let categoryString = JSON.stringify(categoryArray);
    let peopleString = JSON.stringify(peopleArray);
    let planetsString = JSON.stringify(planetsArray);
    let filmsString = JSON.stringify(filmsArray);
    let speciesString = JSON.stringify(speciesArray);
    let vehiclesString = JSON.stringify(vehiclesArray);
    let starshipsString = JSON.stringify(starshipsArray);
    localStorage.setItem("category", categoryString);
    localStorage.setItem("people", peopleString);
    localStorage.setItem("planets", planetsString);
    localStorage.setItem("films", filmsString);
    localStorage.setItem("species", speciesString);
    localStorage.setItem("vehicles", vehiclesString);
    localStorage.setItem("starships", starshipsString);
}
function loadData(){
let retCategory = localStorage.getItem("category");
let retPeople = localStorage.getItem("people");
let retPlanets = localStorage.getItem("planets");
let retFilms = localStorage.getItem("films");
let retSpecies = localStorage.getItem("species");
let retVehicles = localStorage.getItem("vehicles");
let retStarships = localStorage.getItem("starships");

if(retCategory && retPeople && retPlanets && retFilms && retSpecies && retVehicles && retStarships){
    try{
        categoryArray = JSON.parse(retCategory);
        peopleArray = JSON.parse(retPeople);
        planetsArray = JSON.parse(retPlanets);
        filmsArray = JSON.parse(retFilms);
        speciesArray = JSON.parse(retSpecies);
        vehiclesArray = JSON.parse(retVehicles);
        starshipsArray = JSON.parse(retStarships);
    }
    catch(error){
        console.log("One of these didn't load");
    }
}
}
