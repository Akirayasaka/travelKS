 let data = [];
 let district = [];
 let list = document.querySelector('#list');
 let info =document.querySelector('#intro')

 let xhr = new XMLHttpRequest();
 xhr.open('GET', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
 xhr.send(null);

 xhr.onload = function () {
     let array = JSON.parse(xhr.responseText);
     for (let i = 0; i < array.result.records.length; i++) {
         data.push(array.result.records[i]);

         district.push(array.result.records[i].Zone);
     };
    //  console.log(district);
     console.log(data);
    //  console.log(data[0].Zone);
    let res = district.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
    });
    // console.log(res);

    updateList(res);

    initList();

    $('#list').on('change',function allList() {
        let vvalue = this.options[this.selectedIndex].value;
        $("#subLoc").text(vvalue);
        // console.log(vvalue);
        let str="";
        
        for(let i=0;i<data.length;i++){
            if(vvalue == data[i].Zone){
                // console.log(data[i].Add);
                let el=document.querySelector("#intro");
                 str += `<div class="card col-md-6">
                            <img src="${data[i].Picture1}" class="card-img-top" alt="...">
                             <div class="card-body">
                             <h5 class="card-title">${data[i].Name}</h5>
                             <p class="card-text"><img src="./img/icons_clock.png" alt=""> ${data[i].Opentime}</p>
                             <p class="card-text"><img src="./img/icons_pin.png" alt=""> ${data[i].Add}</p>
                             <p class="card-text"><img src="./img/icons_phone.png" alt=""> ${data[i].Tel}<span style="float:right;"><img src="./img/icons_tag.png" alt="">${data[i].Ticketinfo}</span></p>
                            </div>
                            </div>`;
                el.innerHTML=str;
            }
            
        }
    })

    $(".hotBtn").on("click",function(){
        let vvalue = this.value;
        $("#subLoc").text(vvalue);
        let str = "";
        let dataCheck=[];

        for (let i = 0; i < data.length; i++) {
            dataCheck.push(data[i].Zone);
    
                if (vvalue == data[i].Zone) {
                   
                    let el = document.querySelector("#intro");
                    str += `<div class="card col-md-6">
                                <img src="${data[i].Picture1}" class="card-img-top" alt="...">
                                 <div class="card-body">
                                 <h5 class="card-title">${data[i].Name}</h5>
                                 <p class="card-text"><img src="./img/icons_clock.png" alt=""> ${data[i].Opentime}</p>
                                 <p class="card-text"><img src="./img/icons_pin.png" alt=""> ${data[i].Add}</p>
                                 <p class="card-text"><img src="./img/icons_phone.png" alt=""> ${data[i].Tel}<span style="float:right;"><img src="./img/icons_tag.png" alt="">${data[i].Ticketinfo}</span></p>
                                </div>
                                </div>`;
                    el.innerHTML = str;
                } 
            
        }
        if (dataCheck.includes(vvalue)==false){
                  let el = document.querySelector("#intro");
                  str = `<div style="height:300px;text-align:center;width:100%;"><h2>查無資料</h2> 
                                  </div>`;
                  el.innerHTML = str;
        }
    })


    }



function updateList(items) {

    for (let i = 0;i<items.length; i++) {
        let str = document.createElement('option');
        str.textContent= items[i];  
        list.appendChild(str);
    }
    
}

function initList(){
      let vvalue = "苓雅區";
      $("#subLoc").text(vvalue);
      for (let i = 0; i < data.length; i++) {
          if (vvalue == data[i].Zone) {

              let str = document.createElement('div');
              str.className = "card col-md-6";
              str.innerHTML = ` <img src="${data[i].Picture1}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${data[i].Name}</h5>
                                    <p class="card-text"><img src="./img/icons_clock.png" alt=""> ${data[i].Opentime}</p>
                                    <p class="card-text"><img src="./img/icons_pin.png" alt=""> ${data[i].Add}</p>
                                    <p class="card-text"><img src="./img/icons_phone.png" alt=""> ${data[i].Tel}<span style="float:right;"><img src="./img/icons_tag.png" alt="">${data[i].Ticketinfo}</span></p>
                                    </div>`;
              info.appendChild(str);
          }
      }
}