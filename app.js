var App = {};
App.auth = {};


App['err'] = function(msg) {
    document.getElementById('error').innerHTML = msg;
}


App['auth']['logout'] = async function() {
    var data = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: "same-origin"
    }).then(lol => lol.json());

    if (data.ok == false) {
        App.err(data.msg);
    } else {
        window.location = '/';
    }
}

App['auth']['login'] = async function() {
    var us = {
        type: document.getElementById('input_type').value,
        username: document.getElementById('input_type').value,
        password: document.getElementById('input_type').value
    };
    var data = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(us)
    }).then(lol => lol.json());

    if (data.ok == false) {
        App.err(data.msg);
        console.error(data);
    } else {
        window.location = '/';
    }
}