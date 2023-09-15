@include('includes.layout') 
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="assets/css/jqpagination.css">
<link rel="stylesheet" href="assets/css/daterangepicker.css">

<style>
    .cw-30{max-width: 40%;}
    .pagination input{height:auto !important}
</style>
  

<div class="container body-start">
    <h1 class = "text-center mt-4">Product table</h1>   
    
    <div class="row mt-5"> 
        <div class="col-12 border p-2 shadow">
           <div class="card">
            <div class="card-body">
                <div class="row mb-4">
                    <div class="col-md-3 align-self-center">
                    <div class=" mt-2">
                        <p class="">Show<select class="" id="ShowEntriesList">
                                <option id="10" selected>10</option>
                                <option id="25">25</option>
                                <option id="50">50</option>
                                <option id="100">100</option>
                                <option id="200">200</option>
                            </select> Entries
                        </p>
                    </div>
                </div>  
                <div class="col-md-4 mb-4">
                  <label style="font-weight: 700;color: #000000 !important;" for="location_option">  Date ranges : </label>
                  <div class="form-control" id="customDateRangePicker" style="cursor: pointer;">
                    <i class="fa fa-calendar"></i>&nbsp; <span class="small"></span>
                    <i class="fa fa-caret-down"></i>
                    <input type="hidden" name="to" id="to" value="">
                    <input type="hidden" name="from" id="from" value="">
                  </div>
                </div>  
                <div class="col-md-3">
                    <input type="text" class="form-control mt-4" placeholder="Search ..." value="" id="SearchTextField" onkeypress="return runScript(event)"> 
                </div>
                <div class="col-md-1">
                    <button class="btn btn-primary mt-4" type="button" id="SearchButton"
                            onclick="SearchText()">
                        Search
                    </button>
                </div>
                <div class="col-12 text-right"><p class="mb-0" style="color: red" id="SearchErrorMsg"></p></div> 
                <table id="tableID" class="">
                    <thead class="">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>
                    <tbody id="contactDataTBody"  border = "1">
                        
                    </tbody>
                </table> 
                <div id="wrapper" class="row">
                    <div class="col-md-6 align-self-center">
                        <p class="mb-0" id="showPageNumbers"></p>
                    </div>
                    <div class="col-md-6 mt-3">
                        <div class="gigantic pagination" id="PaginationShow">
                            <a href="#" class="first" data-action="first">&laquo;</a>
                            <a href="#" class="previous" data-action="previous">&lsaquo;</a>
                            <input type="text" readonly="readonly"/>
                            <a href="#" class="next" data-action="next">&rsaquo;</a>
                            <a href="#" class="last" data-action="last">&raquo;</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
           </div>
        </div> 
    </div>
    
</div>

 
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>  
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script> 
<script src="assets/js/moment.min.js"></script> 
<script src="assets/js/jquery.jqpagination.js"></script>
<script src="assets/js/JqueryDatatablesCommon.js"></script> 
<script src="assets/js/daterangepicker.js"></script>
<script src="assets/js/price.js"></script>
 <script> 
     let nineMonth  = true;
     let active_function = 0; 
    //  new DataTable('#tableID',{searching: false, paging: false, info: false});
     $('#tableID').dataTable({searching: false, paging: false, info: false});
 </script>