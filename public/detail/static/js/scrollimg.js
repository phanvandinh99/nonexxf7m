
function $$(id){
  return document.getElementById(id);
}

var picWidth = [0,235,470,705];
var targetPos=0;
var Photo_Ctn;
var lnkphotos;
var PhotoTimer1,PhotoTimer2;
var IsScroll=false;
var IsAuto = true;
var curPhotoIndex = 0;
jQuery(function($){
	Photo_Ctn = $$("Photo_Ctn");
	lnkphotos = [$$("lnkphoto0"),$$("lnkphoto1"),$$("lnkphoto2")];
	PhotoTimer2 = setInterval("AutoScroll()",8000);
});
function changePhotoPos(index){
	//clearInterval(PhotoTimer1);
	//PhotoTimer1 = setInterval("changePhotoed("+index+")",400);
	changePhotoed(index);
}
function changePhotoed(index){
	curPhotoIndex = index;
	if (lnkphotos[index] == null) {
		return;
	}
	lnkphotos[index].className = "hba";
	lnkphotos[(index+1)%3].className = "";
	lnkphotos[(index+2)%3].className = "";
	targetPos = picWidth[index];
	IsScroll = true;
	$('#Photo_Ctn').stop(true,true).animate({scrollLeft: targetPos}, 400, '',function(){
		IsScroll = false;
	});
}
var PhotoAutoFlag = true;

function AutoScroll(){
	if(IsAuto&&IsScroll==false){
		if(PhotoAutoFlag){
			curPhotoIndex = curPhotoIndex+1;
			if(curPhotoIndex==3){
				curPhotoIndex =2;
				PhotoAutoFlag=false;
			}
		}else{
			curPhotoIndex = curPhotoIndex-1;
			if(curPhotoIndex==-1){
				curPhotoIndex =1;
				PhotoAutoFlag=true;
			}
		}
		changePhotoed(curPhotoIndex);
	}
}