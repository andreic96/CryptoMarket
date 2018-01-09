var nb = 10;
var currentPage = 1;
var searchVal = "";
var url = "https://api.coinmarketcap.com/v1/ticker/";

function insertData(data) {
    var coinTable = document.getElementById('coins-data');

    for(var i = 0; i < data.length; i++){
        var row = coinTable.insertRow(-1);
        var noCell = row.insertCell(0);
        var symbolCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var capCell = row.insertCell(3);
        var supplyCell = row.insertCell(4);
        var priceCell = row.insertCell(5);
        var change24Cell = row.insertCell(6);

        row.style.display = "none";

        noCell.innerHTML = data[i].rank;
        symbolCell.innerHTML = data[i].symbol;
        nameCell.innerHTML = data[i].name;
        capCell.innerHTML = '$' + parseInt(data[i].market_cap_usd).toLocaleString('en-USD');
        supplyCell.innerHTML = parseInt(data[i].total_supply).toLocaleString('en-USD') + ' ' + data[i].symbol ;
        priceCell.innerHTML = '$' + data[i].price_usd ;
        change24Cell.innerHTML = data[i].percent_change_24h + "%";

        change24Cell.classList.add('percentage');
        data[i].percent_change_24h > 0 ? change24Cell.classList.add('percentage-up') : change24Cell.classList.add('percentage-down');
    }
}

function showData(addStart, addEnd, rmStart = 0, rmEnd = 0) {
    var coinTable = document.getElementById('coins-data');
    var tr = coinTable.getElementsByTagName('tr');

    for (var i = rmStart; i < rmEnd; i++) {
        tr[i].style.display = "none";
    }

    for (var i = addStart; i < addEnd; i++) {
        tr[i].style.display = "";
    }
}

function getNbItemsOnPage() {
    var noItems = document.getElementById('itemsonpage');
    noItems.addEventListener('change', function () {
        prev_nb = nb;
        nb = noItems.options[noItems.selectedIndex].value;
        showData(0, nb, (currentPage - 1) * prev_nb, currentPage * prev_nb);
        currentPage = 1;
    })
}

function changePage(data) {
    var prevPageBtn = document.getElementsByClassName('prev')[0];
    var nextPageBtn = document.getElementsByClassName('next')[0];

    prevPageBtn.addEventListener('click', function () {
        if(currentPage > 1) {
            currentPage -= 1;
            showData((currentPage - 1) * nb, currentPage * nb,  currentPage * nb, (currentPage + 1) * nb);
        }
    });
    nextPageBtn.addEventListener('click', function () {
        if(currentPage < data.length / nb) {
            currentPage += 1;
            showData((currentPage - 1) * nb, currentPage * nb, (currentPage - 2) * nb, (currentPage - 1) * nb);
        }
    });
}

function search(data) {
    var searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', function () {
        searchVal = searchBox.value.toLowerCase();
        table = document.getElementById("coins-data");
        tr = table.getElementsByTagName("tr");

        for(var i = 0; i < tr.length ;i++){
            td_name = tr[i].getElementsByTagName("td")[2];
            td_symbol = tr[i].getElementsByTagName("td")[1];
            if(td_name.innerHTML.toLowerCase().indexOf(searchVal) !== -1
                || td_symbol.innerHTML.toLowerCase().indexOf(searchVal) !== -1) {
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }

        }

        if(searchVal === ""){
            currentPage = 1;
            showData(0, nb, nb, data.length);
        }
    });
}

function hideLoadingSpinner() {
    document.getElementsByClassName('spinner')[0].remove();
}

function responseData(url) {
    fetch(url, {
        method: 'get'
    }).then(function (response) {
        hideLoadingSpinner();
        return response.json();
    })
        .then(function (data) {
            insertData(data);
            getNbItemsOnPage(data);
            showData((currentPage - 1) * nb, currentPage * nb);
            changePage(data);
            search(data);
    }).catch(function (err) {
        console.log(err);
    });
}

responseData(url);