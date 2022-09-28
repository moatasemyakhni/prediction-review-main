/*
    Author: @HadiKhai
    Date: 2022-09-27
    Description: This script is used to compare the performance of different ways to fetch data asynchronously
    from the server.

    All Approaches: Trigger all approaches at the same time

    First Approach: All render at the same time using sequential await statements

    Second Approach: All render at the same time using Promise.all

    Third Approach: First Called Method appears first using sequential await statements

    Fourth Approach: Shortest req time appears first without await statements
 */

const predictionFormAll = document.querySelector("#predictionFormAll");
const predictionButtonAll = document.querySelector("#predictionButtonAll");
const nameInputAll = document.querySelector('#nameInputAll');

const predictionForm1 = document.querySelector("#predictionForm1");
const predictionButton1 = document.querySelector("#predictionButton1");
const resultsContainer1 = document.querySelector('#resultsContainer1');
const nameInput1 = document.querySelector('#nameInput1');

const predictionForm2 = document.querySelector("#predictionForm2");
const predictionButton2 = document.querySelector("#predictionButton2");
const resultsContainer2 = document.querySelector('#resultsContainer2');
const nameInput2 = document.querySelector('#nameInput2');

const predictionForm3 = document.querySelector("#predictionForm3");
const predictionButton3 = document.querySelector("#predictionButton3");
const resultsContainer3 = document.querySelector('#resultsContainer3');
const nameInput3 = document.querySelector('#nameInput3');

const predictionForm4 = document.querySelector("#predictionForm4");
const predictionButton4 = document.querySelector("#predictionButton4");
const resultsContainer4 = document.querySelector('#resultsContainer4');
const nameInput4 = document.querySelector('#nameInput4');

const dogContainer = document.querySelector('.dogPhotoContainer');

window.onload = async () => {
    const dogImage = await getRandomDogImageReq();
    dogContainer.innerHTML = `<img src="${dogImage.data.message}" alt="dog" class="dogPhoto">`;
}

const drawResults = (title, data) => {
    let result = document.createElement('div');
    result.classList.add('result');
    result.innerHTML = `
        <div class="prediction-result">
            <h3 class="prediction-result-title">${title}</h3>
            ${
                Array.isArray(data) ?
                    `<div class="prediction-multiple-result-value">${data.map((item) => `<p class="prediction-result-value">${item}</p>`).join('')}</div>` :
                    `<p class="prediction-result-value">${data}</p>`
            }
        </div>
        `;
    return result
}

const addElementToParent = (element, parent) => {
    parent.appendChild(element);
}


// First Approach: All render at the same time using sequential await statements
const firstApproach = async () => {
    predictionButton1.disabled = true;

    resultsContainer1.innerHTML = '';

    let name = nameInput1.value;

    const startTotalTime = performance.now();

    const {data: age, time: ageReqTime} = await getAgeFromNameReq(name);
    const {data: gender, time: genderReqTime} = await getGenderFromNameReq(name);
    const {data: nationality, time: nationalityReqTime} = await getNationalityFromNameReq(name);

    const endTotalTime = performance.now();

    // access dom and append age gender nationality
    const ageElement = drawResults('Age', age.age + " years old");
    addElementToParent(ageElement, resultsContainer1);

    const genderElement = drawResults('Gender', gender.gender.toUpperCase());
    addElementToParent(genderElement, resultsContainer1);

    const nationalityElement = drawResults('Nationality', nationality.country.map((v) => `${v.country_id}: ${parseFloat(v.probability)*100}%`));
    addElementToParent(nationalityElement, resultsContainer1);

    const endDisplayTime = performance.now();

    const totalTime = endTotalTime - startTotalTime;
    const totalToDisplayTime = endDisplayTime - startTotalTime;

    const totalToDisplayTimeElement = drawResults('Total Display Took:', `${totalToDisplayTime.toFixed(2)} milliseconds`);
    addElementToParent(totalToDisplayTimeElement, resultsContainer1);

    const totalTimeElement = drawResults('Total Req Took:', `${totalTime.toFixed(2)} milliseconds`);
    addElementToParent(totalTimeElement, resultsContainer1);

    const ageReqTimeElement = drawResults('Age Took:', `${ageReqTime.toFixed(2)} milliseconds`);
    addElementToParent(ageReqTimeElement, resultsContainer1);

    const genderReqTimeElement = drawResults('Gender Took:', `${genderReqTime.toFixed(2)} milliseconds`);
    addElementToParent(genderReqTimeElement, resultsContainer1);

    const nationalityReqTimeElement = drawResults('Nationality Took:', `${nationalityReqTime.toFixed(2)} milliseconds`);
    addElementToParent(nationalityReqTimeElement,resultsContainer1)

    predictionButton1.disabled = false;

}

// Second Approach: All render at the same time using Promise.all
const secondApproach = async () => {

    predictionButton2.disabled = true;

    resultsContainer2.innerHTML = '';

    let name = nameInput2.value;

    const startTotalTime = performance.now();

    const res = await Promise.all([
        getAgeFromNameReq(name),
        getGenderFromNameReq(name),
        getNationalityFromNameReq(name)
    ]);

    const [{data: age, time: ageReqTime},{data: gender, time: genderReqTime},{data: nationality, time: nationalityReqTime}] = res;

    const endTotalTime = performance.now();

    // access dom and append age gender nationality
    const ageElement = drawResults('Age', age.age + " years old");
    addElementToParent(ageElement, resultsContainer2);

    const genderElement = drawResults('Gender', gender.gender.toUpperCase());
    addElementToParent(genderElement, resultsContainer2);

    const nationalityElement = drawResults('Nationality', nationality.country.map((v) => `${v.country_id}: ${parseFloat(v.probability)*100}%`));
    addElementToParent(nationalityElement, resultsContainer2);

    const endDisplayTime = performance.now();

    const totalTime = endTotalTime - startTotalTime;
    const totalToDisplayTime = endDisplayTime - startTotalTime;

    const totalToDisplayTimeElement = drawResults('Total Display Took:', `${totalToDisplayTime.toFixed(2)} milliseconds`);
    addElementToParent(totalToDisplayTimeElement, resultsContainer2);

    const totalTimeElement = drawResults('Total Req Took:', `${totalTime.toFixed(2)} milliseconds`);
    addElementToParent(totalTimeElement, resultsContainer2);

    const ageReqTimeElement = drawResults('Age Took:', `${ageReqTime.toFixed(2)} milliseconds`);
    addElementToParent(ageReqTimeElement, resultsContainer2);

    const genderReqTimeElement = drawResults('Gender Took:', `${genderReqTime.toFixed(2)} milliseconds`);
    addElementToParent(genderReqTimeElement, resultsContainer2);

    const nationalityReqTimeElement = drawResults('Nationality Took:', `${nationalityReqTime.toFixed(2)} milliseconds`);
    addElementToParent(nationalityReqTimeElement,resultsContainer2)

    predictionButton2.disabled = false;

}


// Third Approach: First Called Method appears first using sequential await statements
const thirdApproach = async () => {

    predictionButton3.disabled = true;

    resultsContainer3.innerHTML = '';

    let name = nameInput3.value;

    const startTotalTime = performance.now();

    // access dom and append age gender nationality
    const {data: age, time: ageReqTime} = await getAgeFromNameReq(name);
    const ageElement = drawResults('Age', age.age + " years old");
    addElementToParent(ageElement, resultsContainer3);

    const {data: gender, time: genderReqTime} = await getGenderFromNameReq(name);
    const genderElement = drawResults('Gender', gender.gender.toUpperCase());
    addElementToParent(genderElement, resultsContainer3);

    const {data: nationality, time: nationalityReqTime} = await getNationalityFromNameReq(name);
    const nationalityElement = drawResults('Nationality', nationality.country.map((v) => `${v.country_id}: ${parseFloat(v.probability)*100}%`));
    addElementToParent(nationalityElement, resultsContainer3);
    const endTotalTime = performance.now();
    const endDisplayTime = performance.now();

    const totalTime = endTotalTime - startTotalTime;
    const totalToDisplayTime = endDisplayTime - startTotalTime;

    const totalToDisplayTimeElement = drawResults('Total Display Took:', `${totalToDisplayTime.toFixed(2)} milliseconds`);
    addElementToParent(totalToDisplayTimeElement, resultsContainer3);

    const totalTimeElement = drawResults('Total Req Took:', `${totalTime.toFixed(2)} milliseconds`);
    addElementToParent(totalTimeElement, resultsContainer3);

    const ageReqTimeElement = drawResults('Age Took:', `${ageReqTime.toFixed(2)} milliseconds`);
    addElementToParent(ageReqTimeElement, resultsContainer3);

    const genderReqTimeElement = drawResults('Gender Took:', `${genderReqTime.toFixed(2)} milliseconds`);
    addElementToParent(genderReqTimeElement, resultsContainer3);

    const nationalityReqTimeElement = drawResults('Nationality Took:', `${nationalityReqTime.toFixed(2)} milliseconds`);
    addElementToParent(nationalityReqTimeElement,resultsContainer3)

    predictionButton3.disabled = false;

}


// Fourth Approach: Shortest req time appears first without await statements
const fourthApproach = async () => {

    predictionButton4.disabled = true;

    resultsContainer4.innerHTML = '';

    let name = nameInput4.value;

    const startTotalTime = performance.now();
        // const {data: age, time: ageReqTime} = getAgeFromNameReq(name);
        // const {data: gender, time: genderReqTime} = getGenderFromNameReq(name);
        // const {data: nationality, time: nationalityReqTime} = getNationalityFromNameReq(name);

        const res = await Promise.all([
            getAgeFromNameReq(name),
            getGenderFromNameReq(name),
            getNationalityFromNameReq(name)
        ]);
    
        const [{data: age, time: ageReqTime},{data: gender, time: genderReqTime},{data: nationality, time: nationalityReqTime}] = res;
    

    // access dom and append age gender nationality
    const ageElement = drawResults('Age', age.age + " years old");
    addElementToParent(ageElement, resultsContainer4);
    const genderElement = drawResults('Gender', gender.gender.toUpperCase());
    addElementToParent(genderElement, resultsContainer4);
    const nationalityElement = drawResults('Nationality', nationality.country.map((v) => `${v.country_id}: ${parseFloat(v.probability)*100}%`));
    addElementToParent(nationalityElement, resultsContainer4);


    const endTotalTime = performance.now();
    const endDisplayTime = performance.now();

    const totalTime = endTotalTime - startTotalTime;
    const totalToDisplayTime = endDisplayTime - startTotalTime;

    const totalToDisplayTimeElement = drawResults('Total Display Took:', `${totalToDisplayTime.toFixed(2)} milliseconds`);
    addElementToParent(totalToDisplayTimeElement, resultsContainer4);

    const totalTimeElement = drawResults('Total Req Took:', `${totalTime.toFixed(2)} milliseconds`);
    addElementToParent(totalTimeElement, resultsContainer4);

    const ageReqTimeElement = drawResults('Age Took:', `${ageReqTime.toFixed(2)} milliseconds`);
    addElementToParent(ageReqTimeElement, resultsContainer4);

    const genderReqTimeElement = drawResults('Gender Took:', `${genderReqTime.toFixed(2)} milliseconds`);
    addElementToParent(genderReqTimeElement, resultsContainer4);

    const nationalityReqTimeElement = drawResults('Nationality Took:', `${nationalityReqTime.toFixed(2)} milliseconds`);
    addElementToParent(nationalityReqTimeElement,resultsContainer4)

    predictionButton4.disabled = false;

}


// All at the same time
predictionFormAll.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = nameInputAll.value;

    nameInput1.value= name;
    nameInput2.value= name;
    nameInput3.value= name;
    nameInput4.value= name;

    predictionButtonAll.disabled = true;

    await firstApproach()
    await secondApproach()
    await thirdApproach()
    await fourthApproach()

    predictionButtonAll.disabled = false;

})

// Approach 1
predictionForm1.addEventListener("submit", async (e) => {

    e.preventDefault();

    await firstApproach();

})


// Approach 2
predictionForm2.addEventListener("submit", async (e) => {

    e.preventDefault();

    await secondApproach();

})


// Approach 3
predictionForm3.addEventListener("submit", async (e) => {

    e.preventDefault();

    await thirdApproach();

})


// Approach 4
predictionForm4.addEventListener("submit", async (e) => {

    e.preventDefault();

    await fourthApproach();

})