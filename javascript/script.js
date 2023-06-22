/*
    File: script.js
    GUI Assignment: Appy jQuery validation plugin to validate user inputs form
    Phat Lang, UMass Lowell Computer Science, Phat_Lang@student.uml.edu
    What to submit: Readme file with Github URL and link to repository, a zip file contains the code 
    Description: Use jQuery validation plugin to validate form, feedbacks should make sense. 
    Copyright (c) 2023 by Phat Lang. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated by Phat Lang on June 18 at 7:10 p.m
    References/Citations: I used jQuery Validation documentation
    Additionally, I took some of the codes from these websites
    https://www.javascript-coder.com/form-validation/jquery-form-validation-guide/
*/

function get_Input(table_id){
  var table_value;
  // Get user input
  table_value = document.getElementById(table_id).value;
  table_value = Number(table_value);
  return table_value;
}

function generate_Table(){
  //Remove old table to generate a new one
  var div = document.getElementById('mult-table');
  while(div.firstChild){
    div.removeChild(div.firstChild);
  }
    // Get user inputs
    var min_column = get_Input('table_min_column field1');
    var max_column = get_Input('table_max_column field2');
    var min_row = get_Input('table_min_row field3');
    var max_row = get_Input('table_max_row field4');

    // Inputs should pass validation test before generating table
    var form = $("#myForm");
    if (form.valid() == true) {
      addTable(min_column, max_column, min_row, max_row);
    }
}

function addTable(min_column, max_column, min_row, max_row) {
    var dummy = min_column;
    var dummy2 = min_row;
    var r = min_row - 1;
    var c = min_column - 1;
    var arr = [];
    var column_length = findLength(min_column, max_column);
    var row_length = findLength(min_row, max_row);

    //Create 2-D arrays containing multiplication values
    for(var i = 0; i < row_length; i++) {
      arr[i] = []
      if(i == 0) {
        for(var j = 1; j < column_length; j++){
          arr[0][j] = dummy;
          dummy++;
        }
      }
      else {
        for(var j = 0; j < column_length; j++){
          if(j==0){
            arr[i][j] = dummy2;
            dummy2++
          }
          else {
            arr[i][j] = r * c;
          }
          c++;
        }
      }
      c=min_column-1;
      r++;
    }  

    // Generate table using HTML 
    var myTableDiv = document.getElementById("mult-table");
    var tableBody = document.createElement('table');
  
    for (var i = 0; i < row_length; i++) {
      var tr = document.createElement('tr');
      tableBody.appendChild(tr);
  
      for (var j = 0; j < column_length; j++) {
        var td = document.createElement('th');
        td.appendChild(document.createTextNode(arr[i][j]));
        tr.appendChild(td);
      }
    }
    myTableDiv.appendChild(tableBody);
  }

  // Find the length given two numbers
  function findLength(val1, val2){
    if (val1 < 0 && val2 > 0){
      return Math.abs(val1) + Math.abs(val2) + 2;
    }
    else {
       return Math.abs(Math.abs(val2) - Math.abs(val1)) + 2;
    }
  }

  // Custom Validation Method to check for integer input
  jQuery.validator.addMethod("integer", function(value, element){
    return this.optional(element) || /^[+-]?\d+$/.test(value);
  }, "Please Enter Whole Integer");

  // jQuery validate function
  $( "#myForm" ).validate({
    rules: {
      field1: {
        required: true,
        integer: true,
        min:-1e15,
        max: 1e15
      },
      field2: {
        required: true,
        integer: true,
      },
      field3: {
        required: true,
        integer: true,
        min: -1e15,
        max: 1e15
      },
      field4: {
        required: true,
        integer: true,
      }
    }
  });

  // Change the Min and Max rules based on what user input for Min and Max value
  $('[name=field1]').change(function()
  {
    var $input = $("[name=field2]");
    var value = get_Input("table_min_column field1")
    $input.rules("add", {min:value});
    $input.rules("add", {max:value + 200});
  });

  $('[name=field3]').change(function()
  {
    var $input = $("[name=field4]");
    var value = get_Input("table_min_row field3")
    $input.rules("add", {min:value});
    $input.rules("add", {max:value + 200});
  });