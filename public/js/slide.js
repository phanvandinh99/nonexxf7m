//var slidePicHeight  = [0,427,854,1281];
var slidePicHeight = [0,280,560,840];
var Photo_Ctn1 = $$("big_img");
var SlidePhotoTimer;
var IsAuto1 = true;

function changePhotoPos2(slideIndex,interval)
{
	if (SlidePhotoTimer) {
	    clearTimeout(SlidePhotoTimer);
	}
	slideTargetPost = slidePicHeight[slideIndex];
	SlidePhotoTimer = setInterval("goPhotoPos1()",interval);	
	
}
	
function goPhotoPos1()
{
	var slidePost = parseInt(Photo_Ctn1.scrollTop);
	if(slidePost==slideTargetPost) 
	{
		clearInterval(SlidePhotoTimer);
		return;	
	}
	if((slideTargetPost - slidePost) >0){
		var spead_slide = Math.ceil((slideTargetPost - slidePost)/10);
	}else{
		var spead_slide = Math.ceil((slidePost - slideTargetPost)/10);
	}
	
	if(slidePost<slideTargetPost)
	{
		var dist = slidePost+spead_slide;
		Photo_Ctn1.scrollTop = dist;
	}
	else if(slidePost>slideTargetPost)
	{
		var dist = slidePost-spead_slide;
		Photo_Ctn1.scrollTop = dist;
	}
}
var on_move = true;
function picChange(picid){
	if (picround) {
	    clearTimeout(picround);
	  }
	if (typeof(picround)!='undefined') clearTimeout(picround);
	var newsmallimg = $$("smallli").getElementsByTagName("li");
	var bigimg = $$("bigimg").getElementsByTagName("a");
	bigimg[0].innerHTML = slide_Img[picid-1]["title"];
	for (var ai = 0; ai < bigimg.length;ai++){
		bigimg[ai].href =  slide_Img[picid-1]["url"];
	}
	$$("pic_dtext").innerHTML = slide_Img[picid-1]["describe"].substring(0,75);
	var slideTargetPost;
	changePhotoPos2(picid-1,40);
	for (var adi = 0; adi < newsmallimg.length; adi++) {
		newsmallimg[adi].className="normal";
	}
	newsmallimg[picid-1].className="current";
	if(on_move){
		if ((adnext=picid+1) > newsmallimg.length) adnext = 1;
	}else{
		adnext=picid;
	}
	picround=setTimeout('picChange('+adnext+')', 5000);
}
picround = setTimeout("picChange(1)",5000);