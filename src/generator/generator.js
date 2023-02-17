//This code generates the best possible timetable for a school. It is a function called generate that takes several parameters, such as instances (an array of courses with their details), givenSlots (an array of integers representing the number of slots available for each day), teachers (an array of teachers), and sections (an array of class sections).

// The generate function first creates some initial data structures to keep track of the timetable. It creates two dictionaries, secInstances and teacherTT, which will store the instances for each section and the timetable for each teacher, respectively. It also creates an array TT that will store the final timetable.

// The function then goes through each section and creates a new timetable for it. For each section, the function first creates a new array called currentTT that represents the current timetable for that section. It also creates a new array called regenerateListSI that will store information about any slots that need to be regenerated (more on this later).

// The function then goes through each instance for the current section and tries to assign it to a slot in the timetable. For each instance, it first creates an array called availSlots that represents the available slots for that instance. It does this by iterating through each day and each slot and checking if that day and slot are available. If a slot is available, it is added to the daySlots array. Once all the available slots have been found, the daySlots array is added to the availSlots array.

// Once the availSlots array has been created, the function uses a function called ranD to select a random slot from the available slots. The ranD function takes two parameters, slots and count. The slots parameter is an array of available slots for a given day, and the count parameter is the number of slots needed for the current instance. The ranD function first finds all the days that have enough slots for the instance, then selects a random day from those viable days. It then selects the required number of slots from the available slots for that day and removes them from the slots array. Finally, it returns an object with the selected day and slots.

// Once the ranD function returns the selected day and slots, the function updates the currentTT, teacherTT, and secTT arrays to reflect the assigned instance. It also sets the regenerateFlagSI to true if the assigned slots overlap with any previously assigned slots. If regenerateFlagSI is true, then the function sets regenerateListSI to the day and slots that need to be regenerated.

// If a section is not possible to schedule, the function logs "Table Not Possible" to the console and stops.

// Once all sections have been scheduled, the TT array is returned, which represents the final timetable

// Function to generate the best possible timetable.

const crypto = require("crypto");
// yaha bata tutorial ko lagi try gareko hai
//We need to define a new function that checks whether two teachers are available for a given day and slot in a particular section. This function will take three parameters, namely the section, the day, and the slot.

const checkTwoTeachers = (section, day, slot) => {
	let teacherCount = 0;
	for (let j = 0; j < secInstances[section].length; j++) {
	  if (teacherTT[secInstances[section][j].teacher][day][slot] == 0) {
		teacherCount++;
	  }
	}
	if (teacherCount >= 2) {
	  return true;
	}
	return false;
  }

  //We need to modify the ranD function to make sure that it picks a day and a slot where two teachers are available for the tutorial subject. We will add an if condition to check if the selected day and slot are viable for two teachers or not. If not, it will regenerate the day and slot. Here's the modified ranD function:

  const crypto = require("crypto");

const ranD = async (slots, count) => {
let i;
let viableDays = [];
for (i in slots) {
if (slots[i].length >= count) {
viableDays.push(i);
}
}

if (viableDays.length == 0) return null;

let buff = crypto.randomBytes(2);
let n = parseInt(buff.toString("hex"), 16);
//console.log(n);

let index = n % viableDays.length;
let day = viableDays[index];
let slot = [];

for (i = 0; i < count; i++) {
buff = crypto.randomBytes(2);
n = parseInt(buff.toString("hex"), 16);


let s = n % slots[day].length;
slot.push(slots[day][s]);
slots[day].splice(s, 1);
//delete s;
}
//delete buff, n, viableDays, i,index;
//console.log("d/s ",day,slot)
return { day, slot };
};
// yo tut halna agi ko hai kei bigre chainx feri

// const ranD = async (slots, count) => {
// 	let i;
// 	let viableDays = [];
// 	for(i in slots){
// 		if (slots[i].length >= count){
// 			viableDays.push(i);
// 		}
// 	}
	
// 	if(viableDays.length == 0)
// 		return null; 

// 	let buff = crypto.randomBytes(2);
// 	let n = parseInt(buff.toString('hex'),16)
// 	//console.log(n);	

// 	let index =  n % (viableDays.length);
// 	let day = viableDays[index]
// 	let slot = [];

// 	for(i=0;i<count;i++){
// 		buff = crypto.randomBytes(2);
// 		n = parseInt(buff.toString('hex'),16)
	
// 		let s = n % slots[day].length;
// 		slot.push(slots[day][s]);
// 		slots[day].splice(s,1);
// 		//delete s;
// 	}
// 	//delete buff, n, viableDays, i,index;
// 	//console.log("d/s ",day,slot)
// 	return {day, slot}
// }
// aba generate functon ayo hai
// 
const generate = async (instaces, givenSlots, teachers, sections) => {
	let secInstances = {};
	let i,
	j,
	k = 0;
	let TT = [];
	let secTT = {};
	let teacherTT = {};
	
	let numDays = 0;
	givenSlots.forEach((x) => {
	if (x > 0) numDays++;
	});
	
	//console.log("num " , numDays);
	for (i in sections) {
	let mapp = givenSlots.map((x) => {
	z = [];
	for (j = 0; j < x; j++) {
	z.push(0);
	}
	return z;
	});
	secInstances[sections[i]] = [];
	secTT[sections[i]] = mapp;
	delete mapp, j;
	}
	
	for (i in teachers) {
	let mapp = givenSlots.map((x) => {
	z = [];
	for (j = 0; j < x; j++) {
	z.push(0);
	}
	return z;
	});
	teacherTT[teachers[i]] = mapp;
	delete mapp, j;
	}
	// for (i in teachers){
	// 	let mapp = givenSlots.map(x =>{z =[]; for(j=0;j<x;j++){z.push(0);} return z;});
	// 	if (inst.mapp[day][slot] == 0 && secTT[inst.sections[k]][day][slot] == 0 && teacherTT[teachers[i]][day][slot] == 0 && teacherTT[teachers[j]][day][slot] == 0){
	// 		inst.mapp[day][slot] = secTT[inst.sections[k]][day][slot] = teacherTT[teacher1][day][slot] = teacherTT[teacher2][day][slot] = 1;
	// 	}
		
	// 	teacherTT [teachers[i]] = mapp;
	// 	delete mapp,j;
	// }
	
	
	for (i in sections) {
	for (j in instaces) {
	for (let k in instaces[j].sections) {
	if (instaces[j].sections[k] == sections[i]) {
	instaces[j]["mapp"] = [];
	secInstances[sections[i]].push(instaces[j]);
	}
	}
	}
	}
	
	//console.log("sec ",secInstances, "tech " , teacherTT , "sec ", secTT);
	let regenerateCountSec = 0;
	let regenerateFlagSec = false;
	let regenerateListSec = {};
	let notPossibleCount = 0;
	let impossible = false;
	for (i = 0; i < sections.length; i++) {
	if (impossible) {
	console.log("Table Not Possible");
	break;
	}
	regenerateCountSec = 0;
regenerateFlagSec = false;
regenerateListSec = {};
notPossibleCount = 0;
let sec = sections[i];
for (j = 0; j < numDays; j++) {
for (k = 0; k < givenSlots[j]; k++) {
let currTime = j + "" + k;
let possible = false;
while (!possible) {
if (secInstances[sec].length == 0) {
impossible = true;
notPossibleCount++;
break;
}
let randIndex = Math.floor(Math.random() * secInstances[sec].length);
let currInstance = secInstances[sec][randIndex];
let teacher = currInstance.teacher;
let possibleTeacherTT = teacherTT[teacher][j][k];
let possibleSecTT = secTT[sec][j][k];
if (possibleTeacherTT == 0 && possibleSecTT == 0) {
currInstance["time"] = currTime;
currInstance["day"] = j;
currInstance["slot"] = k;
teacherTT[teacher][j][k] = 1;
secTT[sec][j][k] = 1;
secInstances[sec].splice(randIndex, 1);
TT.push(currInstance);
possible = true;
} else {
let flag = false;
let regenerateListTech = {};
if (possibleTeacherTT == 1) {
flag = true;
let tempList = [];
for (let l = 0; l < secInstances[sec].length; l++) {
if (secInstances[sec][l].teacher == teacher) {
tempList.push(l);
}
}
if (tempList.length > 1) {
if (regenerateFlagSec) {
if (regenerateListSec[currTime]) {
regenerateListSec[currTime].push(randIndex);
} else {
regenerateListSec[currTime] = [randIndex];
}
} else {
regenerateFlagSec = true;
regenerateListSec[currTime] = [randIndex];
}
flag = true;
} else {
regenerateCountSec++;
regenerateListTech[teacher] = true;
flag = false;
}
}
if (possibleSecTT == 1) {
flag = true;
if (regenerateFlagSec) {
if (regenerateListSec[currTime]) {
regenerateListSec[currTime].push(randIndex);
} else {
regenerateListSec[currTime] = [randIndex];
}
} else {
regenerateFlagSec = true;
regenerateListSec[currTime] = [randIndex];
}
flag = true;
} else {
if (!flag) {
regenerateCountSec++;
regenerateListTech[teacher] = true;
} else {
if (regenerateListTech[teacher]) {
regenerateCountSec++;
}
}
flag = false;
}
if (regenerateCountSec > 100) {
console.log("Too Many Regenerations Required");
impossible = true;
notPossibleCount++;
break;
}
if (!flag) {
let regenerateFlag = false;
let regenerateCount = 0;
while (!regenerateFlag) {
if (secInstances[sec].length == 0) {
impossible = true;
notPossibleCount++;
break;
}
randIndex = Math.floor(Math.random() * secInstances[sec].length);
currInstance = secInstances[sec][randIndex];
teacher = currInstance.teacher;
possibleTeacherTT = teacherTT[teacher][j][k];
possibleSecTT = secTT[sec][j][k];
if (possibleTeacherTT == 0 && possibleSecTT == 0) {
currInstance["time"] = currTime;
currInstance["day"] = j;
currInstance["slot"] = k;
teacherTT[teacher][j][k] =1;
secTT[sec][j][k] = 1;
secInstances[sec].splice(randIndex, 1);
TT.push(currInstance);
regenerateFlag = true;
} else {
if (possibleTeacherTT == 1) {
let tempList = [];
for (let l = 0; l < secInstances[sec].length; l++) {
if (secInstances[sec][l].teacher == teacher) {
tempList.push(l);
}
}
if (tempList.length > 1) {
if (regenerateFlagSec) {
if (regenerateListSec[currTime]) {
regenerateListSec[currTime].push(randIndex);
} else {
regenerateListSec[currTime] = [randIndex];
}
} else {
regenerateFlagSec = true;
regenerateListSec[currTime] = [randIndex];
}
} else {
regenerateCount++;
if (regenerateCount > 100) {
console.log("Too Many Regenerations Required");
impossible = true;
notPossibleCount++;
break;
}
}
}
if (possibleSecTT == 1) {
if (regenerateFlagSec) {
if (regenerateListSec[currTime]) {
regenerateListSec[currTime].push(randIndex);
} else {
regenerateListSec[currTime] = [randIndex];
}
} else {
regenerateFlagSec = true;
regenerateListSec[currTime] = [randIndex];
}
} else {
if (regenerateCount > 100) {
console.log("Too Many Regenerations Required");
impossible = true;
notPossibleCount++;
break;
}
}
}
}
}
}
}
}
}
}
console.log("Total Not Possible Count: " + notPossibleCount);
return TT;
}

console.log(scheduleTT(sections, secInstances, numDays, givenSlots));






// const generate = async (instaces, givenSlots, teachers, sections) => {
	
// 	let secInstances  = {};	
// 	let i,j,k;
// 	let TT = [];
// 	let secTT = {};
// 	let teacherTT = {};

// 	let numDays = 0;
// 	givenSlots.forEach((x) => {
// 		if(x>0)
// 			numDays++;
// 	})

// 	//console.log("num " , numDays);
// 	for (i in sections){
// 		let mapp = givenSlots.map(x =>{z =[]; for(j=0;j<x;j++){z.push(0);} return z;});
// 		secInstances[sections[i]] = [];
// 		secTT[sections[i]] = mapp;
// 		delete mapp,j;
// 	}

// 	for (i in teachers){
// 		let mapp = givenSlots.map(x =>{z =[]; for(j=0;j<x;j++){z.push(0);} return z;});
// 		teacherTT [teachers[i]] = mapp;
// 		delete mapp,j;
// 	}

// 	for (i in sections){
// 		for(j in instaces){
// 			for(let k in instaces[j].sections){ 
// 				if(instaces[j].sections[k] == sections[i]){
// 					instaces[j]["mapp"] = [];
// 					secInstances[sections[i]].push(instaces[j]);
// 				}
// 			}	
// 		}
// 	}
	
// 	//console.log("sec ",secInstances, "tech " , teacherTT , "sec ", secTT);
// 	let regenerateCountSec = 0;
// 	let regenerateFlagSec =false;
// 	let regenerateListSec = {};
// 	let notPossibleCount = 0;
// 	let impossible = false; 
// 	for(i=0; i < (sections.length ) ;i++){ 

// 		if(impossible){
// 			console.log("Table Not Possible");
// 			break;
// 		}
// 		let notPossible = false;
// 		let currentTT = givenSlots.map(x =>{z =[]; for(j=0;j<x;j++){z.push(0);} return z;});
// 		let regenerateCountSI = 0;
// 		let regenerateFlagSI = false;
// 		let regenerateListSI = {};	
// 		for(j = 0; j < secInstances[sections[i]].length; j++){ 
// 			//console.log("hey","i \t" , i, "j \t" ,j)
// 			let availSlots = [];
// 			for(day =0 ; day < givenSlots.length; day++){
			
// 				let daySlots = []
// 				for(slot= 0; slot < givenSlots[day]; slot++){
// 					if(regenerateFlagSI){
// 						//console.log("regenerateFlagSI", regenerateFlagSI, "	regenerateListSI", regenerateListSI)
// 						let slotFlag = true;
// 						for(let a in regenerateListSI.slot){
// 							let dumFlag = false;
// 							for(let b in slot){
// 								if(slot[b] == regenerateListSI.slot[a]){
// 									dumFlag = true;
// 									break;
// 								}
// 							}
// 							if(!dumFlag){
// 								slotFlag = false;
// 								break;
// 							}
// 						}
// 						if( ( (!slotFlag) || (day != regenerateListSI.day)) && (teacherTT[secInstances[sections[i]][j].teacher][day][slot] == 0) && (currentTT[day][slot] == 0)){
// 							daySlots.push(slot);
// 						}
// 						regenerateFlagSI = false;	
// 					}

// 					else if(regenerateFlagSec){

// 						let slotFlag = true;
// 						for(let a in regenerateListSI.slot){
// 							let dumFlag = false;
// 							for(let b in slot){
// 								if(slot[b] == regenerateListSI.slot[a]){
// 									dumFlag = true;
// 									break;
// 								}
// 							}
// 							if(!dumFlag){
// 								slotFlag = false;
// 								break;
// 							}
// 						}

// 						if(( (!slotFlag) || (day != regenerateListSec.day)) && (teacherTT[secInstances[sections[i]][j].teacher][day][slot] == 0) && (currentTT[day][slot] == 0)){

// 						}
// 						regenerateFlagSec = false;
// 					}
					
// 					else if((teacherTT[secInstances[sections[i]][j].teacher][day][slot] == 0) && (currentTT[day][slot] == 0)){
// 						daySlots.push(slot);
// 					}	
// 				}
// 				availSlots.push(daySlots);
// 			}
// 			//console.log(sections[i], j,"avai\t" , availSlots);

// 			let eachDay = Math.floor(secInstances[sections[i]][j].numLectures / numDays);
// 			let extraDays = secInstances[sections[i]][j].numLectures % numDays;

// 			for(let x=0;x<numDays;x++){
// 				let count;
// 				if(extraDays > 0){
// 					count = eachDay + 1;
// 					extraDays--;	
// 				}
// 				else{
// 					count = eachDay;
// 				}
				
// 				let flag = true;
// 				let radCount = 0;
// 				while(flag){
// 					//console.log("call", availSlots,count)
// 					const ret = await ranD(availSlots, count);
// 					//console.log("ret", ret)
// 					//console.log("tt", currentTT)
// 					if((ret != undefined) && (ret != null) && (ret.day != undefined) && (ret.slot!= undefined) && (ret.day >= 0) && (ret.day < givenSlots.length) && (ret.slot.length == count)){

// 						secInstances[sections[i]][j].mapp.push({"day": ret.day,"slot": ret.slot})
// 						for(let z in ret.slot){
// 							currentTT[ret.day][ret.slot[z]] = secInstances[sections[i]][j];
// 							teacherTT[secInstances[sections[i]][j].teacher][ret.day][ret.slot[z]] = secInstances[sections[i]][j];							
// 						}
// 						availSlots[ret.day] = []
// 						flag = false;
// 					}
// 					else{
// 						if(radCount < 10){
// 							//console.log("rad", radCount,j)
// 							radCount++;
// 						}
// 						else if(regenerateCountSI<100){
// 							regenerateSI = true;
// 							regenerateCountSI++;
// 							flag= false;
// 							regenerateFlagSI = true;
// 							if(secInstances[sections[i]][j].mapp[0] == undefined){
// 								regenerateListSI = {day: null, slot: null};								
// 							}
// 							else{
// 								regenerateListSI = secInstances[sections[i]][j].mapp[0];
// 							}
// 							//console.log("regSI",regenerateCountSI, regenerateCountSI, regenerateListSI)
// 							//console.log("hey","i \t" , i, "j \t" ,j)
// 							for(let y in secInstances[sections[i]][j].mapp){
// 								for(let w in secInstances[sections[i]][j].mapp.slot){
// 									currentTT[secInstances[sections[i]][j].mapp[y].day][secInstances[sections[i]][j].mapp[y].slot[w]] = 0;
// 									teacherTT[secInstances[sections[i]][j].teacher][secInstances[sections[i]][j].mapp[y].day][secInstances[sections[i]][j].mapp[y].slot[w]] = 0;									
// 								}
// 							}
// 							secInstances[sections[i]][j].mapp = [];					
// 							j--;
// 						}
// 						else{
// 							if(regenerateCountSec < 100){
// 								//console.log("regenerateCountSec",regenerateCountSI, regenerateCountSec)
// 								regenerateCountSI = 0; 
// 								regenerateSec = true;
// 								regenerateCountSec++;
// 								regenerateFlagSec = true;
// 								flag = false;
// 								if(secInstances[sections[i]][j].mapp[0] == undefined){
// 									regenerateListSec = {day: null, slot: null};
// 								}
// 								else{
// 									regenerateListSec = secInstances[sections[i]][0].mapp[0];
// 								}								
// 								for(let x in secInstances[sections[i]]){
// 									for(let y in secInstances[sections[i]][x].mapp){
// 										for(let w in secInstances[sections[i]][x].mapp.slot){
// 											teacherTT[secInstances[sections[i]][x].teacher][secInstances[sections[i]][x].mapp[y].day][secInstances[sections[i]][x].mapp[y].slot[w]] = 0;									
// 										}
// 									}
// 								}
// 								for(x in secInstances[sections[i]])
// 								secInstances[sections[i]][x].mapp = [];								
// 								i--;
// 							}
// 							else{
// 								if(notPossibleCount < 1000){
// 									flag = false;
// 									regenerateCountSec = 0;
// 									console.log("notPossibleCount", notPossibleCount)
// 									notPossible = true;
// 									notPossibleCount++;									
// 									i=-1;
// 									TT = [];
// 	                        		teacherTT = {};
// 	                        		secTT = {};
// 	                        		currentTT = [];
// 	                        		for (let u in sections){
// 										let mapp = givenSlots.map(x =>{z =[]; for(let w  =0;w<x;w++){z.push(0);} return z;});
// 										secInstances[sections[u]] = [];
// 										secTT[sections[u]] = mapp;
// 										delete mapp;
// 									}
	
// 									for (u in teachers){
// 										let mapp = givenSlots.map(x =>{z =[]; for(w=0;w<x;w++){z.push(0);} return z;});
// 										teacherTT [teachers[u]] = mapp;
// 										delete mapp;
// 									}
// 									for (let u in sections){
// 										for(let v in instaces){
// 											for(let w in instaces[v].sections){ 
// 												if(instaces[v].sections[w] == sections[u]){
// 													instaces[v]["mapp"] = [];
// 													secInstances[sections[u]].push(instaces[v]);
// 												}
// 											}	
// 										}
// 									}			     
// 								//console.log("not" , " ", i, " ", j)	
// 								}
// 								else{
// 									impossible = true;
// 									flag = false;
// 								}
// 							}								
// 						}
// 					}
// 				} // flag 				
// 				if(impossible ||  notPossible || regenerateFlagSec || regenerateFlagSI){
// 					console.log("break1" , i,j)
// 					break;
// 				}
// 			} // numdays
// 				console.log("pos2", impossible, notPossibleCount)
// 			if( impossible ||  notPossible || regenerateFlagSec){
// 				console.log("break2",i,j)
// 				break;
// 			}
// 		}	// j
// 		/*								
// 		if(currentTT[0] != undefined)
// 			console.log("CURR",currentTT[0][0].sections , impossible, regenerateFlagSec, notPossible, i,j)
// 		*/
// 		if( (!impossible) && (!regenerateFlagSec) && (!notPossible)){
// 			TT.push(currentTT);
// 			secTT[sections[i]] = currentTT;
// 		}
// 		if(notPossible){
// 			notPossible = false;
// 		}
// 		if(impossible){

// 			console.log("Could not generate in this case, please refresh/restart.\n");
			
// 			for(let u in TT){
// 				for(let v in TT[u]){
// 					for(let w in TT[u][v]){
// 						console.log("ptt",TT[u][v][w], TT[u][v][w].sections, TT[u][v][w].mapp , "u ", u,"v ",  v,"w ", w)
// 					}
// 				}
// 			}	
// 			break;
// 		}
// 		console.log("iii")
// 	} // i
	
// 	for(let u in TT){
// 		for(let v in TT[u]){
// 			for(let w in TT[u][v]){
// 				console.log("tt",TT[u][v][w], TT[u][v][w].sections, TT[u][v][w].mapp , "u ", u,"v ",  v,"w ", w)
// 			}
// 		}
// 	}



// 	//console.log("TT",TT[1], notPossibleCount)
// 	/*
// 	console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT\n");
	
// 	for(let i in teacherTT["T1"]){
// 		for(let j in teacherTT["T1"][i]){
// 				console.log(teacherTT["T1"][i][j], teacherTT["T1"][i][j].sections, teacherTT["T1"][i][j].mapp, j, k)
// 		}
// 	}		
// 	*/
// }

// generate([{
// 	teacher: "T1",
// 	sections: ["12A"],
// 	subject: "English",
// 	numLectures: "12",
// 	numLabs: null
// },{
// 	teacher: "T2",
// 	sections: ["12A"],
// 	subject: "Hindi",
// 	numLectures: "11",
// 	numLabs: null
// },{
// 	teacher: "T3",
// 	sections: ["12A"],
// 	subject: "Maths",
// 	numLectures: "11",
// 	numLabs: null
// },{
// 	teacher: "T1",
// 	sections: ["12A"],
// 	subject: "Science",
// 	numLectures: "11",
// 	numLabs: null
// },{
// 	teacher: "T1",
// 	sections: ["12B"],
// 	subject: "English",
// 	numLectures: "11",
// 	numLabs: null
// },{
// 	teacher: "T2",
// 	sections: ["12B"],
// 	subject: "Hindi",
// 	numLectures: "11",
// 	numLabs: null
// },{
// 	teacher: "T3",
// 	sections: ["12B"],
// 	subject: "Maths",
// 	numLectures: "12",
// 	numLabs: null
// },{
// 	teacher: "T1",
// 	sections: ["12B"],
// 	subject: "Science",
// 	numLectures: "11",
// 	numLabs: null
// }], [8,8,8,8,8,5], ["T1", "T2", "T3", "T4", "T5", "T6"], ["12A", "12B"]); 

// /*
// let x = [[1,2], [1,2,3,4], [1,2,3,4]];
// ranD(x, 3)
// console.log("out" , x)
// */

