//function for pagination setup
let paginationSetup = (modal) => {
    // modal 0 --> if main module    pass  2----------> if inside modal of module
    let PageNumbers = (TOTAL_COUNT_ROWS % SHOW_ENTRIES) !== 0 ? Math.floor(TOTAL_COUNT_ROWS / SHOW_ENTRIES) + 1 : Math.floor(TOTAL_COUNT_ROWS / SHOW_ENTRIES);
    PAGE_COUNT_CALL = false;
    if (modal == 2) {
        $('.paginationInside').jqPaginationInside({
            link_string: '/?page={page_number}',
            max_pages: PageNumbers,
            page_string: `Page ` + ' {current_page} ' + ` of ${PageNumbers}`,
            paged: function (page) {
                PaginationInitialize(page, 2)
            }
        });
    } else {
        $('.pagination').jqPagination({
            link_string: '/?page={page_number}',
            max_page: PageNumbers,
            page_string: `Page ` + ' {current_page} ' + ` of ${PageNumbers}`,
            paged: function (page) {
                PaginationInitialize(page, 0)
            }
        });
    }

};

//pagination setup intialization
function PaginationInitialize(page, modal) {
    ACTIVE_PAGE = parseInt(page);
    ENTRIES_DELETED = (TOTAL_COUNT_ROWS < SHOW_ENTRIES * page) ? TOTAL_COUNT_ROWS : SHOW_ENTRIES * page;
    CalledUserFunction(((page - 1) * SHOW_ENTRIES), $("#SearchTextField").val(), modal);

    if (modal == '2') {
        if (page === 1) {
            TOTAL_COUNT_ROWS < SHOW_ENTRIES ? $("#showPageNumbersInside").html('' + "Showing" + ' ' + 1 + ' ' + "To" + ' ' + TOTAL_COUNT_ROWS + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS)
                : $("#showPageNumbersInside").html('' + "Showing" + ' ' + 1 + ' ' + "To" + ' ' + SHOW_ENTRIES + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS);
        } else {
            (page * SHOW_ENTRIES) > TOTAL_COUNT_ROWS ? $("#showPageNumbersInside").html('' + "Showing" + ' ' + (((page - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + TOTAL_COUNT_ROWS + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS)
                : $("#showPageNumbersInside").html('' + "Showing" + ' ' + (((page - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + page * SHOW_ENTRIES + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS);
        }
    } else {
        if (page === 1) {
            TOTAL_COUNT_ROWS < SHOW_ENTRIES ? $("#showPageNumbers").html('' + "Showing" + ' ' + 1 + ' ' + "To" + ' ' + TOTAL_COUNT_ROWS + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS)
                : $("#showPageNumbers").html('' + "Showing" + ' ' + 1 + ' ' + "To" + ' ' + SHOW_ENTRIES + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS);
        } else {
            (page * SHOW_ENTRIES) > TOTAL_COUNT_ROWS ? $("#showPageNumbers").html('' + "Showing" + ' ' + (((page - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + TOTAL_COUNT_ROWS + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS)
                : $("#showPageNumbers").html('' + "Showing" + ' ' + (((page - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + page * SHOW_ENTRIES + ' ' + "Of" + ' ' + TOTAL_COUNT_ROWS);
        }
    }


}

//on change of show entries list
$("#ShowEntriesList, #ShowEntriesListInside").on('change', function () {
    SHOW_ENTRIES = $(this).find('option:selected').attr('id');
    if ($(this).attr('id') == 'ShowEntriesListInside') {
        makeDatatableDefault(2);
        $("#SearchTextFieldInside").val("");
        CalledUserFunction(0, $("#SearchTextField").val(), 2);

    } else {
        makeDatatableDefault();
        CalledUserFunction(0, $("#SearchTextField").val());
    }
});

//search text field to get the text
let SearchText = (modal) => {
    updateStatus();
    if (modal == '2') {
        $("#showPageNumbersInside").html('' + "Showing" + '  0  ' + "To" + ' 0 ' + "Of" + ' 0');
        $("#SearchButtonInside").attr('disabled', true);
        $("#SearchErrorMsgInside").html("");
        ($("#SearchTextFieldInside").val().length >= 3 || $("#SearchTextFieldInside").val() == "") ? (PAGE_COUNT_CALL = true, CalledUserFunction(0, $("#SearchTextFieldInside").val(), 2), $('.paginationInside').jqPaginationInside('destroy'))
            : ($("#SearchErrorMsgInside").html("Please, Search with minimum three letters"), $("#SearchButtonInside").attr('disabled', false));
    } else {
        $("#SearchErrorMsg").html("");
        $("#SearchButton").attr('disabled', true);
        ($("#SearchTextField").val().length >= 3 || $("#SearchTextField").val() == "") ? (PAGE_COUNT_CALL = true, CalledUserFunction(0, $("#SearchTextField").val()) , $('.pagination').jqPagination('destroy'))
            : ($("#SearchErrorMsg").html("Please, Search with minimum three letters"), $("#SearchButton").attr('disabled', false));
    }
};

let stopper = false;

let updateStatus = () => {
    stopper = true;
    setTimeout(() => {
     stopper = false;
    }, 1000);
}
//function to search on enter
let runScript = (e, modal) => {

    if (e.keyCode == 13) {
        stopper === false ? SearchText(modal)  : null;
    }
}

let makeDatatableDefault = (modal) => {
    // modal   0----->if main module  2----->if inside module
    if (modal == '2') $('.paginationInside').jqPaginationInside('destroy');
    else $('.pagination').jqPagination('destroy');
    PAGE_COUNT_CALL = true;
    (SORT_NAME !== '') ? $('#' + SORTED_TAG_ID).removeClass($("#" + SORTED_TAG_ID).attr('class')).addClass('fas fa-long-arrow-alt-down text-light') : null;
    $("#SearchTextField").val("");
    $("#SearchErrorMsg").html("");
    SORT_NAME = '';
    SORT_ORDER = '';
    SORTED_TAG_ID = '';
};

//sorting the datatable
let sort = (SortedField, TagId, modal) => {
    // SortedField ----> Which field we are going to sort and it should be same as the backend param to send
    // TagId  ---->  That particular tag id to change the arrow indication
    // If main module no need of pass any thing  if inside modal table pass  1
    if (modal == '2') $('.paginationInside').jqPaginationInside('destroy');
    else $('.pagination').jqPagination('destroy');
    PAGE_COUNT_CALL = true;
    if (SORT_NAME !== SortedField) {
        (SORT_NAME !== '') ? $('#' + SORTED_TAG_ID).removeClass($("#" + SORTED_TAG_ID).attr('class')).addClass('fas fa-long-arrow-alt-down text-light') : null;
        $('#' + TagId).removeClass($("#" + TagId).attr('class')).addClass('fas fa-long-arrow-alt-up');
        SORT_NAME = SortedField;
        SORT_ORDER = 'A';
        SORTED_TAG_ID = TagId;
        if (modal == '2') CalledUserFunction(0, $("#SearchTextFieldInside").val(), modal);
        else CalledUserFunction(0, $("#SearchTextField").val(), modal);
    } else {
        if (SORT_ORDER == 'A') {
            $('#' + TagId).removeClass($("#" + TagId).attr('class')).addClass('fas fa-long-arrow-alt-down');
            SORT_ORDER = 'D';
            if (modal == '2') CalledUserFunction(0, $("#SearchTextFieldInside").val(), modal);
            else CalledUserFunction(0, $("#SearchTextField").val(), modal);

        } else {
            $('#' + TagId).removeClass($("#" + TagId).attr('class')).addClass('fas fa-long-arrow-alt-up');
            SORT_ORDER = 'A';
            if (modal == '2') CalledUserFunction(0, $("#SearchTextFieldInside").val(), modal);
            else CalledUserFunction(0, $("#SearchTextField").val(), modal);
        }
    }
};

//function for delete and add updated according to show entries
let deleteAddShowEntries = (operation) => {
//    the param operation   1---> delete  and 2----->add the records  3 --> for mulitple delete
    ENTRIES_DELETED = parseInt(ENTRIES_DELETED);
    SHOW_ENTRIES = parseInt(SHOW_ENTRIES);
    TOTAL_COUNT_ROWS = parseInt(TOTAL_COUNT_ROWS);
    if (operation == 1 || operation == 3) {
        if (ACTIVE_PAGE == 1) {
            if (ENTRIES_DELETED === 1 && TOTAL_COUNT_ROWS === 1) $("#showPageNumbers").html('' + "Showing" + '  0 ' + "To" + ' 0 ' + "Of" + ' 0');
            else if (SHOW_ENTRIES >= TOTAL_COUNT_ROWS) $("#showPageNumbers").html('' + "Showing" + '  1 ' + "To" + ' ' + (ENTRIES_DELETED - 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS - 1));
            else $("#showPageNumbers").html('' + "Showing" + ' 1 ' + "To" + ' ' + (parseInt(ENTRIES_DELETED) - 1) + ' ' + "Of" + ' ' + (parseInt(TOTAL_COUNT_ROWS) - 1));
        } else if (ACTIVE_PAGE >= (Math.floor(TOTAL_COUNT_ROWS / SHOW_ENTRIES) + 1)) {
            $("#showPageNumbers").html('' + "Showing" + ' ' + (((ACTIVE_PAGE - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + (ENTRIES_DELETED - 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS - 1));
        } else {
            $("#showPageNumbers").html('' + "Showing" + ' ' + (((ACTIVE_PAGE - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + (ENTRIES_DELETED - 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS - 1));
        }
        if (operation == 1) {
            --ENTRIES_DELETED;
            --TOTAL_COUNT_ROWS;
        }
    } else if (operation == 2) {
        if (ACTIVE_PAGE == 1) {
            if (SHOW_ENTRIES >= TOTAL_COUNT_ROWS) $("#showPageNumbers").html('' + "Showing" + '  1 ' + "To" + ' ' + (ENTRIES_DELETED + 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS + 1));
            else $("#showPageNumbers").html('' + "Showing" + ' 1 ' + "To" + ' ' + (parseInt(ENTRIES_DELETED) + 1) + ' ' + "Of" + ' ' + (parseInt(TOTAL_COUNT_ROWS) + 1));
        } else if (ACTIVE_PAGE >= (Math.floor(TOTAL_COUNT_ROWS / SHOW_ENTRIES) + 1)) {
            $("#showPageNumbers").html('' + "Showing" + ' ' + (((ACTIVE_PAGE - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + (ENTRIES_DELETED + 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS + 1));
        } else {
            $("#showPageNumbers").html('' + "Showing" + ' ' + (((ACTIVE_PAGE - 1) * SHOW_ENTRIES) + 1) + ' ' + "To" + ' ' + (ENTRIES_DELETED + 1) + ' ' + "Of" + ' ' + (TOTAL_COUNT_ROWS + 1));
        }
        ++ENTRIES_DELETED;
        ++TOTAL_COUNT_ROWS;
    }
}

//to store the global variables if inside modal was opened.

function StoreGlobals(id) {
    if (id === 1) {
        STORE_GLOBALS = {
            Entries: SHOW_ENTRIES,
            sortName: SORT_NAME,
            sortOrder: SORT_ORDER,
            PageCountCall: PAGE_COUNT_CALL,
            sortTagId: SORTED_TAG_ID,
            ActivePage: ACTIVE_PAGE,
            EntriesDeleted: ENTRIES_DELETED,
            TotalCountEmails: TOTAL_COUNT_ROWS
        };
    } else {
        STORE_GLOBALS = {
            Entries: SHOW_ENTRIES,
            sortName: SORT_NAME,
            sortOrder: SORT_ORDER,
            PageCountCall: PAGE_COUNT_CALL,
            sortTagId: SORTED_TAG_ID,
            TotalCountEmails: TOTAL_COUNT_ROWS
        };
    }

    SHOW_ENTRIES = "10";
    SORT_NAME = '';
    SORT_ORDER = '';
    SORTED_TAG_ID = '';
    PAGE_COUNT_CALL = true;
    if (id === 1) {
        ACTIVE_PAGE = "";
        ENTRIES_DELETED = "";
    }
    TOTAL_COUNT_ROWS = "";
    // makeDatatableDefault(2);
    CalledUserFunction(0, $("#SearchTextField").val(), 2);

};

// to replace the global variables as it is when the modal was closed
function replaceGlobals(id) {
    SHOW_ENTRIES = STORE_GLOBALS.Entries;
    SORT_NAME = STORE_GLOBALS.sortName;
    SORT_ORDER = STORE_GLOBALS.sortOrder;
    SORTED_TAG_ID = STORE_GLOBALS.sortTagId;
    PAGE_COUNT_CALL = STORE_GLOBALS.PageCountCall;
    if (id === 1) {
        ACTIVE_PAGE = STORE_GLOBALS.ActivePage;
        ENTRIES_DELETED = STORE_GLOBALS.EntriesDeleted;
    }

    TOTAL_COUNT_ROWS = STORE_GLOBALS.TotalCountEmails;
    if (id === 1) {
        $('#NameSortInside').removeClass($("#NameSortInside").attr('class')).addClass('fas fa-long-arrow-alt-down text-light');
        $(".paginationInside").jqPaginationInside('destroy');
        $("#showPageNumbersInside").html('' + "Showing" + ' 0 ' + "To" + '  0 ' + "Of" + ' 0');
        $("#SearchTextFieldInside").val("");
    }

}

// // from here adding column and update column
$("#checkloc").click(function () {
    $('.selectCheckbox').not(this).prop('checked', this.checked);
    if (this.checked ) {
        ADD_REMOVE_COLUMN = ORIGINAL_TABLE_HEADER;
        ADD_REMOVE_COLUMN.forEach(function (elements) {
            let column = "table ." + elements + "Table";
            setTimeout(function () {
                $(column).toggle();
            }, 10)
        });
    } else {
        ADD_REMOVE_COLUMN = [];
        let headerData = ORIGINAL_TABLE_HEADER;
        headerData.forEach(function (elements) {
            $("table ." + elements + "Table").hide();
        });
    }
});

$("#checklocDownload").click(function () {
    $('.downloadCheckbox').not(this).prop('checked', this.checked);
});

// To show the dropdown data.
function openDropDownModal() {
    document.getElementById("myaddData").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.add-tab-icon')) {
        var dropdowns = document.getElementsByClassName("addData-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

$(".selectCheckbox").click(function () {
    let column = "table ." + $(this).val() + "Table";
    if(this.checked) {
        $(column).toggle();
        ADD_REMOVE_COLUMN.push($(this).val());
        tableHeaderUpdated();
    }
    else {
        $("#checkloc").prop('checked',false);
        $(column).hide();
        ADD_REMOVE_COLUMN.splice( $.inArray( $(this).val(), ADD_REMOVE_COLUMN), 1 );
        tableHeaderUpdated();
    }
});

// For download option dropdown
function mydowmload(id = 'null') {
    $('#mytimesheetdataDownload').is(':visible') === false ? $("#mytimesheetdataDownload").show() : $("#mytimesheetdataDownload").hide();
    if (id !== 'null') $("#downloadValue").val(id);
    $('.downloadCheckbox:checked').map(function () {
        $('#mytimesheetdataDownload input[value="' + $(this).val() + '"]').prop('checked', false);
    }).get();
    $('.selectCheckbox:checked').map(function () {
        $('#mytimesheetdataDownload input[value="' + $(this).val() + '"]').prop('checked', 'checked');
    });
    document.getElementById("mytimesheetdataDownload").classList.toggle("show");
    id === 2 ? $("#Manager_List_Id, #Split_List_Id").hide() : $("#Manager_List_Id, #Split_List_Id").show();
}
$(document).mouseup(function(e){
    let dropdown = $("#mytimesheetdataDownload");
    let checkbox =$("#ExportButton");

    if(!dropdown.is(e.target) && dropdown.has(e.target).length === 0 ){
        dropdown.hide();
    }
    else if (dropdown.is(e.target) (dropdown.has(e.target) && (checkbox.is(e.target)))){
        dropdown.show();
        $("#checklocDownload").prop('checked',true);
    }
    else (dropdown.checked)
    {
        checkbox.checked = false;
        $("#checklocDownload").prop('checked',false);
    }

});

    let downloadFile = () => {
    $("#mytimesheetdataDownload").hide();
    attendanceReportsDownload($("#downloadValue").val())
};
