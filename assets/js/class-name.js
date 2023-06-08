//Get all the Class Names for tables
$(document).ready(() => {
    fetch('http://localhost:3000/class-name/read/all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => populateTable(response.json()))
        .then(response => console.log(JSON.stringify(response)))
})

function populateTable(classNames) {
    const html = '';
    classNames.forEach(classNameInfo => {
        html.concat(`
       <tr>
       <th scope="row">${classNameInfo.id}</th>
       <td>${classNameInfo.name}</td>
       <td>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal"
       data-bs-target="#updateClassNameModal" onclick="setSelectedId(${classNameInfo.id})">
       Update
       </button>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal"
       data-bs-target="#deleteClassNameModal" onclick="setSelectedId(${classNameInfo.id})">
       Delete
       </button>
       </td>
       </tr>
       `)
    });
    $('#class_names').html(html);
}

// Add Class Name function
function add() {
    const className = $('#addClassName').val();
    const body = [{ name: className }];
    fetch('http://localhost:3000/class-name/add/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

//Update Class Name Function
var selectedId = '';

function update() {
    const className = ("#updateClassName").val();
    const body = [{ id: selectedId, name: className }];
    fetch('http://localhost:3000/class-name', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(()=> removeSelectedId())
        .then(response => console.log(JSON.stringify(response)))

}

function setSelectedId(id) {
    selectedId = id;
}

function removeSelectedId() {
    selectedId = '';
}

//Delete class name
function deleter() {
    const body = [{ id: selectedId }];
    fetch('http://localhost:3000/class-name/' + selectedId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(()=> removeSelectedId())
        .then(response => console.log(JSON.stringify(response)))
}