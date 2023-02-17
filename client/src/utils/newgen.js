const mernStackTimetableGA = (instances, givenSlots, teachers, sections) => {
    const fitness = (timetable) => {
      // Calculate the fitness of the given timetable by evaluating how well it meets the constraints of the problem
      // For example, you could check if the timetable has no conflicts (e.g. a teacher or a section is not double booked)
      // and that each instance is scheduled for the appropriate number of lectures and labs
      let fitness = 0;
      // Check if the timetable has no conflicts
let teacherSlots = {};
let sectionSlots = {};
for (let day in timetable) {
for (let slot in timetable[day]) {
let instance = timetable[day][slot];
  // Check if the teacher is not double booked
  if (teacherSlots[instance.teacher]) {
    fitness -= 1;
  } else {
    teacherSlots[instance.teacher] = true;
  }

  // Check if the section is not double booked
  for (let i in instance.sections) {
    if (sectionSlots[instance.sections[i]]) {
      fitness -= 1;
    } else {
      sectionSlots[instance.sections[i]] = true;
    }
  }
}
// Reset the teacher and section slots for the next day
teacherSlots = {};
sectionSlots = {};
}
// Check that each instance is scheduled for the appropriate number of lectures and labs
for (let day in timetable) {
    for (let slot in timetable[day]) {
    let instance = timetable[day][slot];
    let numLectures = 0;
    let numLabs = 0;
    for (let i in timetable[day]) {
        if (timetable[day][i].subject === instance.subject) {
          if (timetable[day][i].numLabs > 0) {
            numLabs += timetable[day][i].numLabs;
          } else {
            numLectures += timetable[day][i].numLectures;
          }
        }
      }
    
      // Check if the number of lectures and labs is correct
      if (numLectures !== instance.numLectures || numLabs !== instance.numLabs) {
        fitness -= 1;
      }
    }
}    
      // Calculate the fitness value and return it
      return fitness;
    }
    
    const generateRandomTimetable = () => {
      // Generate a random timetable by randomly assigning each instance to a time slot
      let timetable = [];
      for (let i = 0; i < instances.length; i++) {
        let instance = instances[i];
        let day = Math.floor(Math.random() * givenSlots.length);
        let slot = Math.floor(Math.random() * givenSlots[day]);
        timetable.push({ instance, day, slot });
      }
      return timetable;
    }
    
    const mutate = (timetable) => {
      // Mutate the given timetable by randomly changing the day and/or time slot of one of its instances
      let mutatedTimetable = [...timetable];
      let index = Math.floor(Math.random() * mutatedTimetable.length);
      let instance = mutatedTimetable[index].instance;
      let day = Math.floor(Math.random() * givenSlots.length);
      let slot = Math.floor(Math.random() * givenSlots[day]);
      mutatedTimetable[index] = { instance, day, slot };
      return mutatedTimetable;
    }
    
    const crossover = (timetable1, timetable2) => {
      // Crossover the given timetables by randomly selecting a point and swapping the instances before and after that point
      let crossoverPoint = Math.floor(Math.random() * instances.length);
      let offspring1 = [...timetable1.slice(0, crossoverPoint), ...timetable2.slice(crossoverPoint)];
      let offspring2 = [...timetable2.slice(0, crossoverPoint), ...timetable1.slice(crossoverPoint)];
      return [offspring1, offspring2];
    }
    
   // Initialize the population
let population = [];
for (let i = 0; i < 100; i++) {
let timetable = givenSlots.map(x => {
let slots = [];
for (let j = 0; j < x; j++) {
slots.push(0);
}
return slots;
});
let individual = { timetable, fitness: 0 };
population.push(individual);
}

// Run the genetic algorithm
for (let generation = 0; generation < 1000; generation++) {
// Sort the population by fitness
population.sort((a, b) => b.fitness - a.fitness);

// Select the top 50% individuals as parents
let parents = population.slice(0, population.length / 2);

// Create the children for the new generation
let children = [];
while (children.length < population.length) {
  // Select two parents at random
  let parent1 = parents[Math.floor(Math.random() * parents.length)];
  let parent2 = parents[Math.floor(Math.random() * parents.length)];

  // Create a child by combining the timetables of the two parents
  let childTimetable = [];
  for (let i = 0; i < parent1.timetable.length; i++) {
    let slots = [];
    for (let j = 0; j < parent1.timetable[i].length; j++) {
      if (Math.random() < 0.5) {
        slots.push(parent1.timetable[i][j]);
      } else {
        slots.push(parent2.timetable[i][j]);
      }
    }
    childTimetable.push(slots);
  }
  let child = { timetable: childTimetable, fitness: 0 };
  children.push(child);
}

// Mutate the children with a low probability
for (let i = 0; i < children.length; i++) {
  if (Math.random() < 0.1) {
    let day = Math.floor(Math.random() * children[i].timetable.length);
    let slot = Math.floor(Math.random() * children[i].timetable[day].length);
    children[i].timetable[day][slot] = Math.floor(Math.random() * teachers.length);
  }
}

// Replace the current population with the new generation
population = parents.concat(children);
}
let fittestTimetable = null;
let fittestFitness = -1;
for (let i = 0; i < population.length; i++) {
let fitness = calculateFitness(population[i].timetable, instances, teachers);
if (fitness > fittestFitness) {
fittestTimetable = population[i].timetable;
fittestFitness = fitness;
}}

// const crypto = require("crypto");
// const generate = async (instances, labInstances, givenSlots, teachers, sections) => {
//     // Initialize secInstances and teacherTT as before...
//     const ranD = async (slots, count) => {
//         let i;
//         let viableDays = [];
//         for (i in slots) {
//           if (slots[i].length >= count) {
//             viableDays.push(i);
//           }
//         }
      
//         if (viableDays.length === 0) return null;
      
//         let buff = crypto.randomBytes(2);
//         let n = parseInt(buff.toString("hex"), 16);
//         //console.log(n);
      
//         let index = n % viableDays.length;
//         let day = viableDays[index];
//         let slot = [];
      
//         for (i = 0; i < count; i++) {
//           buff = crypto.randomBytes(2);
//           n = parseInt(buff.toString("hex"), 16);
      
//           let s = n % slots[day].length;
//           slot.push(slots[day][s]);
//           slots[day].splice(s, 1);
//           s = null;
//         }
//         buff = null;
//         n = null;
//         viableDays = null;
//         i = null;
//         index = null;
//         //console.log("d/s ",day,slot)
//         return { day, slot };
//       };
      
//       export const generate = async (instaces, givenSlots, teachers, sections) => {
//         let secInstances = {};
//         let i, j;
//         let TT = [];
//         let secTT = {};
//         let teacherTT = {};
      
//         let numDays = 0;
//         givenSlots.forEach(x => {
//           if (x > 0) numDays++;
//         });
      
//         //console.log("num " , numDays);
//         for (i in sections) {
//           let mapp = givenSlots.map(x => {
//             let z = [];
//             for (let j = 0; j < x; j++) {
//               z.push(0);
//             }
//             return z;
//           });
//           secInstances[sections[i]] = [];
//           secTT[sections[i]] = mapp;
//           mapp = null;
//           j = null;
//         }
      
//         for (i in teachers) {
//           let mapp = givenSlots.map(x => {
//             let z = [];
//             for (let j = 0; j < x; j++) {
//               z.push(0);
//             }
//             return z;
//           });
//           teacherTT[teachers[i]] = mapp;
//           mapp = null;
//           j = null;
//         }
      
//         for (i in sections) {
//           for (j in instaces) {
//             for (let k in instaces[j].sections) {
//               if (instaces[j].sections[k] === sections[i]) {
//                 instaces[j]["mapp"] = [];
//                 secInstances[sections[i]].push(instaces[j]);
//               }
// // Add a loop to iterate over the lab instances and add them to secInstances and teacherTT
// for (const lab of labInstances) {
//     for (const section of lab.sections) {
//       secInstances[section].push(lab);
//     }
//     teacherTT[lab.teacher].push(lab);
//   }
//             }
//           }
//         }
      
    
  
//     // Modify the scheduling algorithm to consider the lab instances when generating the timetable...
//   }
  
//   const ranD = async (slots, count, duration, numLabs) => {
//     // Modify the function to handle the additional parameters...
  
//       // Modify the function to handle the additional parameters...

//   let slot = [];
//   for (let i = 0; i < count; i++) {
//     // Select a day and time slot for the lab class
//     let dayAndSlot = await selectDayAndSlot(slots, duration);
//     if (dayAndSlot === null) {
//       return null;
//     }
//     slot.push(dayAndSlot);

//     // Update the slots array to reflect the time slot being taken
//     for (let j = 0; j < duration; j++) {
//       slots[dayAndSlot.day][dayAndSlot.slot + j] = 1;
//     }
//   }
//   return { day: dayAndSlot.day, slot };
// };

// const selectDayAndSlot = async (slots, duration) => {
//   // Select a day and time slot that can accommodate the lab class
//   let viableDays = [];
//   for (const day in slots) {
//     for (let i = 0; i < slots[day].length - duration + 1; i++) {
//       let available = true;
//       for (let j = 0; j < duration; j++) {
//         if (slots[day][i + j] === 1) {
//           available = false;
//           break;
//         }
//       }
//       if (available) {
//         viableDays.push({ day, slot: i });
//       }
//     }
//   }

//   if (viableDays.length === 0) {
//     return null;
//   }

//   // Select a day and time slot at random
//   let buff = crypto.randomBytes(2);
//   let n = parseInt(buff.toString("hex"), 16);
//   let index = n % viableDays.length;
//   return viableDays[index];
// };

// // Modify the generate function to handle lab classes
// export const generate = async (instances, givenSlots, teachers, sections) => {
//   let secInstances = {};
//   let i, j;
//   let TT = [];
//   let secTT = {};
//   let teacherTT = {};

//   let numDays = 0;
//   givenSlots.forEach((x) => {
//     if (x > 0) numDays++;
//   });

//   for (i in sections) {
//     let mapp = givenSlots.map((x) => {
//       let z = [];
//       for (let j = 0; j < x; j++) {
//         z.push(0);
//       }
//       return z;
//     });
//     secInstances[sections[i]] = [];
//     secTT[sections[i]] = mapp;
//   }

//   for (i in teachers) {
//     let mapp = givenSlots.map((x) => {
//       let z = [];
//       for (let j = 0; j < x; j++) {
//         z.push(0);
//       }
//       return z;
//     });
//     teacherTT[teachers[i]] = mapp;
//   }

//   for (i in sections) {
//     for (j in instances) {
//       for (let k in instances[j].sections) {
//         if (instances[j].sections[k] === sections[i]) {
//           instances[j]["mapp"] = [];
//           secInstances[sections[i]].push(instances[j]);
//         }
//       }
//     }
//   }

//   let regenerateCountSec = 0;
//   let regenerateFlagSec = false;
//   let regenerateListSec = {};
//   let notPossibleCount = 0;
//   let impossible = false;
//   for (i = 0; i < sections.length; i++) {
//     if (impossible) {
//       console.log("Table Not Possible");
//       break;
//     }
//     let notPossible = false;
//     let currentTT = givenSlots.map((x) => {
//       let z = [];
//       for (let j = 0; j < x; j++) {
//         z.push(0);
//       }
//       return z;
//     });
//     let regenerateCountSI = 0;
//     let regenerateFlagSI = false;
//     let regenerateListSI = {};
//     for (j = 0; j < secInstances[sections[i]].length; j++) {
//       let instance = secInstances[sections[i]][j];
//       let duration = 1;
//       let numLabs = instance.numLabs;
//       if (numLabs > 0) {
//         duration = 2;
//       }
//       let count = instance.numLectures + numLabs;
//       let result = await ranD(currentTT, count, duration, numLabs);
//       if (result === null) {
//         notPossible = true;
//         break;
//       }
//       instance["mapp"].push(result);
//       let day = result.day;
//       let slot = result.slot;
//       for (let s = 0; s < slot.length; s++) {
//         currentTT[day][slot[s]] = 1;
//         secTT[sections[i]][day][slot[s]] = 1;
//         teacherTT[instance.teacher][day][slot[s]] = 1;
//       }
//     }
//     if (notPossible) {
//       if (regenerateCountSI > 4) {
//         regenerateFlagSI = true;
//         regenerateListSI[sections[i]] = secInstances[sections[i]];
//       } else {
//         regenerateCountSI++;
//         j = -1;
//       }
//     } else {
//       TT.push({ section: sections[i], tt: currentTT });
//     }
//     if (regenerateFlagSI) {
//       if (regenerateCountSec > 4) {
//         regenerateFlagSec = true;
//         regenerateListSec[sections[i]] = secInstances[sections[i]];
//       } else {
//         regenerateCountSec++;
//         i = -1;
//       }
//     }
//   }
//   if (regenerateFlagSec) {
//     console.log("Table not possible for: ", regenerateListSec);
//     notPossibleCount++;
//     if (notPossibleCount > 4) {
//       impossible = true;
//     }
//   } else {
//     console.log("TT Generated!");
//     break;
//   }
// 
}