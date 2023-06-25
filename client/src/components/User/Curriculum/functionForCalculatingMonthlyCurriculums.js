 const findSchoolYear = () =>{
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
let year1 = 0
let year2 = 0
if(currentMonth > 6){
    year1 = currentYear
    year2 = currentYear + 1
}
else {
    year1 = currentYear - 1
    year2 = currentYear
}
// skolska godina year1 / year2
// return `${year1} / ${year2}`
return{
  year1,
  year2
}
}
// console.log(findSchoolYear().year1);
// // 
// function countWeeksInMonths() {
//   const result = [];

//   // Set the start and end dates
//   const startDate = new Date('September 1, 2023');
//   const endDate = new Date('June 18, 2024');

//   let currentDate = new Date(startDate);
//   while (currentDate <= endDate) {
//     const month = currentDate.toLocaleString('default', { month: 'long' });
//     const year = currentDate.getFullYear();

//     const existingMonth = result.find((entry) => entry.month === month);
//     if (existingMonth) {
//       existingMonth.numWeeks++;
//     } else {
//       result.push({ month, numWeeks: 1 });
//     }

//     currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
//   }

//  result.map(x => x.month === "januar" ? x.numWeeks = 1 : null)
  
//   return result;
// }

// // Example usage
// const weeksInMonths = countWeeksInMonths();
// console.log(weeksInMonths);
function countWeeksInMonths(start_date, end_date) {
  const result = [];

  // Set the start and end dates
  const startDate = new Date(`September 1, ${start_date}`);
  const endDate = new Date(`June 18, ${end_date}`);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    // const year = currentDate.getFullYear();
    const startOfWeek = currentDate.getDate() + '/' + (currentDate.getMonth() + 1);

    // Check if it's the last week of January
    if (month === 'January') {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      if (nextWeek.getMonth() !== currentDate.getMonth()) {
        const existingMonth = result.find((entry) => entry.month === month);
        if (existingMonth) {
          existingMonth.numWeeks++;
          existingMonth.startDates.push(startOfWeek);
        } else {
          result.push({ month, numWeeks: 1, startDates: [startOfWeek] });
        }
      }
    } else {
      const existingMonth = result.find((entry) => entry.month === month);
      if (existingMonth) {
        existingMonth.numWeeks++;
        existingMonth.startDates.push(startOfWeek);
      } else {
        result.push({ month, numWeeks: 1, startDates: [startOfWeek] });
      }
    }

    currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
  }
  result.map(x => {
    if(x.month === "januar"){
      x.numWeeks = 1
      x.startDates = x.startDates[x.startDates.length -1]
    }
  })
  // console.log(result);
  return result;
}

// Example usage
// const weeksInMonths = countWeeksInMonths(findSchoolYear().year1,findSchoolYear().year2);
// console.log(countWeeksInMonths(findSchoolYear().year1,findSchoolYear().year2))


// const curriculum = {
  
//     "id": 4,
//     "classCode": "SS",
//     "curriculum": "1.\tUvod\n2.\tDruga lekcoja\n3.\tTreca lekcija\n4.\tCetvrta lekcija\n5.\tPet lekcija\n6.\tSestra lekcija\n7.\tSedma lekcija\n8.\tOsma lekcija\n9.\tDeveta lekcija\n10.\tDeseta lekcija\n11.\tJedanesta lekcija\n12.\tDvanaesta lekcija\n13.\tTrinaesta lekcija\n14.\tCetrnaesta lekcija\n15.\tPetnaesta lekcija\n16.\tSestnaesta lekcija\n17.\tSedamnaest lekcija\n18.\tOsamnaesta lekcij\n19.\tDevetnaesta lekcija\n20.\tDvadesetsa lekcija\n21.\tDvadesetprva lekcja\n",
//     "user": {
//         "id": 1,
//         "firstName": "Adis",
//         "lastName": "Aljic",
//         "email": "adis@gmail.com",
//         "role": "teacher",
//         "isAuth": true,
//         subject: "Fizika"
//   }
// }
// const a = countWeeksInMonths(findSchoolYear().year1,findSchoolYear().year2)
// console.log(curriculum.curriculum.split("\n"));
// console.log(a);
const getClassesPerMonths = (curriculumString, schoolCalendar, numberOfclasses ,month) =>{
  const curriculum = curriculumString.split("\n").map(x => x = x + " \n")
  
 
//  console.log(a);
  // console.log(curriculum);
  const months = {

   September: curriculum.splice(0,schoolCalendar[0].numWeeks*numberOfclasses),
    October: curriculum.splice(0,schoolCalendar[1].numWeeks*numberOfclasses),
   November: curriculum.splice(0,schoolCalendar[2].numWeeks*numberOfclasses),
   December: curriculum.splice(0,schoolCalendar[3].numWeeks*numberOfclasses),
   January: curriculum.splice(0,schoolCalendar[4].numWeeks*numberOfclasses),
   February: curriculum.splice(0,schoolCalendar[5].numWeeks*numberOfclasses),
   Mart: curriculum.splice(0,schoolCalendar[6].numWeeks*numberOfclasses),
   April: curriculum.splice(0,schoolCalendar[7].numWeeks*numberOfclasses),
   May: curriculum.splice(0,schoolCalendar[8].numWeeks*numberOfclasses),
    June:curriculum.splice(0,schoolCalendar[9].numWeeks*numberOfclasses)
  }

console.log(months);
  return months[month]

}

// console.log(getClassesPerMonths(curriculum.curriculum,a,"January"))

const secondDate = (string) =>{
  if(string){

    const day = string.slice(0,string.indexOf("/"))
    const month = string.slice(string.indexOf("/")+1)
    const friday = Number(day) + 4
    return `${friday}/${month}`
  }
  else return undefined

}
module.exports = {
findSchoolYear,
countWeeksInMonths,
getClassesPerMonths,
secondDate
}