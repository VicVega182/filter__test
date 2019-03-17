var list = {
    'text': 'Containing,Exactly matching,Begins with,Ends with',
    'number': 'Equal,Greater than,Less than'
};
selectChange = (function () {
    function change(slave, data) {
        var x, dataArray, option;
        slave.innerHTML = "";
        if (!(this.value in data)) {
            return false;
        }
        dataArray = data[this.value].split(",");
        for (x = 0; x < dataArray.length; x++) {
            option = document.createElement("option");
            option.value = dataArray[x];
            option.innerHTML = dataArray[x];
            slave.appendChild(option);
        }
    }

    return function (master, slave, data) {
        master.onchange = function () {
            change.call(this, slave, data);
            this.closest('div').lastElementChild.value = '';
            this.closest('div').lastElementChild.setAttribute('type', this.value);
        }
        master.onchange();
    }
})();

var i = 0;

function addRow() {
    i++;
    if (i <= 10) {
        var div = document.getElementById('elFilter'),
            clone = div.cloneNode(true);
        clone.id = "elFilter" + i;
        clone.querySelector('#type').id = 'type' + i;
        clone.querySelector('#filter').id = 'filter' + i;
        document.getElementById('filter__list').appendChild(clone);
        selectChange(document.getElementById('type' + i), document.getElementById("filter" + i), list);
    } else {
        return false;
    }
};
function removeRow() {
    this.closest('div').remove();
};

function resetForm() {
    document.getElementById("filterForm").reset();
    while (document.getElementById("filter__list").children.length > 1) {
        document.getElementById("filter__list").removeChild(document.getElementById("filter__list").lastChild);
    }
}

function apply() {
    var elems = document.getElementsByClassName('filter__row');
    var text = [];
    var number = [];
    for (i = 0; i < elems.length; i++) {
        var arr = new Map([
            ['operation',  elems[i].getElementsByTagName('select')[1].value],
            ['value', elems[i].lastElementChild.value]
        ]);
        if(elems[i].firstElementChild.value == 'text') {
            text.push(arr);
        } else {
            number.push(arr);
        }
    }
    var all = new Map([
        ['text', text],
        ['number', number]
    ]);
    console.log(all);
}

document.addEventListener("DOMContentLoaded", function (event) {
    selectChange(document.getElementById("type"), document.getElementById("filter"), list);
});
