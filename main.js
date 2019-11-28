var API1 = "http://35.206.230.3:47000/autocomplete/api/v1/term";
var API2 = "http://35.206.230.3:47000/autocomplete/api/v1/law";
var API3 = "http://35.206.230.3:47000/autocomplete/api/v1/opinion";
var textLength = 0;
var quill;
var currentText = "";
var charIndex = 0;
var currentStartIndex = 0;
var words = [];
var keyword = "";
var jsonObject = [];
var json1 = {
    "data":{
        "count": 1,
        "isFound": true,
        "keyword": "法",
        "terms": ["法律"]
    },
    "message": "Success",
    "errorCode": "000"
};

var json2 = {
    "data":{
        "count": 5,
        "isFound": true,
        "keyword": "勞動",
        "laws": [
            {
                "description": "雇主不得以強暴、脅迫、拘禁或其他非法之方法，強制勞工從事勞動。",
                "name": "勞動基準法第5條"
            },
            {
                "description": "任何人不得介入他人之勞動契約，抽取不法利益。",
                "name": "勞動基準法第6條"
            },
        ]
    },
    "message": "Success",
    "errorCode": "000"
};

var json3 = {
    "data":{
        "count": 3,
        "isFound": true,
        "keyword": "新型",
        "opinions": [
            {
                "concept": "新型專利",
                "count": 4,
                "descriptions": [
                    "專利法於92年2月6日修正公布全文138條，就新型專利改採形式審查，對新型專利申請案僅為形式要件之審查，而不進行前案檢索及實體要件之判斷（如產業利用性、新穎性、進步性等）。惟考量僅經形式審查所取得之新型專利權，其權利內容具有不安定性及不確定性，為免新型專利權人不當權利行使，有害於第三人之技術利用及研發，特於第103條至第105條增訂「新型專利技術報告」制度，促使新型專利權人妥適行使權利，且供公眾得以判斷新型專利是否符合實體要件，而具有公眾審查之功能。準此，新型專利技術報告僅為申請人判斷該新型專利權是否合於專利實體要件之參考，以及新型專利權人行使權利之佐證，非謂專利權人於新型專利公告後即應申請新型專利技術報告始能維護其專利權(智慧財產法院100年度民專上字第53號判決)",
                    "專利法第21條發明之定義，申請專利之發明必須是利用自然界中固有之規律所產生之技術思想的創作。由該定義之意旨，專利法所指之發明必須具有技術性（technicalcharacter），即發明解決問題的手段必須是涉及技術領域的技術手段。申請專利之發明是否具有技術性，係其是否符合發明之定義的判斷標準。申請專利之發明是否符合發明之定義，應考量申請專利之發明的內容而非申請專利範圍的記載形式，據以確認該發明之整體對於先前技術的貢獻是否具有技術性；亦即考量申請專利之發明中所揭露解決問題的手段，若該手段具有技術性，則該發明符合發明之定義。"
                ]
            },
            {
                "concept": "新型專利標的",
                "count": 1,
                "descriptions": [
                    "申請新型之標的，應屬對物品之「形狀」（指物品具有可從外觀觀察到確定之空間輪廓者）、「構造」（指物品內部或其整體之構成，實質表現上大多為各組成元件間之安排、配置及相互關係，且此構造之各組成元件並非以其本身原有之機能獨立運作者）或「裝置」（指為達到某一特定目的，將原具有單獨使用機能之多數獨立物品予以組合裝設者）之創作。至於物之製造方法、使用方法、處理方法等，及無一定空間形狀、構造的化學物質或醫藥品，甚至以美感為目的之物品形狀、花紋、色彩或其結合等創作，均非新型之標的，即不得依申請取得新型專利。(智慧財產法院101年度民專訴字第11號判決)",
                    "專利法第21條發明之定義，申請專利之發明必須是利用自然界中固有之規律所產生之技術思想的創作。由該定義之意旨，專利法所指之發明必須具有技術性（technicalcharacter），即發明解決問題的手段必須是涉及技術領域的技術手段。申請專利之發明是否具有技術性，係其是否符合發明之定義的判斷標準。申請專利之發明是否符合發明之定義，應考量申請專利之發明的內容而非申請專利範圍的記載形式，據以確認該發明之整體對於先前技術的貢獻是否具有技術性；亦即考量申請專利之發明中所揭露解決問題的手段，若該手段具有技術性，則該發明符合發明之定義。",
                    "按設計專利的侵權比對，應先確定設計專利之專利權範圍，再比對、判斷確定後之專利權範圍與被控侵權對象（系爭產品）。確定設計專利之專利權範圍，係以圖式所揭露的內容為準，並得審酌說明書之文字，以正確認知圖式所呈現之「外觀」及其所應用之「物品」，合理確定其權利範圍。比對、判斷確定後之專利權範圍與被控侵權對象，須先解析被控侵權對象，其應對照系爭專利權範圍所確定之物品及外觀，認定被控侵權對象中對應之設計內容，無關之部分不得納入比對判斷。再以普通消費者選購相關商品之觀點，就系爭專利權範圍的整體內容與被控侵權對象中對應該專利之設計內容進行比對，據以判斷被控侵權對象與系爭專利是否為相同或近似物品，及是否為相同或近似之外觀。(智慧財產法院107年度民專上字第9號判決)"
                ]
            }
        ]
    },
    "message": "Success",
    "errorCode": "000"
};
var myFocusOffset =  window.getSelection().focusOffset;
var currentFunctionIndex = 1;

$(function() {
    $(document).ready(function() {
        var toolbarOptions = [[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        ,['bold', 'italic', 'underline', 'strike'],[{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'color': [] }, { 'background': [] }],  [{ 'font': [] }],
        [{ 'align': [] }],['clean']  ];
        quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions,
                history: {
                    delay: 2000,
                    maxStack: 500,
                    userOnly: true
                }
              },
            theme: 'snow'
        });
        
        changeCSS();
        // 載入儲存的文字
        loaddata();
        // autocomplete($('.ql-editor'), words);
        $('.ql-editor').bind("DOMSubtreeModified", function (e) {
            if(textLength != $('.ql-editor').text().length && document.getElementById('switch').checked){
                showLoading();
                // currentStartIndex = getTextPosition();
                if(window.getSelection().focusNode.nodeValue !=null){
                    // 抓到目前游標正在打的最後一行
                    currentText = window.getSelection().focusNode.nodeValue;
                    if (currentText != "" && !isZhuYin(currentText))
                        getSuggestions(currentText);
                    if (currentText == "")
                        words = [];
                }
                console.log("currentText:" + currentText);
                textLength = $('.ql-editor').text().length;
            }
        });
    });

    // 偵測 Ctrl+S 儲存檔案
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    savedata();
                    words = [];
                    break;
                // function 1
                case 'j':    
                    event.preventDefault();
                    currentFunctionIndex = 1;
                    showFunctionName();
                    words = [];
                    break;
                // function 2
                case 'k':
                    event.preventDefault();
                    currentFunctionIndex = 2;
                    showFunctionName();
                    words = [];
                    break;
                // function 3
                case 'l':
                    event.preventDefault();
                    currentFunctionIndex = 3;
                    showFunctionName();
                    words = [];
                    break;
            }
        }
    });
});

function loaddata(){
    if(window.localStorage["data"]){
        document.getElementsByClassName("ql-editor")[0].innerHTML = window.localStorage.getItem("data");
    }
    if(window.localStorage["title"]){
        document.getElementById("inp").value = window.localStorage.getItem("title");
    }
}
function savedata(){
    var inputText = document.getElementsByClassName("ql-editor")[0].innerHTML;
    var title = document.getElementById("inp").value;
    window.localStorage.setItem('data', inputText);
    window.localStorage.setItem('title', title);
    $(".save").fadeIn();
    setTimeout(function() { $(".save").fadeOut(); }, 5000);
}

// 判斷字串是否包含注音
function isZhuYin(string) {
    return (/[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/).test(string);
}

// 取得目前輸入游標位置
function getTextPosition() {
    var range = quill.getSelection();
    if (range) {
        if (range.length == 0) {
            return range.index;
        }
    }
    return 0;
}

function parseJSON(jsonText){ 
    if(jsonText['data']['isFound'] == true){
        return jsonText['data'];
    }else{
        return [];
    }
}

function sendRequest(apiUrl, keyword){
    var data = '{"keyword" : "' + keyword + '", "complete" : true, "limit": 5}';
    console.log("send data:");
    console.log(data);
    $.ajax({
        "async": true,
        "crossDomain": true,
        url: apiUrl,
        type: 'post',
        "data": data,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        dataType: 'json',
        // 結果成功回傳
        success: function (result) {
            words = parseJSON(result);
            console.log("words");
            console.log(words);
            autocomplete($('.ql-editor'), words);
        }
    });
}

function showLoading(){
    $('#autocomplete-list').remove();
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    document.body.appendChild(a);
    f = document.createElement("DIV");
    f.setAttribute("id", "function-info");
    a.appendChild(f);
    changeFunctionName();
    b = document.createElement("DIV");
    b.setAttribute("class", "autocomplete-items-child");
    b.innerHTML = "<img src='ellipsis.gif' width='20px'>";
    a.appendChild(b);
}

function autocomplete(inp, arr) {
    var currentFocus, currentFocus2;
    // 建立一個包含所有建議字詞的list
    // 目前輸入的字詞
    var a, b, c, d, i, val = currentText;
    if (!val) { return false;}
    currentStartIndex = getTextPosition();
    currentFocus = -1;
    currentFocus2 = -1;
    a = $('#autocomplete-list');
    $('.autocomplete-items-child').remove();

    // 如果回傳回來的詞不為空
    if(Object.keys(words).length > 0){
        keyword = words['keyword'];
        console.log("keyword: " + keyword);
        val = keyword;
        if(currentFunctionIndex == 1){
            arr = words['terms'];
        }else if(currentFunctionIndex == 2){
            arr = words['laws'];
        }else if(currentFunctionIndex == 3){
            arr = words['opinions'];
        }        
        console.log("arr: ");
        console.log(arr);
        for (i = 0; i < arr.length; i++) {
            var item;
            if(currentFunctionIndex == 1){
                item = arr[i];
            }else if(currentFunctionIndex == 2){
                item = arr[i]['name']
            }else if(currentFunctionIndex == 3){
                item = arr[i]['concept']
            }
            // 如果目前是第一或第二種功能
            if (currentFunctionIndex != 3){
                if (item.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.setAttribute("class", "autocomplete-items-child");
                    b.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>";
                    b.innerHTML += item.substr(val.length);
                    // b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.innerHTML += "<input type='hidden' value='" + i + "'>";
                    b.addEventListener("click", function(e) {
                        var index = this.getElementsByTagName("input")[0].value;
                        if(currentFunctionIndex == 1){
                            // 如果是function1，插入按鈕本身的內容
                            insertTextAtCursor(arr[index].substr(val.length));
                            words = [];
                        }else if(currentFunctionIndex == 2){ 
                            // 如果是function2, 點擊後插入description內容
                            insertTextAtCursor(arr[index]['name'].substr(val.length) + "：" + arr[index]['description']);
                            words = [];
                        }
                        closeAllLists();
                    });
                    a.append(b);
                }
            } 
            // 如果是第三種功能
            else {
                // 如果回傳資料有包含目前的keyword
                if (item.toUpperCase().includes(val.toUpperCase())) {
                    b = document.createElement("DIV");
                    b.setAttribute("class", "autocomplete-items-child");
                    b.innerHTML = item.substr(0, item.indexOf(val));
                    b.innerHTML += "<strong>" + item.substr(item.indexOf(val), val.length) + "</strong>";
                    b.innerHTML += item.substr(item.indexOf(val) + val.length);
                    b.innerHTML += "<input type='hidden' value='" + i + "'>";
                    a.append(b);
                }
            }
            
        }
    }else{
        // 等待推薦回傳，words為空
        b = document.createElement("DIV");
        b.innerHTML = "沒有建議的字詞";
        b.setAttribute("class", "autocomplete-items-child");
        a.append(b);
    }
    

    // 取得游標所在位置 把popup擺放到游標旁邊
    if( $('.autocomplete-items').length ){
        var tip = $('.autocomplete-items');
        var pos = getCaretPosition();
        tip.css({
            left: pos.x + 10,
            top: pos.y + 20
        });
    }
    // 更改function名稱
    showFunctionName();

    // 偵測鍵盤輸入 看是選擇列表上哪個字詞
    inp.bind('keydown', function(e) {
        var x = document.getElementsByClassName("autocomplete-items-child");
        var isHovered = false;

        if (e.keyCode == 40) { // down
            // 如果正在第二層list上下移動
            if (currentFunctionIndex == 3 && isHovered){
                currentFocus2++;
                addActive(x);
                addActive2($('.autocomplete-items-child-2'));
            } else {
                currentFocus++;
                addActive(x);
            }
        } else if (e.keyCode == 38) { //up
            if (currentFunctionIndex == 3 && isHovered){
                currentFocus2--;
                addActive(x);
                addActive2($('.autocomplete-items-child-2'));
            } else {
                currentFocus--;
                addActive(x);
            }
        } else if(e.keyCode == 39){ // right
            // if ($('#autocomplete-list-2').length){
            if (currentFunctionIndex == 3){
                addActive(x);
                addActive2($('.autocomplete-items-child-2'));
                currentFocus2 = 0;
                isHovered = true;
            }
        } else if(e.keyCode == 37){ // left
            if (currentFunctionIndex == 3){
                $('#autocomplete-list-2').remove();
                currentFocus2 = -1;
                isHovered = false;
            }
        } else if (e.keyCode == 13) { // enter
        // TODO: 修好enter
            if (Object.keys(words).length > 0){
                e.preventDefault();
                // 防止enter換行
                // document.getElementsByClassName('ql-editor')[0].contentEditable = false;
                if (currentFocus > -1 && $('#autocomplete-list')) {
                    if (x) x[currentFocus].click();
                }
            }
        }
        // console.log("currentFocus: "+currentFocus, ", focus2:" + currentFocus2 + ", isHovered:" + isHovered);
    });

    // function backspace(){
    //     var el = $('.ql-editor')[0],
    //         myval   = 1,
    //         cur_pos = 0;
        
    //     if (el.selectionStart) { 
    //         cur_pos = el.selectionStart; 
            
    //     } else if (document.selection) { 
    //         el.focus(); 
    //         var r = document.selection.createRange(); 
    //         if (r != null) {
    //             var re = el.createTextRange(), 
    //                 rc = re.duplicate(); 
    //             re.moveToBookmark(r.getBookmark()); 
    //             rc.setEndPoint('EndToStart', re); 
            
    //             cur_pos = rc.text.length; 
    //         }
    //     }  
    //     if (el.setSelectionRange) {
    //         el.focus();
    //         el.setSelectionRange(cur_pos - myval, cur_pos - myval);
    //     }
    //     else if (el.createTextRange) {
    //         var range = el.createTextRange();
    //         range.collapse(true);
    //         range.moveEnd('character', cur_pos - myval);
    //         range.moveStart('character', cur_pos - myval);
    //         range.select();
    //     }
    // }

    function addActive(x) {
      /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        
        x[currentFocus].classList.add("autocomplete-active");
        $('#autocomplete-list-2').remove();
        // 如果是function2，加第二層list
        if(currentFunctionIndex == 2){
            if(words['laws']){
                c = document.createElement("DIV");
                c.setAttribute("id", "autocomplete-list-2");
                c.setAttribute("class", "autocomplete-items");
                d = document.createElement("DIV");
                d.setAttribute("class", "autocomplete-items-child-2");
                d.innerHTML += words['laws'][currentFocus]['description'];
                c.appendChild(d);
                x[currentFocus].appendChild(c);
            }
        }else if(currentFunctionIndex == 3){
            if(words['opinions']){
                c = document.createElement("DIV");
                c.setAttribute("id", "autocomplete-list-2");
                c.setAttribute("class", "autocomplete-items");
                for ( var i = 0; i < words['opinions'][currentFocus]['descriptions'].length; i++){
                    d = document.createElement("DIV");
                    d.setAttribute("class", "autocomplete-items-child-2");
                    d.innerHTML += words['opinions'][currentFocus]['descriptions'][i];
                    d.innerHTML += "<input type='hidden' value='" + words['opinions'][currentFocus]['descriptions'][i] + "'>";
                    d.addEventListener("click", function(e) {
                        insertTextAtCursor(this.getElementsByTagName("input")[0].value);
                        words = [];
                        closeAllLists();
                    });
                    c.appendChild(d);
                }
                x[currentFocus].appendChild(c);
            }
            // TODO: 可以在第二層list上下選擇
            // x[currentFocus][currentFocus2].classList.add("autocomplete-active");
        }
        
    }
    function addActive2(x){
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus2 >= x.length) currentFocus2 = 0;
        if (currentFocus2 < 0) currentFocus2 = (x.length - 1);
        x[currentFocus2].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }        
        }
        // $('#autocomplete-list').remove();
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
function showFunctionName(){
    // 如果打開autocomplete開關
    if(document.getElementById('switch').checked){
        var listNode, pos;
        if(!$('#autocomplete-list')){
            listNode = document.createElement("DIV");
            listNode.setAttribute("id", "autocomplete-list");
            listNode.setAttribute("class", "autocomplete-items");
            document.body.appendChild(listNode);
        }
        listNode = $('#autocomplete-list'); 
        if(!$('#function-info')){
            var f = document.createElement("DIV");
            f.setAttribute("id", "function-info");
            listNode.append(f);
        }
        pos = getCaretPosition();
        listNode.css({
            left: pos.x + 10,
            top: pos.y + 20
        });
        changeFunctionName();
    }
}

function getSuggestions(currentText){
    var api, result;
    switch(currentFunctionIndex){
        case 1:
            api = API1;
            result = json1;
            break;
        case 2:
            api = API2;
            result = json2;
            break;
        case 3:
            api = API3;
            result = json3;
            break;
    }
    sendRequest(api, currentText);
    // return result;
}

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
    if($('#function-info')){
        $('#function-info').html(name);
    }
}

    // 在游標之後插入文字
    function insertTextAtCursor(text) {
        quill.insertText(currentStartIndex, text);
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
                    y = rect.top + window.scrollY;;
                    x = rect.left + window.scrollX;
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

