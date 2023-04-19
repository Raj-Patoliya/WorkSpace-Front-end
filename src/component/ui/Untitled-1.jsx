    // const axios = require("axios");
    // const fs = require("fs");
    // const crypto = require("crypto");

    // const q1 = async() => {
    //     const data = await axios.get('https://coderbyte.com/api/challenges/json/age-counting')
    //     const w = await data.data
    //     const a1 = w.data.split(', ')

    //     let  str = ''
    //     let count = ''

    //     for(let i=1;i<a1.length;i+=2){
    //         let age = +a1[i].split('=')[1]
    //         if(age >= 50){
    //             const t = a1[i-1].split('=')[1]
    //             str = str + t + '\n'
    //             count ++
    //         }
    //     }
    //     console.log(count);
    //     const hs = crypto.createHash('sha1').update(str).digest('hex')
    //     console.log(hs);
    // }
    // q1()

// const q3 = async () => {
//     const data = await axios.get('https://coderbyte.com/api/challenges/json/age-counting')
//     let jsonData = await data.data

//     const arr = jsonData.data.split(', ')

//     let str = ''
//     for (let i = 1; i < arr.length; i = i + 2) {
//         let age = +arr[i].split('=')[1]
//         if (age === 32) {
//             const temp = arr[i - 1].split('=')[1]
//             str = str + temp + '\n'
//         }
//     }

//     fs.writeFileSync('output.txt', str)

//     const hashedData = crypto
//         .createHash('SHA1')
//         .update(str)
//         .digest('hex')

//     console.log(hashedData)
// }

// q3()

// ########################################## email ##########################

// const axios = require('axios');
// const csvToJson = async () => {
//     const data = await axios.get("https://coderbyte.com/api/challenges/logs/user-info-csv");
//     const jsonData = await data.data.split('\n');
//     const headers = jsonData[0].split(',');
//     // console.log(headers)
//     jsonData.shift()
//     // console.log(headers)
//     for(let i =0;i<headers.length;i++){
//       headers[i]=  headers[i].toLowerCase()
//     }

//     // console.log(headers)
//     let result = [];

//     for(let i=0; i<jsonData.length; i++) {
//         let obj = {}
//         const currentLine = jsonData[i].split(",");
//         // console.log(currentLine)
//         headers.forEach((h, i) => {
//             obj[h] = currentLine[i];
//         })
//         result.push(obj)
//     }
//     // console.log(result)
//     for(let i =0;i<result.length;i++){
//         for(let j=1;j<result.length;j++){
//             if(result[j].Email<result[j-1].Email){
//                 let temp = result[j]
//                 result[j] = result[j-1];
//                 result[j-1] = temp
//             }
//         }
//     }
//     // console.log(result)
//     console.log(JSON.stringify(result))
//     }
//     csvToJson()

// ######################################## json clenify ###############################

//  jsonCleaning = async () =>{
//     const file = await axios.get('https://coderbyte.com/api/challenges/json/json-cleaning');
//     const data = await file.data;

//     for([key,val] of Object.entries(data)){
//         if(val === 'N/A' || val === '' || val === '-'){
//             delete data[key];
//         }
//         else if(Array.isArray(val)){
//             data[key] = val.filter((e)=>{
//                 if(e !== '' && e !== 'N/A' && e !== '-'){
//                     return e;
//                 }
//             })
//         }
//         else if(typeof val === 'object'){
//             for([key2,val2] of Object.entries(val)){
//                 if(val2 === 'N/A' || val2 === '' || val2 === '-'){
//                     delete data[key][key2];
//                 }
//             }
//         }
//     }
//     console.log(data);
//   }
//   jsonCleaning()

// ########################################################################

// const fetch = require("node-fetch");

// const q2 = async () => {
//   const data = await fetch(
//     "https://coderbyte.com/api/challenges/json/json-cleaning"
//   );
//   let jsonData = await data.json();

//   for (key in jsonData) {
//     if (typeof jsonData[key] === "object") {
//       if (Array.isArray(jsonData[key])) {
//         let arr = jsonData[key];
//         let arr1 = [];
//         for (let i = 0; i < arr.length; i++) {
//           if (jsonData[key][i] !== "-") {
//             arr1.push(arr[i]);
//           }
//         }
//         jsonData[key] = arr1;
//       } else {
//         for (k in jsonData[key]) {
//           if (jsonData[key][k] === "" || jsonData[key][k] === "N/A") {
//             delete jsonData[key][k];
//           }
//         }
//       }
//     }
//     if (jsonData[key] === "-") {
//       delete jsonData[key];
//     }
//   }
//   console.log(JSON.stringify(jsonData));
// };

// q2();

// ################################################################

// const jsonData = {
//     name: 'abc',
//     age: 22,
//     hobbies: ['reading', 'writting', 'cricket']
// }

// const ar = jsonData.hobbies

// console.log(ar.join(', '))

// ==================================================================

// const fs = require('fs')

// const str = 'hello world i am Chirag'

// fs.writeFileSync('newfile.txt', str)

// const arr = fs.readdirSync(__dirname)
// console.log(arr);

// console.log(arr.join(', '))

// // main.txt, newfile.txt

// ########################################################################

// const fs = require('fs');

// // let data = fs.readFileSync('./50-contacts.csv', 'utf8');
// // data = data.split('\r\n');
// // let headers = data.shift();
// // headers = headers.split(',');
// // let jsonArray = [];
// // data.forEach((el) => {
// //   let tempJson = {};
// //   el = el.split(',');
// //   headers.forEach((val, i) => {
// //     tempJson[val] = el[i];
// //   });
// //   jsonArray.push(tempJson);
// // });
// // jsonArray.sort((a, b) => {
// //   return a.first_name.localeCompare(b.first_name);
// // });
// // fs.writeFileSync('./output.json', JSON.stringify(jsonArray));
// // console.log(jsonArray);

// // // [
// // //   {
// // //     date: 5,
// // //     value: 20,
// // //   },
// // //   { date: 6, value: 0 },
// // //   { date: 7, value: 0 },
// // //   { date: 8, value: 0 },
// // //   {
// // //     date: 9,
// // //     value: 20,
// // //   },
// // // ];

// const jsonData =
//   '[{"date":"2023-04-01T00:00:00.000Z","value":5},{"date":"2023-04-06T00:00:00.000Z","value":8},{"date":"2023-04-07T00:00:00.000Z","value":3},{"date":"2023-04-08T00:00:00.000Z","value":6},{"date":"2023-04-09T00:00:00.000Z","value":7}]';
// const data = JSON.parse(jsonData);
// // console.log(data);
// let minDate = data[0].date;
// let maxDate = data[0].date;

// for (let i = 1; i < data.length; i++) {
//   const currentDate = data[i].date;

//   if (currentDate < minDate) {
//     minDate = currentDate;
//   }

//   if (currentDate > maxDate) {
//     maxDate = currentDate;
//   }
// }

// const currentDate = new Date(minDate);
// const lastDate = new Date(maxDate);

// while (currentDate <= lastDate) {
//   const dateString = currentDate.toISOString();

//   if (!data.some((item) => item.date === dateString)) {
//     data.push({ date: dateString, value: 0 });
//   }

//   currentDate.setDate(currentDate.getDate() + 1);
// }

// // sort the data array by date in ascending order
// data.sort((a, b) => (a.date > b.date ? 1 : -1));

// console.log(data);
