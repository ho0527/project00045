let no=0
let tempquestion=fisheryatesshuffle([...question])
tempquestion=[...question]

function main(){
	let optionlist=[]

	innerhtml("#question",`
		Q:<br>
		${tempquestion[no]["question"]}
		${
			tempquestion[no]["questionimage"]!=null?`
				<br>
				<img src="${tempquestion[no]["questionimage"].split("image_")[1]}" class="image">
			`:``
		}
	`,false)

	for(let i=0;i<tempquestion[no]["option"].length;i=i+1){
		if(tempquestion[no]["option"][i]!=null){
			optionlist.push(`
				<label class="option">
					<input type="radio" name="option" value="${i}">
					<div class="fill">
						${
							tempquestion[no]["option"][i].split("image_")[1]?`
								<img src="${tempquestion[no]["option"][i].split("image_")[1]}" class="image">
							`:`
								${tempquestion[no]["option"][i]}
							`
						}
					</div>
				</label>
			`)
		}else{
			break
		}
	}

	innerhtml("#option",`
		${fisheryatesshuffle(optionlist).join("")}
		${tempquestion[no]["optionend"]}
		${
			tempquestion[no]["ps"]!=""?`
				<i>
					註解:
					${tempquestion[no]["ps"]}
				</i>
			`:``
		}
	`,false)

	value("#no",no,false)

	innerhtml("#answer",``,false)
}

function fisheryatesshuffle(data) {
	for(let i=data.length-1;i>0;i=i-1){
		let j=Math.floor(Math.random()*(i+1))
		let temp=data[i]
		data[i]=data[j]
		data[j]=temp
	}
	return data
}

main()

onclick("#submit",function(element,event){
	let answerlist=["A","B","C","D","E"]
	let youranswer=getinnerhtml("input[name=option]:checked~.fill")[0]
	let correctanswer=tempquestion[no]["option"][tempquestion[no]["answer"]]

	if(getvalue("input[name=option]:checked")[0]){
		innerhtml("#answer",`
			<div class="answer${youranswer==correctanswer?'correct':'error'}">你的答案: ${youranswer} </div><br>
			<div class="answer${correctanswer==correctanswer?'correct':'error'}}">正確答案: ${correctanswer} </div><br>
			${
				tempquestion[no]["explain"]!=""?`
					<div class="text normal">
						詳解:
						${tempquestion[no]["explain"]}
					</div>
				`:``
			}
		`,false)
	}else{
		innerhtml("#answer",`
			<div class="text big bold error">請選擇答案</div>
		`,false)
	}
})

onclick("#prev",function(element,event){
	if(0<no){
		no=no-1
		main()
	}else{
		value("#prev",`
			糙 還點 已經是第一題了
		`,false)
		setTimeout(function(){
			value("#prev",`
				上一題
			`,false)
		},1500)
	}
})

onclick("#next",function(element,event){
	if(no<tempquestion.length-1){
		no=no+1
		main()
	}else{
		value("#next",`
			糙 還點 已經是最後一題了
		`,false)
		setTimeout(function(){
			value("#next",`
				下一題
			`,false)
		},1500)
	}
})

onclick("#search",function(element,event){
	no=int(getvalue("no"))
	main()
})

onkeydown(document,function(element,event){
	if(element.tagName!="INPUT"){
		if(event.shiftKey&&event.key==" "){
			click("#prev")
			return
		}else if(event.key==" "){
			click("#next")
			return
		}else if(event.key=="Enter"){
			click("#submit")
			return
		}else if(["1","2","3","4"].includes(event.key)){
			domgetall("input[name=option]")[int(event.key)-1].checked=true
			return
		}
	}
})

onenterclick("#no",function(){
	click("#search")
})