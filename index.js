let URL = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json';

function toggleDetails(id){
    let item = document.querySelector(`#i${id} p`);
    let symbol = document.querySelector(`#i${id} span`);
    symbol.textContent= symbol.textContent == '+' ? '-' : '+';
    item.style.display = item.style.display == 'block' ? 'none' : 'block'; 

}

function compare(a, b){
    if(a.descriptor < b.descriptor){
        return -1;
    }
    if(a.descriptor > b.descriptor){
        return 1;
    }
    return 0;
}

function handleSearch(borough){
    let list = document.getElementById('list');
    let input = document.getElementById('search').value;
    let limit = input == '' ? 10 : input;
    let URL = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD&borough=${borough}&$limit=${limit}`;
    fetch(URL)
        .then((res) => res.json())
        .then((res) => {
            let append = '';
            res.forEach(e => 
                append += `<li id='i${e.unique_key}' class='item'>
                    ${e.descriptor}
                    <span onclick="toggleDetails(${e.unique_key})">+</span>
                    <p>${e.resolution_description}</p>
                </li>`
            );
            list.innerHTML = append;
        });

}
