var currentText = "";
var currentStartIndex = 0;
var currentEndIndex = 1;
var words = [];
var myFocusOffset =  window.getSelection().focusOffset;
var currentFunctionIndex = 1;

$(function() {
    $(document).ready(function() {
        var quill = new Quill('#editor', {
            theme: 'snow'
        });
        // 載入儲存的文字
        changeCSS();
        loaddata();
        words = ["勞動基準法第5條</br>雇主不得以強暴、脅迫、拘禁或其他非法之方法，強制勞工從事勞動。","勞動基準法第6條</br>任何人不得介入他人之勞動契約，抽取不法利益。","定期契約屆滿後，有左列情形之一者，視為不定期契約：<br />(一)勞工繼續工作而雇主不即表示反對意思者。<br />(二)雖經另訂新約，惟其前後勞動契約之工作期間超過九十日，前後契約間斷期間未超過三十日者。勞動基準法第9條第2項第1款","勞動契約，分為定期契約及不定期契約。臨時性、短期性、季節性及特定性工作得為定期契約；有繼續性工作應為不定期契約。派遣事業單位與派遣勞工訂定之勞動契約，應為不定期契約。<br />定期契約屆滿後，有左列情形之一者，視為不定期契約：<br />(一)勞工繼續工作而雇主不即表示反對意思者。<br />(二)雖經另訂新約，惟其前後勞動契約之工作期間超過九十日，前後契約間斷期間未超過三十日者。前項規定於特定性或季節性之定期工作不適用之。</br>勞動基準法第9條第1項","可允許使用之武力(正當防衛)", "可不可", "債主", "債務","債權受益人", "遺產管理人", "銀行帳戶", "前約因", "不成比例", "受拘束"];
        autocomplete($('.ql-editor'), words);
    });

    // 偵測 Ctrl+S 儲存檔案
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    alert("成功儲存檔案!");
                    savedata();
                    break;
                // function 1
                case 'y':    
                    currentFunctionIndex = 1;
                    showFunctionName();
                    break;
                // function 2
                case 'u':
                    currentFunctionIndex = 2;
                    showFunctionName();
                    break;
                // function 3
                case 'i':
                    currentFunctionIndex = 3;
                    showFunctionName();
                    break;
            }
        }
    });
    $('.ql-editor').bind("DOMSubtreeModified", function (e) {
        words = getSuggestions(currentText);
    });
});

function loaddata(){
    if(window.localStorage["data"]){
        document.getElementsByClassName("ql-editor")[0].innerHTML = window.localStorage.getItem("data");
    }
}
function savedata(){
    var inputText = document.getElementsByClassName("ql-editor")[0].innerHTML;
    window.localStorage.setItem('data', inputText);
}

// 取得目前輸入游標位置
function getTextPosition() {
    var range = quill.getSelection();
    if (range) {
        if (range.length == 0) {
            console.log('User cursor is at index', range.index);
            var startPos = range.index;
        } else {
            var text = quill.getText(range.index, range.length);
            console.log('User has highlighted: ', text);
        }
    } else {
        console.log('User cursor is not in editor');
    }
}

function autocomplete(inp, arr) {
    // arr 是建議字詞列表
    var currentFocus;
    // 建立一個包含所有建議字詞的list
    inp.bind("DOMSubtreeModified", function (e) {
        // 移動斷詞的結尾到最後
        // TODO: 現在如果刪除字的話會錯
        currentEndIndex = inp.text().length;
        // console.log(currentStartIndex　+ "," + currentEndIndex);
        currentText =  inp.text().slice(currentStartIndex, currentEndIndex);
        arr = words;
        // TODO: val應該是從上次斷掉的地方開始
        var a, b, i, val = currentText;
        // var a, b, i, val = currentText;
        // console.log(val);
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = 0;
        /*create a DIV element that will contain the items (values):*/
        // a = document.getElementById("autocomplete-list");
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        document.body.appendChild(a);
        f = document.createElement("DIV");
        f.setAttribute("id", "function-info");
        a.appendChild(f);
        // this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          // TODO: 斷詞處理
          // val的值為斷詞
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                // TODO: 修正插入位置
                insertTextAtCursor(this.getElementsByTagName("input")[0].value.substr(val.length));
                closeAllLists();
                // 把斷詞起始位置移到最後
                currentStartIndex = inp.text().length;
            });
            a.appendChild(b);
          }
        }

        // 取得游標所在位置 把popup擺放到游標旁邊
        if( $('.autocomplete-items').length ){
            var tip = $('.autocomplete-items');
            var pos = getCaretPosition();
            tip.css({
                left: pos.x + 10,
                top: pos.y + 10
            });
        }
        showFunctionName();
    });
    // 偵測鍵盤輸入 看是選擇列表上哪個字詞
    inp.bind('keydown', function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        
        if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
        } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
        } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    // TODO: 保留no suggestion
    function closeAllLists(elmnt) {
        console.log("closeAllList");
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }        
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
function showFunctionName(){
    var listNode, pos;
    if( $('#autocomplete-list').length < 1){
        listNode = document.createElement("DIV");
        listNode.setAttribute("id", "autocomplete-list");
        listNode.setAttribute("class", "autocomplete-items");
        document.body.appendChild(listNode);
        var f = document.createElement("DIV");
        f.setAttribute("id", "function-info");
        listNode.appendChild(f);
    }
    listNode = $('#autocomplete-list'); 
    pos = getCaretPosition();
    listNode.css({
        left: pos.x + 10,
        top: pos.y + 10
    });
    changeFunctionName();
}

function getSuggestions(currentText){
    switch(currentFuncionIndex){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
    return words;
}

// TODO: 不會正確更改字串
function changeFunctionName(){
    var name;
    switch(currentFunctionIndex){
        case 1:
            name = "名詞補完";
            break;
        case 2:
            name = "條文補完";
            break;
        case 3:
            name = "判決函釋";
            break;
    }
    document.getElementById("function-info").innerHTML = name;
    console.log(name);
}

    // 在游標之後插入文字
    function insertTextAtCursor(text) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            // window.getSelection().focusNode.nodeValue = text;
            // window.getSelection().focusNode.innerHTML = text;
            // console.log(window.getSelection().focusNode.nodeValue);
            // window.getSelection().focusNode.insertNode( document.createTextNode(text));
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var node = document.createTextNode(text);
                range.insertNode(node);
                // TODO: 找到目前游標位置插入文字
                document.getElementsByClassName("ql-editor")[0].lastChild.innerHTML += text;
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    }

    function getCaretPosition() {
        var x = 0;
        var y = 0;
        var sel = window.getSelection();
        if(sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            if(range.getClientRects()) {
            range.collapse(true);
            var rect = range.getClientRects()[0];
            if(rect) {
                y = rect.top;
                x = rect.left;
            }
            }
        }
        return {
            x: x,
            y: y
        };
    }

function changeCSS() {
    $('#banner').append($('.ql-toolbar'));
    $('#banner').css({
        position: 'fixed',
        top: 0,
        background: 'white',
        width: '100%'
    });
    $('#editor').css({
        background: 'white'
    });
}

