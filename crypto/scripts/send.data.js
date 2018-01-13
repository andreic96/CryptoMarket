function responseData(url) {
    var form = {"name":"", "email":"", "subject":"", "message":""};
    form.name = document.getElementById('name').value;
    form.email = document.getElementById('email').value;
    form.subject = document.getElementById('subject').value;
    form.message = document.getElementById('message').value;
    form = JSON.stringify(form);
    console.log(form);
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: form,
    }).then(function (response) {
            return response;
    })
        .then(function (data) {
            // console.log( data);
        }).catch(function (err) {
            console.log(err);
    });
}

document.getElementById('messData').addEventListener('submit', function (event) {
    event.preventDefault();
    var url = '/mail.php';
    responseData(url);

    document.getElementsByClassName('well')[0].innerHTML = "<div class=\"alert alert-success text-center\">\n" + "  <h1>Message sent successfully.</h1>\n" + "</div>";
});