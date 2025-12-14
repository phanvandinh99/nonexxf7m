

function counter7m(){ 
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); 
	
	//document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fed0d5c974af42c3059b9628b90d84901' type='text/javascript'%3E%3C/script%3E"));
	 

	//对应一下子站点
	var subNameList = {
		"crowns":"s2",
		"s2":"s2",
		"am":"am",
		"bam":"bam",
		"1x2":"1x2",
		"odds":"odds",
		"bodds":"bodds",
		
		"wlive":"wlive", 
		"bwlive":"wlive", 
		 
		"basket":"basket",
		"basket1":"basket",
		"basket2":"basket",
		"basket3":"basket",
		
		"data":"data",
		"data1":"data",
		"data2":"data",
		"report":"data",
		"bdata":"bdata",
		"bdata1":"bdata",
		"bdata2":"bdata",
		
		"www":"v4",
		"ctc":"v4",
		"cnc":"v4",
		"news":"news",
		"news1":"news",
		"news2":"news",
		
		"lq":"lq",
		"lq1":"lq",
		"lq2":"lq",
		
		"video":"v4",
		"vod":"v4",
		"photo":"v4",
		"tv":"v4",
		"pad":"v4",
		"vip":"v4",
		"win":"v4",
		
		"tennis":"othersport",
		"bab":"othersport",
		"amf":"othersport",
		
		"free":"free",
		"free1":"free",
		"freelive":"free",
		
		"taobao":"customer",
		"sogou":"customer",
		
		"tool":"tool",  
		"2021":"2021",
		
		"app":"app"
		

	};
	
	
	var domainArr=Array(); 
	domainArr["jp."+"7m"+"sport"+".com"]="3Fc9613763029fc1d721f8689068f0ee3b";
	domainArr["id."+"7m"+"sport"+".com"]="3F45c51cef7b6e7fb508231894c20607e5";
	domainArr["fr."+"7m"+"sport"+".com"]="3F61f8d45710c339b684bc7661869004b2";
	domainArr["es."+"7m"+"sport"+".com"]="3Fea2beb70bf339b758520dd55b4136d2d";
	 
	domainArr["video."+"7m"+"th"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a" ;
	domainArr["video."+"7m"+"th2"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a" ;
	domainArr["video."+"7m"+"th3"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a" ;
	domainArr["video."+"7m"+"th4"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a" ;
	domainArr["video."+"7m"+"th5"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a" ;
	domainArr["tded."+"7m"+"th"+".com"]="3Ff2b799144e5f2abcada239c2d50441c8" ;
	domainArr["tded."+"7m"+"th2"+".com"]="3Ff2b799144e5f2abcada239c2d50441c8" ;
	domainArr["tded."+"7m"+"th3"+".com"]="3Ff2b799144e5f2abcada239c2d50441c8" ;
	domainArr["tded."+"7m"+"th4"+".com"]="3Ff2b799144e5f2abcada239c2d50441c8" ;
	domainArr["tded."+"7m"+"th5"+".com"]="3Ff2b799144e5f2abcada239c2d50441c8" ;
	domainArr["video."+"7m"+"kr"+".com"]="3Fae34145a95f91a1cbff5aa61c005e81e" ;
	domainArr["video."+"7m"+"sport"+".com"]="3F1e2748c0ceda529b4865a96a13730e1f";
	domainArr["2018."+"7m"+"sport"+".com"]="3F75138468e6d4f4871e47cf66cc786761";
	
	domainArr["data."+"7m"+"sport"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";//74e31b50b59ec2fbcc0a864a4395b705
	domainArr["data."+"7m"+"kr"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"kr1"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"kr2"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"kr3"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"kr4"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"kr5"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"th"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"th2"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"th3"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"th4"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"th5"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7";
	domainArr["data."+"7m"+"vn"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn1"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn2"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn3"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn4"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn5"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn6"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn7"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn8"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	domainArr["data."+"7m"+"vn9"+".com"]="3F84dfe5bcf57c3296dc491520df9272b7"; 
	 
	domainArr["freelive."+"7m"+"sport"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr1"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr2"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr3"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr4"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"kr5"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn1"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn2"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn3"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn4"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"vn5"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"th"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"th2"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"th3"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"th4"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive."+"7m"+"th5"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive-jp."+"7m"+"sport"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive-fr."+"7m"+"sport"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive-es."+"7m"+"sport"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	domainArr["freelive-id."+"7m"+"sport"+".com"]="3F206f8bf4e43e55526de70ab371ac52d0";
	 
	domainArr["bdata."+"7m"+"sport"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr1"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr2"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr3"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr4"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"kr5"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn1"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn2"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn3"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn4"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn5"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn6"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn7"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn8"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"vn9"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"th"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"th2"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"th3"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"th4"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	domainArr["bdata."+"7m"+"th5"+".com"]="3Fdbbabde37b85d72507f1bf8ad5db9139";
	
	domainArr["tips."+"7m"+"sport"+".com"]="3F6795846b07570a3a7462646526c10aa4";
	domainArr["tips."+"7m"+"vn"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn1"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn2"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn3"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn4"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn5"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn6"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn7"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn8"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"vn9"+".com"]="3F5a9090649a95eb44e8e3ab4bccbf9c44";
	domainArr["tips."+"7m"+"th"+".com"]="3F1946c492eae4933098d76b98e7442456";
	domainArr["tips."+"7m"+"th2"+".com"]="3F1946c492eae4933098d76b98e7442456";
	domainArr["tips."+"7m"+"th3"+".com"]="3F1946c492eae4933098d76b98e7442456";
	domainArr["tips."+"7m"+"th4"+".com"]="3F1946c492eae4933098d76b98e7442456";
	domainArr["tips."+"7m"+"th5"+".com"]="3F1946c492eae4933098d76b98e7442456";
	domainArr["tips."+"7m"+"kr"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips."+"7m"+"kr1"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips."+"7m"+"kr2"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips."+"7m"+"kr3"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips."+"7m"+"kr4"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips."+"7m"+"kr5"+".com"]="3F2642a2cbabef93f40d216b6ae7c9c3d9";
	domainArr["tips-id."+"7m"+"sport"+".com"]="3Fdc405f0791edf3a1943ce2d89460cc1f";
	domainArr["tips.7m.com.cn"]="3F3c2c3db4bac77d92ef4269f0efe9c774";
 
	domainArr["basket."+"7m"+"sport"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr1"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr2"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr3"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr4"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"kr5"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"th"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"th2"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"th3"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"th4"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"th5"+".com"]="3Faa19da1c60600da780e296b26dfd3384"; 
	domainArr["basket."+"7m"+"vn"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn1"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn2"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn3"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn4"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn5"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn6"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn7"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn8"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	domainArr["basket."+"7m"+"vn9"+".com"]="3Faa19da1c60600da780e296b26dfd3384";
	
	domainArr["guess."+"7m"+"sport"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"th"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"th2"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"th3"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"th4"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"th5"+".com"]="3F885a62d8be395e6f919b2f727b271056";  
	domainArr["guess."+"7m"+"kr"+".com"]="3F885a62d8be395e6f919b2f727b271056";
	domainArr["guess."+"7m"+"kr1"+".com"]="3F885a62d8be395e6f919b2f727b271056";
	domainArr["guess."+"7m"+"kr2"+".com"]="3F885a62d8be395e6f919b2f727b271056";
	domainArr["guess."+"7m"+"kr3"+".com"]="3F885a62d8be395e6f919b2f727b271056";
	domainArr["guess."+"7m"+"kr4"+".com"]="3F885a62d8be395e6f919b2f727b271056";
	domainArr["guess."+"7m"+"kr5"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn1"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn2"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn3"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn4"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn5"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn6"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn7"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn8"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	domainArr["guess."+"7m"+"vn9"+".com"]="3F885a62d8be395e6f919b2f727b271056"; 
	
	domainArr["2022.7m.com.cn"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"sport"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn1"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn2"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn3"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn4"+".com"]="3F75138468e6d4f4871e47cf66cc786761";  
	domainArr["2022."+"7m"+"vn5"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"vn6"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"vn7"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"vn8"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"vn9"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"th"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"th2"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"th3"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"th4"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"th5"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr1"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr2"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr3"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr4"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"kr5"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"bo"+"la"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"fr"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"fut"+"bol"+".com"]="3F75138468e6d4f4871e47cf66cc786761"; 
	domainArr["2022."+"7m"+"sa"+"ka"+".com"]="3F75138468e6d4f4871e47cf66cc786761";   
	
	domainArr["wlive.7m.com.cn"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"sport"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"th"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"th2"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"th3"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"th4"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"th5"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr1"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr2"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr3"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr4"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"kr5"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn1"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn2"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn3"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn4"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn5"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn6"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn7"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn8"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"vn9"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"bola"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"fr"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	domainArr["wlive."+"7m"+"futbol"+".com"]="3Ffe9b3eed215b4533810198f956c3052e";
	
	
	domainArr["app."+"7m"+"vn"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn1"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn2"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn3"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn4"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn5"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn6"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn7"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn8"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"vn9"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	domainArr["app."+"7m"+"sport"+".com"]="3F0b9f8c00d93e35a7f7be84410149b055";
	 
	domainArr["predict"+"7m"+"vn"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7"; 
	domainArr["predict"+"7m"+"vn2"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn3"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn4"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn5"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn6"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn7"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn8"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	domainArr["predict"+"7m"+"vn9"+".com"]="3F2e221dadcfd7def8eaa83a730d2136a7";
	
	
	
	domainArr["www."+"7m"+".hk"]="3Fbfb6167b1506675587f0405dc321e73e";//西 
	
	// 国外站点
	var domainCode=Array();  
	domainCode["7m"+"sport"+".com"]="3F385c6e887b916ba91189f2695bee29be";
	domainCode["7m"+"th"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a";
	domainCode["7m"+"th2"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a";
	domainCode["7m"+"th3"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a";
	domainCode["7m"+"th4"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a";
	domainCode["7m"+"th5"+".com"]="3F6031e11db08fe8ff549b56397a6ad55a";
	domainCode["7m"+"kr"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"kr1"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"kr2"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"kr3"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"kr4"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"kr5"+".com"]="3F0d0befe3b6bcc8472b8882eda1911d74";
	domainCode["7m"+"vn"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn1"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn2"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn3"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn4"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn5"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn6"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn7"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn8"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"vn9"+".com"]="3F04e8453e2d80dbc6abedb2ab82b6146e";
	domainCode["7m"+"saka"+".com"]="3Fc9613763029fc1d721f8689068f0ee3b";//日 
	domainCode["7m"+"jpn"+".com"]="3Fc9613763029fc1d721f8689068f0ee3b";//日
	domainCode["7m"+"bola"+".com"]="3F45c51cef7b6e7fb508231894c20607e5";//印
	domainCode["7m"+"indo"+".com"]="3F45c51cef7b6e7fb508231894c20607e5";//印 
	domainCode["7m"+"fr"+".com"]="3F61f8d45710c339b684bc7661869004b2";//法
	domainCode["7m"+"but"+".com"]="3F61f8d45710c339b684bc7661869004b2";//法 
	domainCode["7m"+"futbol"+".com"]="3Fea2beb70bf339b758520dd55b4136d2d";//西
	domainCode["7m"+"esp"+".com"]="3Fea2beb70bf339b758520dd55b4136d2d";//西
	domainCode["7m"+".hk"]="3Fbfb6167b1506675587f0405dc321e73e";//西
	  
	
	//子站点
	var subNameCode={
		"odds":"3F1d4b4c8e1fd5c6f14749b8d03c6f07e9",//91ab66528463cc82ff449c1ff526db02
		"bodds":"3F8c432520520400e8c1d1c6e1ee06c76c",
		"1x2":"3Fb687ada785a292849099d13e9ad52ecb",
		"s2":"3F6cf2572b4e6775b26dbab37f5ba7dbcc",
		"am":"3F3c22d5344612f7729e9480dedee87a55",
		"bam":"3F616755f497ed3394ef26b5e84065e98e",
		"wlive":"3Ffe9b3eed215b4533810198f956c3052e",
		"basket" :"3Faa19da1c60600da780e296b26dfd3384",
		"data":"3F84dfe5bcf57c3296dc491520df9272b7",
		"bdata":"3Fdbbabde37b85d72507f1bf8ad5db9139",
		"v4":"3F599e506f9a2eef9d0555a35803812e63",
		"news":"3Ffde85ccef0227723b3cef51dd30f0a18",
		"lq":"3F768ea9a5abfa88609e6497ba6a0cfe76",
		"othersport":"3F867de37de1908782b4cc16c2fe96abef",
		"video":"3Fd94bed53c5fd58b566a9f1ba6c87f874",
		"free":"3F206f8bf4e43e55526de70ab371ac52d0",//3F932263a6975515c67c58a06af5d1b162
		"customer":"3F0ba701b77c0fa4a64320940c94ac3c54", 
		"tool":"3Fbe25da4331bd8611205e09347bf96dee", 
		"2021":"3F75138468e6d4f4871e47cf66cc786761", 
		"app":"3F0b9f8c00d93e35a7f7be84410149b055"
	};
	
	
	
	 
	
	var hostName = location.hostname.toLowerCase();  //xx.7m.com.cn
 
 	if(hostName.indexOf("7m.com.cn")>-1){
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1341a82e9b38f776c7823e445b53e373' type='text/javascript'%3E%3C/script%3E"));
	}
	 
	var hs = hostName.split('.');
	var topHost =  isNaN(hs[hs.length-1]) ? (hs[hs.length-2] + "." + hs[hs.length-1]):hostName;  //com.cn
	
	if( location.href.indexOf("7m.com.cn/2024") > -1)
	{ 
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F8a88d2a3edce1a7a3a751703db08c865' type='text/javascript'%3E%3C/script%3E"));	
	}
	else if( location.href.indexOf("/jp/") > -1 || location.href.indexOf("_jp.") > -1)
	{
		//jp无独立域名分配，将所有地址汇入jp
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%" + domainArr["jp.7m"+"sport"+".com"] +"' type='text/javascript'%3E%3C/script%3E"));	
	}
	else if(domainArr[hostName]!=null){
		
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%" + domainArr[hostName] +"' type='text/javascript'%3E%3C/script%3E"));	
	 	 
		
	}else if( domainCode[topHost]!=null ){  
	
	    var locationLink=location.href.toLowerCase();
		if((topHost== "7m"+"sport"+".com" && locationLink.indexOf("video")>-1) ){
			//国外视频分拆多个站点
			document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%" + domainArr["video.7m"+"sport"+".com"] +"' type='text/javascript'%3E%3C/script%3E")); 
		} 
		else{  
			//直接输出统计代码
			document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%" + domainCode[topHost] +"' type='text/javascript'%3E%3C/script%3E"));	 
		
		} 
	}else {
		
		var subname="";
		if(topHost==hostName){
			subname = "www";
		}else{
			subname = hostName.replace(/(\.7m\.com\.cn|\.7m\.cn|\.7m\.hk)/g,"");
			subname = subname.replace(".luck"+"sport"+".com","");
		}
		if(subNameList[subname]!=null){
			document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%" + subNameCode[subNameList[subname]] +"' type='text/javascript'%3E%3C/script%3E"));	
			if(subNameCode[subNameList[subname]]=="3F206f8bf4e43e55526de70ab371ac52d0"){
				document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F206f8bf4e43e55526de70ab371ac52d0' type='text/javascript'%3E%3C/script%3E"));	
			}
		}else{
				
		}
	}
}


document.write("<div style='display:none'>");
counter7m();
document.write("</div>");



(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();




// if(document.location.href.indexOf("jp") > -1 ){
// 	document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-108650323-2"></'+'script>');
//  } 
// if(document.location.href.indexOf("jp") > -1 ){ 
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date()); 
//   gtag('config', 'UA-108650323-2'); 
// }
 
var iscustomer_google=false; 
function counter7m_google(){ 
	var _bdhmProtocol_google = (("https:" == document.location.protocol) ? " https://" : " http://"); 
	var subNameList_google =  Array();
	
	subNameList_google["jp"]="G-PMXSVXSSRF";
	subNameList_google["7m"+"sa"+"ka"+".com"]="G-PMXSVXSSRF";
	   
	subNameList_google["id."+"7m"+"sport"+".com"]="G-ND8128JSCS";
	subNameList_google["7m"+"bola"+".com"]="G-ND8128JSCS";
	
	subNameList_google["es."+"7m"+"sport"+".com"]="G-0X9S0YE8PE";
	subNameList_google["7m"+"futbol"+".com"]="G-0X9S0YE8PE";
	subNameList_google["7m"+"esp"+".com"]="G-0X9S0YE8PE";
	 
	subNameList_google["fr."+"7m"+"sport"+".com"]="G-HK9YJ076BV";
	subNameList_google["7m"+"fr"+".com"]="G-HK9YJ076BV";
	subNameList_google["7m"+"but"+".com"]="G-HK9YJ076BV";
	 
	subNameList_google["7m"+"th"+".com"]="G-DGLR2TSJLL";
	subNameList_google["7m"+"th2"+".com"]="G-DGLR2TSJLL";
	subNameList_google["7m"+"th3"+".com"]="G-DGLR2TSJLL";
	subNameList_google["7m"+"th4"+".com"]="G-DGLR2TSJLL";
	subNameList_google["7m"+"th5"+".com"]="G-DGLR2TSJLL";
	
	subNameList_google["7m"+"sport"+".com"]="G-YS5VB5P1CS";
	subNameList_google["7m"+"kr"+".com"]="G-ZWGG4ELP43";
	subNameList_google["7m"+"kr1"+".com"]="G-ZWGG4ELP43";
	subNameList_google["7m"+"kr2"+".com"]="G-ZWGG4ELP43";
	subNameList_google["7m"+"kr3"+".com"]="G-ZWGG4ELP43";
	subNameList_google["7m"+"kr4"+".com"]="G-ZWGG4ELP43";
	subNameList_google["7m"+"kr5"+".com"]="G-ZWGG4ELP43";

	subNameList_google["7m"+"vn"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn2"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn3"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn4"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn5"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn6"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn7"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn8"+".com"]="G-22FC0WXX10";
	subNameList_google["7m"+"vn9"+".com"]="G-22FC0WXX10";
	subNameList_google["id"]="G-ND8128JSCS";
	subNameList_google["fr"]="G-HK9YJ076BV";
	subNameList_google["es"]="G-0X9S0YE8PE";
	subNameList_google["en"]="G-YS5VB5P1CS";
	subNameList_google["th"]="G-DGLR2TSJLL";
	subNameList_google["kr"]="G-ZWGG4ELP43";
	subNameList_google["vn"]="G-22FC0WXX10";
	
	
	subNameList_google["7m"+".hk"]="G-8H9CS4W9XV"; 
	subNameList_google["hk"]="G-8H9CS4W9XV";
	  
	var hostName_google = location.hostname.toLowerCase(); 
	//日文做处理
	if(document.location.href.indexOf("jp") > -1 ){
		hostName_google='jp';
	}
	if(document.location.href.indexOf("lucksport") > -1 ){
		if(document.location.href.indexOf("_id") > -1 ){
            hostName_google='id';
        }
        if(document.location.href.indexOf("fr") > -1 ){
            hostName_google='fr';
        }
        if(document.location.href.indexOf("es") > -1 ){
            hostName_google='es';
        }
        if(document.location.href.indexOf("en") > -1 ){
            hostName_google='en';
        }
        if(document.location.href.indexOf("th") > -1 ){
            hostName_google='th';
        }
        if(document.location.href.indexOf("kr") > -1 ){
            hostName_google='kr';
        }
        if(document.location.href.indexOf("vn") > -1 ){
            hostName_google='vn';
        }
	}
	var hs = hostName_google.split('.'); 
	var topHost =  hs.length>2 ? (hs[hs.length-2] + "." + hs[hs.length-1]):hostName_google;  //com.cn

 
	//路径处理
	var hp = location.pathname.toLowerCase();
	var tagFlag="";
	if(hostName_google.indexOf("7m.com.cn")==-1){ 
		
		if(hp.indexOf("_th") > -1 || hostName_google.indexOf("7m"+"th") > -1){
			hostName_google='th';
		}else if(hp.indexOf("_vn") > -1 || (hostName_google.indexOf("7m"+"sport"+".com")>-1 && hp.indexOf("/vn/") > -1)  || hostName_google.indexOf("7m"+"vn") > -1  ){
			hostName_google='vn';
		}else if(hp.indexOf("_id") > -1 || hostName_google.indexOf("7m"+"bola"+".com") > -1 || hostName_google.indexOf("id."+"7m"+"sport"+".com") > -1  ){
			hostName_google='id';
		}else if(hp.indexOf("_fr")>-1 || hostName_google.indexOf("7m"+"fr"+".com") > -1 ||  hostName_google.indexOf("fr."+"7m"+"sport"+".com")>-1 
				||  hostName_google.indexOf("7m"+"but"+".com")>-1 ){
			hostName_google='fr';
		}else if(hp.indexOf("_es")>-1 || hostName_google.indexOf("7m"+"futbol"+".com") > -1 ||  hostName_google.indexOf("es."+"7m"+"sport"+".com")>-1){
			hostName_google='es';
		}else if(hp.indexOf("_kr") > -1 || (hostName_google.indexOf("7m"+"sport"+".com")>-1 && hp.indexOf("/kr/") > -1)  || hostName_google.indexOf("7m"+"kr") > -1 || hostName_google.indexOf("kr"+".7m"+"sport"+".com") > -1){
			hostName_google='kr';
		}else if(hp.indexOf("_en") > -1 || hostName_google.indexOf("7m"+"sport"+".com")>-1 ){
			hostName_google='en';
		}
		
		if(subNameList_google[hp]!=undefined){ 
			iscustomer_google=true;
			tagFlag=subNameList_google[hp]; 
		}else if(subNameList_google[hostName_google]!=undefined ){ 
			iscustomer_google=true;
			tagFlag=subNameList_google[hostName_google]; 
		}else if(subNameList_google[topHost]!=undefined){
			iscustomer_google=true;
			tagFlag=subNameList_google[topHost];
		}else{ 
			iscustomer_google=true;
			tagFlag=subNameList_google["en"];
		}
	}
	
	if(iscustomer_google){
		var _statisticsHtml='<!-- Global site tag (gtag.js) - Google Analytics -->'+
		'<script async src="'+_bdhmProtocol_google+'www.googletagmanager.com/gtag/js?id='+tagFlag+'"></script>'+
		'<script>'+
		'  window.dataLayer = window.dataLayer || [];'+
		'  function gtag(){dataLayer.push(arguments);}'+
		'  gtag(\'js\', new Date());'+
		'  gtag(\'config\', \''+tagFlag+'\');'+
		'</script>';
		document.write(_statisticsHtml);
	} 
} 
document.write("<div style='display:none'>");
counter7m_google();
document.write("</div>");

