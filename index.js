let no=0
let tempquestion=fisheryatesshuffle([...question])
tempquestion=[...question]

function main(){
	innerhtml("#question",`
		Q:<br>
		${tempquestion[no]["question"]}
		${
			tempquestion[no]["questionimage"]!=null?`
				<img src="${tempquestion[i]["questionimage"].split("image_")[1]}" alt="question image">
			`:``
		}
	`,false)

	innerhtml("#option",`
		<label class="option">
			<input type="radio" name="option" value="0">
			<div class="fill">
				${
					tempquestion[no]["option"][0].split("image_")[1]?`
						<img src="${tempquestion[no]["option"][0].split("image_")[1]}" alt="question image">
					`:`
						${tempquestion[no]["option"][0]}
					`
				}
			</div>
		</label>
		<label class="option">
			<input type="radio" name="option" value="1">
			<div class="fill">
				${
					tempquestion[no]["option"][1].split("image_")[1]?`
						<img src="${tempquestion[no]["option"][1].split("image_")[1]}" alt="question image">
					`:`
						${tempquestion[no]["option"][1]}
					`
				}
			</div>
		</label>
		<label class="option">
			<input type="radio" name="option" value="2">
			<div class="fill">
				${
					tempquestion[no]["option"][2].split("image_")[1]?`
						<img src="${tempquestion[no]["option"][2].split("image_")[1]}" alt="question image">
					`:`
						${tempquestion[no]["option"][2]}
					`
				}
			</div>
		</label>
		<label class="option">
			<input type="radio" name="option" value="3">
			<div class="fill">
				${
					tempquestion[no]["option"][3].split("image_")[1]?`
						<img src="${tempquestion[no]["option"][3].split("image_")[1]}" alt="question image">
					`:`
						${tempquestion[no]["option"][3]}
					`
				}
			</div>
		</label>
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

	if(getvalue("input[name=option]:checked")[0]){
		innerhtml("#answer",`
			<div>你的答案: ${answerlist[getvalue("input[name=option]:checked")[0]]} </div><br>
			<div>正確答案: ${answerlist[tempquestion[no]["answer"]]} </div><br>
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

onenterclick("#no",function(){
	click("#search")
})