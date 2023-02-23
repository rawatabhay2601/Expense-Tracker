// getting the button
btn = document.getElementById('btn');

// storing the data in the localStorage
btn.addEventListener('click',getData);

let ul = document.getElementById('items');

function getData(){

    let num = Math.floor(Math.random() * 100000);

    let money = document.getElementById('money');
    let desc = document.getElementById('description');
    let category = document.getElementById('category');

    let obj = {
        money :money.value,
        desc : desc.value,
        category : category.value,
    }

    // serialized object
    let objStr = JSON.stringify(obj);
    localStorage.setItem(num,objStr);

    // Creating li tag
    let li = document.createElement('li');
    let data = document.createTextNode(obj.money+' - '+obj.desc+' - '+obj.category);
    li.className = "list-group-item";
    li.appendChild(data);

    // creating delete button
    let del = document.createElement('button');
    let deleteData = document.createTextNode('X');
    del.className = "btn btn-outline-danger float-end";
    del.style = "margin-left:3px";
    del.appendChild(deleteData);

    // creating edit button
    let edit = document.createElement('button');
    let editData = document.createTextNode('Edit');
    edit.className = "btn btn-outline-success float-end";
    edit.style="margin-right:3px";
    edit.appendChild(editData);

    // appending delete to li 
    li.appendChild(del);
    li.appendChild(edit);

    // appending to ul tag
    ul.appendChild(li);

    // edit functionality
    edit.onclick = (e) => {
        money.value = obj.money;
        desc.value = obj.desc;
        category.value = obj.category;
        localStorage.removeItem(num);
        ul.removeChild(e.target.parentElement);
    }

    // deleting li tag
    del.onclick = (e) => {
        localStorage.removeItem(num);
        ul.removeChild(e.target.parentElement);
    }

}
