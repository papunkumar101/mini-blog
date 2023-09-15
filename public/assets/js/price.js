let SHOW_ENTRIES = 10;
let SORT_NAME = "";
let SORT_ORDER = "";
let SORTED_TAG_ID = "";
let STORE_GLOBALS;
let PAGE_COUNT_CALL = false;
let SEARCH_TEXT = "";
let TOTAL_COUNT_ROWS = true; 
let TO_DATE = ""; 
let FROM_DATE = ""; 



$(function () { 
    var start = moment().subtract(0, 'days');
    var end = moment();

    function cb(start, end) {  
        $('#customDateRangePicker span').html(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        $('#from').val(start.format('YYYY-MM-DD'));
        $('#to').val(end.format('YYYY-MM-DD'));
        from = $('#from').val();
        to = $('#to').val();
        if (active_function == 1) {  
            let SelectedFromDate = new Date(new Date(from).setHours(0, 0, 0, 0)).toISOString();
            let SelectedToDate = new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString();
            TO_DATE = SelectedToDate;
            FROM_DATE = SelectedFromDate;
            makeDefaultFunction();
            // priceData(); 
        }

        if (active_function == 0) active_function = 1;
    }

    $('#customDateRangePicker').daterangepicker({
        startDate: start,
        endDate: end,
        minDate: moment().subtract(90, 'days'),
        maxDate: end,
        dateLimit: { days: 30 },
        ranges: {
            ['Today']: [moment(), moment()],
            ['Yesterday']: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            ['Last_7_Days']: [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            ['Last_30_Days']: [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            ['This_Month']: [moment().startOf('month'), moment().endOf('month')],
            ['Last_Month']: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        },
        locale: {
            'customRangeLabel':'Custom_Range',
            "applyLabel": 'apply',
            "cancelLabel": 'cancel',
        },
    }, cb); 
    cb(start, end);

    priceData();
}); 
 


let priceData = (skip, SEARCH_TEXT) => {
    $.ajax({
        url: '/product-list',
        type: 'GET',
        data: {
            skip,
            SHOW_ENTRIES,
            SEARCH_TEXT,
            SORT_ORDER,
            SORT_NAME, 
            TO_DATE,
            FROM_DATE
        },
        beforeSend: function () {
            $('#contactDataTBody').html(''); 
        },
        success: function (response) { 
            console.log(response);
            if (response.status === 200) {  
              let dynamicData = appendInContactDataTBody(response);
              $('#contactDataTBody').html(dynamicData);
              if (TOTAL_COUNT_ROWS !== response.total || PAGE_COUNT_CALL === true) {
                    TOTAL_COUNT_ROWS = response.total;
                    paginationSetup(); 
                    TOTAL_COUNT_ROWS < SHOW_ENTRIES ? $("#showPageNumbers").html(' showing ' + 1 + ' to ' + TOTAL_COUNT_ROWS + '   of  ' + TOTAL_COUNT_ROWS) : $("#showPageNumbers").html(' ' + 'showing' + ' ' + 1 + ' ' + 'to' + ' ' + SHOW_ENTRIES + ' ' + 'of' + ' ' + TOTAL_COUNT_ROWS);
                } 
            } else {
                $('#contactDataTBody').html('');
                $("#contactDataTBody").append(`<tr><td></td><td>${response.errorMessage}</td><td></td></tr>`);
                TOTAL_COUNT_ROWS = 0;
                $("#showPageNumbers").html(' ' + 'showing' + ' ' + 0 + ' ' + 'to' + ' ' + 0 + ' ' + 'of' + ' ' + 0);
                // makeDatatableDefault();
                PAGE_COUNT_CALL = true;
                $('.pagination').jqPagination('destroy')
            }

        },
        error: function (err) {
            console.log('error',err); 
        }
    })
};

let appendInContactDataTBody = (res) => { 
    let html = '';
    res.products.map(function (value, index) { 
        index ++;
        html += '<tr  border = "1"><th scope="row">' + value.id + '</th>';
        html += '<td>' + value.title + '</td>';
        html += '<td>' + value.price + '</td>';
        html += '<td>' + value.brand + '</td>';
        html += '<td>' + value.category + '</td>';
        html += '</tr>'; 
    });
    return html;
}


//called user function for the datatable to get the skip value and search text
function CalledUserFunction(skip, searchtext) {
    SEARCH_TEXT = searchtext;
    priceData(skip, SEARCH_TEXT,SORT_NAME,SORT_ORDER);
}
let makeDefaultFunction = () => {
    $('.pagination').jqPagination('destroy');
    PAGE_COUNT_CALL = true;
    priceData(0)
}
   

