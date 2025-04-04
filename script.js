import { athletesArray } from './athletes.js';

window.onload = () => {
  // generate all dom elements per athletes js
  const body = document.querySelector('body');
  const h1 = document.createElement('h1');
  h1.innerText = "All Strongmen are in their prime. Who's the best?";
  const divSelectionLists = document.createElement('div');
  divSelectionLists.id = 'selection-lists';
  const divAthletes = document.createElement('div');
  divAthletes.id = 'athlete-selection';
  const h2Athletes = document.createElement('h2');
  h2Athletes.innerText = 'Select Athletes';
  const formAthletes = document.createElement('form');
  formAthletes.id = 'athlete-form';
  const buttonEnrollAthletes = document.createElement('button');
  buttonEnrollAthletes.id = 'enroll-athletes';
  buttonEnrollAthletes.type = 'submit';
  buttonEnrollAthletes.classList.add('hidden');
  buttonEnrollAthletes.innerText = 'Enroll Athletes (optional)';

  // List the athletes in alphabetical order
  const alphebatizedAthletesArray = athletesArray.sort(function (a, b) {
    var nameA = a.name;
    var nameB = b.name;
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });

  for (const athlete of alphebatizedAthletesArray) {
    // Bring in all object attributes
    const name = athlete.name;
    const nickname = athlete.nickname;
    const height = athlete.height;
    const weight = athlete.maxBodyweight;
    const maxDeadlift = athlete.bestLifts.deadlift;
    const maxLogLift = athlete.bestLifts.logPress;
    const rating = athlete.peakRating;
    const careerRating = athlete.careerRating;
    const champion = athlete.wins;
    const wsm = champion.worldsStrongestMan;
    const asc = champion.arnoldStrongmanClassic;
    const smoe = champion.strongestManOnEarth;
    const ri = champion.rogueInvitational;
    const wus = champion.worldsUltimateStrongman;
    const ifsa = champion.IFSAStrongmanWorldChampionships;
    const fortissimus = champion.fortissimus;
    const otherComps = champion.otherInternationalComps;
    const comps = [wsm, asc, smoe, ri, wus, ifsa, fortissimus, otherComps];
    const compNames = ['wsm', 'asc', 'smoe', 'ri', 'wus', 'ifsa', 'fortissimus'];

    const div = document.createElement('div');
    div.classList.add('athlete-select');
    const label = document.createElement('label');
    const kebabName = convertToKebabCase(name);
    label.setAttribute('for', kebabName);
    label.innerText = name;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.id = kebabName;
    input.name = 'athlete';
    input.value = name;
    const imgAthlete = document.createElement('img');
    imgAthlete.classList.add('athlete-image');
    imgAthlete.src = `./athlete-images/${kebabName}.png`;

    const infoTooltip = document.createElement('div');
    infoTooltip.classList.add('info-tooltip');
    infoTooltip.innerText = 'ⓘ';
    const infoModal = document.createElement('div');
    infoModal.classList.add('info-modal', 'hidden');
    const exitModal = document.createElement('div');
    exitModal.classList.add('exit-info');
    exitModal.innerText = '✖';

    const athleteInfo = document.createElement('div');
    athleteInfo.classList.add('athlete-info');

    const pName = document.createElement('h3');
    pName.innerText = name;
    athleteInfo.append(pName);
    
    const divWins = document.createElement('div');
    divWins.classList.add('div-wins');

    let compOrder = -1;

    for (const comp of comps) {
      compOrder ++;
      if (comp > 0 && compOrder < 7) {
        for (let i = 0; i < comp; i++) {
          const winsImg = document.createElement('img');
          winsImg.classList.add('champion');
          winsImg.src = `./trophy-images/${compNames[compOrder]}.png`;
          divWins.append(winsImg);
        }
      } else if (comp > 0 && compOrder === 7) {
        const divIntWins = document.createElement('div');
        divIntWins.classList.add('div-int-wins');
        divIntWins.innerText = comp;
        divWins.append(divIntWins);
        }
    }

    athleteInfo.append(divWins);

    if (nickname) {
      const pNickname = document.createElement('p');
      pNickname.innerText = `Nickname: ${nickname}`;
      athleteInfo.append(pNickname);
    }

    if (height) {
      const pHeight = document.createElement('p');
      pHeight.innerText = `Height: ${Math.floor(height / 12)} feet ${height % 12} inches`;
      athleteInfo.append(pHeight);
    }

    if (weight) {
      const pWeight = document.createElement('p');
      pWeight.innerText = `Max Bodyweight: ${weight} pounds`;
      athleteInfo.append(pWeight);
    }

    if (maxDeadlift) {
      const liftsTitle = document.createElement('h3');
      liftsTitle.innerText = 'Best Competition Lifts';
      athleteInfo.append(liftsTitle);
      const pDeadlift = document.createElement('p');
      pDeadlift.innerText = `Max Deadlift: ${maxDeadlift} pounds`;
      athleteInfo.append(pDeadlift);
    }

    if (maxLogLift) {
      const pLogLift = document.createElement('p');
      pLogLift.innerText = `Max Log Lift: ${maxLogLift} pounds`;
      athleteInfo.append(pLogLift);
    }

    if (rating) {
      const ratingTitle = document.createElement('h3');
      ratingTitle.innerText = 'Ratings';
      athleteInfo.append(ratingTitle);
      const pRating = document.createElement('p');
      pRating.innerText = `Peak Rating: ${rating}`;
      athleteInfo.append(pRating);
    }

    if (careerRating) {
      if (careerRating >= 100) {
        const pCareerRating = document.createElement('p');
        pCareerRating.style.color = 'darkred';
        pCareerRating.innerText = `Career Rating: ${careerRating}`;
        athleteInfo.append(pCareerRating);
      } else {
        const pCareerRating = document.createElement('p');
        pCareerRating.innerText = `Career Rating: ${careerRating}`;
        athleteInfo.append(pCareerRating);
      }
    }

    const skillsTitle = document.createElement('h3');
    skillsTitle.innerText = 'Skills';
    athleteInfo.append(skillsTitle);

    // PULLING
    const pullingAvg = document.createElement('p');
    pullingAvg.classList.add('skill');
    const pullingNum = Math.round(
      (athlete.skills.deadliftForMax +
        athlete.skills.deadliftForReps +
        athlete.skills.deadliftLadder +
        athlete.skills.axleDeadliftForReps +
        athlete.skills.hummerTireMaxDeadlift +
        athlete.skills.elephantBarMaxDeadlift +
        athlete.skills.silverDollarDeadliftForReps +
        athlete.skills.armOverArm +
        athlete.skills.powerStairs) /
        9
    );
    pullingAvg.innerText = `Pulling${powerBar(pullingNum, pullingAvg)}`;
    athleteInfo.append(pullingAvg);

    // SQUATTING
    const squattingAvg = document.createElement('p');
    squattingAvg.classList.add('skill');
    const squattingNum = Math.round(
      (athlete.skills.squatForReps +
        athlete.skills.squatForMax +
        athlete.skills.barrelSquat +
        athlete.skills.legPressForReps) /
        4
    );
    squattingAvg.innerText = `Squatting${powerBar(squattingNum, squattingAvg)}`;
    athleteInfo.append(squattingAvg);

    // PRESSING
    const pressingAvg = document.createElement('p');
    pressingAvg.classList.add('skill');
    const pressingNum = Math.round(
      (athlete.skills.axlePressForMax +
        athlete.skills.axlePressForReps +
        athlete.skills.logPressForMax +
        athlete.skills.logPressLadder +
        athlete.skills.logPressForReps +
        athlete.skills.vikingPressForReps +
        athlete.skills.dumbbellPressLadder +
        athlete.skills.dumbbellPressForReps +
        athlete.skills.monsterDumbbellMaxPress +
        athlete.skills.bigJerk +
        athlete.skills.barrelStandingChestPress) /
        11
    );
    pressingAvg.innerText = `Pressing${powerBar(pressingNum, pressingAvg)}`;
    athleteInfo.append(pressingAvg);

    // STONE LIFTING
    const stoneLiftingAvg = document.createElement('p');
    stoneLiftingAvg.classList.add('skill');
    const stoneLiftingNum = Math.round(
      (athlete.skills.atlasStoneRun +
        athlete.skills.manhoodStones +
        athlete.skills.stoneToShoulder +
        athlete.skills.stonePress) /
        4
    );
    stoneLiftingAvg.innerText = `Stone Lifting${powerBar(stoneLiftingNum, stoneLiftingAvg)}`;
    athleteInfo.append(stoneLiftingAvg);

    // MOVING
    const movingAvg = document.createElement('p');
    movingAvg.classList.add('skill');
    const movingNum = Math.round(
      (athlete.skills.frameCarry +
        athlete.skills.farmersWalk +
        athlete.skills.superYoke +
        athlete.skills.truckPull +
        athlete.skills.loadingRace +
        athlete.skills.carryAndDrag +
        athlete.skills.fingalsFingers +
        athlete.skills.tireFlip) /
        8
    );
    movingAvg.innerText = `Moving${powerBar(movingNum, movingAvg)}`;
    athleteInfo.append(movingAvg);

    // THROWING
    const throwingAvg = document.createElement('p');
    throwingAvg.classList.add('skill');
    const throwingNum = Math.round(
      (athlete.skills.kegToss +
        athlete.skills.weightForHeight +
        athlete.skills.steinstossen) /
        3
    );
    throwingAvg.innerText = `Throwing${powerBar(throwingNum, throwingAvg)}`;
    athleteInfo.append(throwingAvg);

    // ENDURANCE
    const enduranceAvg = document.createElement('p');
    enduranceAvg.classList.add('skill');
    const enduranceNum = Math.round(
      (athlete.skills.herculesHold +
        athlete.skills.wheelOfPain +
        athlete.skills.shieldCarry +
        athlete.skills.frontHold +
        athlete.skills.dinnieStoneWalk +
        athlete.skills.conansWheel +
        athlete.skills.wreckingBallHold) /
        7
    );
    enduranceAvg.innerText = `Endurance${powerBar(enduranceNum, enduranceAvg)}`;
    athleteInfo.append(enduranceAvg);

    infoModal.append(exitModal, athleteInfo);

    const infoBackground = document.createElement('div');
    infoBackground.classList.add('info-background', 'hidden');

    div.append(
      label,
      input,
      imgAthlete,
      infoTooltip,
      infoModal,
      infoBackground
    );
    formAthletes.append(div);
  }

  formAthletes.append(buttonEnrollAthletes);
  const divEvents = document.createElement('div');
  divEvents.id = 'event-selection';
  const h2Events = document.createElement('h2');
  h2Events.innerText = 'Select Events';
  const formEvents = document.createElement('form');
  formEvents.id = 'event-form';
  const buttonFinalizeEvents = document.createElement('button');
  buttonFinalizeEvents.id = 'finalize-events';
  buttonFinalizeEvents.type = 'submit';
  buttonFinalizeEvents.classList.add('hidden');
  buttonFinalizeEvents.innerText = 'Finalize Events (optional)';

  const eventIDs = [];

  for (const event in athletesArray[0].skills) {
    eventIDs.push(event);
  }

  for (const event of eventIDs) {
    if (event === 'deadliftForMax') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Pulling';
      h4.id = 'pulling';
      formEvents.append(h4);
    }
    if (event === 'squatForReps') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Squatting';
      h4.id = 'squatting';
      formEvents.append(h4);
    }
    if (event === 'axlePressForMax') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Pressing';
      h4.id = 'pressing';
      formEvents.append(h4);
    }
    if (event === 'atlasStoneRun') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Stone Lifting';
      h4.id = 'stone-lifting';
      formEvents.append(h4);
    }
    if (event === 'frameCarry') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Moving';
      h4.id = 'moving';
      formEvents.append(h4);
    }
    if (event === 'kegToss') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Throwing';
      h4.id = 'throwing';
      formEvents.append(h4);
    }
    if (event === 'herculesHold') {
      const h4 = document.createElement('h4');
      h4.innerText = 'Endurance';
      h4.id = 'endurance';
      formEvents.append(h4);
    }
    const div = document.createElement('div');
    div.classList.add('event-select');
    const label = document.createElement('label');
    label.setAttribute('for', event);
    const titleName = convertToTitleCase(event);
    label.innerText = titleName;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.id = event;
    input.name = 'event';
    input.value = titleName;
    const imgEvent = document.createElement('img');
    imgEvent.classList.add('event-image');
    imgEvent.src = `./event-images/${event}.png`;
    div.append(label, input, imgEvent);
    formEvents.append(div);
  }

  formEvents.append(buttonFinalizeEvents);
  const divResults = document.createElement('div');
  divResults.id = 'result-section';
  const h2Results = document.createElement('h2');
  h2Results.innerText = 'Results';
  const resultsHeader = document.createElement('div');
  resultsHeader.id = 'results-header';
  const divButtons = document.createElement('div');
  divButtons.id = 'buttons';
  const buttonSimulate = document.createElement('button');
  buttonSimulate.id = 'simulate-competition';
  buttonSimulate.type = 'submit';
  buttonSimulate.innerText = 'Start Competition';
  const buttonReset = document.createElement('button');
  buttonReset.id = 'reset-button';
  buttonReset.type = 'submit';
  buttonReset.innerText = 'Reset';
  const pLoading = document.createElement('p');
  pLoading.id = 'temp-load';
  pLoading.innerText = 'Wait for it...';
  pLoading.classList.add('hidden');
  const divDisplayResults = document.createElement('div');
  divDisplayResults.id = 'results';

  divButtons.append(buttonSimulate, buttonReset);

  resultsHeader.append(divButtons);

  divResults.append(h2Results, resultsHeader, pLoading, divDisplayResults);

  divAthletes.append(h2Athletes, formAthletes);
  divEvents.append(h2Events, formEvents);

  divSelectionLists.append(divAthletes, divEvents, divResults);

  body.append(h1, divSelectionLists);

  document
    .getElementById('enroll-athletes')
    .addEventListener('click', addAthletes);
  document
    .getElementById('finalize-events')
    .addEventListener('click', addEvents);
  document
    .getElementById('simulate-competition')
    .addEventListener('click', showResults);
  document.getElementById('reset-button').addEventListener('click', refresh);

  // const currentNavItem = document.querySelectorAll('.nav-item');
  // currentNavItem.forEach((link) => link.addEventListener('focus', makeRed))

  const openModal = document.querySelectorAll('.info-tooltip');
  openModal.forEach((icon) => icon.addEventListener('click', showModal));

  const closeModal = document.querySelectorAll('.exit-info');
  closeModal.forEach((icon) => icon.addEventListener('click', hideModal));

  const clickBackground = document.querySelectorAll('.info-background');
  clickBackground.forEach((background) => background.addEventListener('click', hideModalFromBackground));

  const checkboxLabel = document.querySelectorAll('label');
  checkboxLabel.forEach((label) =>
    label.addEventListener('click', updateEventImage)
  );
};

// const makeRed = (event) => {
//   //event.preventDefault()

//   const navClick = event.target;

//   navClick.classlist.add('red-nav-link');
// }

const showModal = (event) => {
  const openClick = event.target;

  openClick.nextSibling.classList.remove('hidden');
  openClick.nextSibling.nextSibling.classList.remove('hidden');
};

const hideModal = (event) => {
  const closeClick = event.target;

  closeClick.parentElement.classList.add('hidden');
  closeClick.parentElement.nextSibling.classList.add('hidden');
};

const hideModalFromBackground = (event) => {
  const closeClick = event.target;

  closeClick.classList.add('hidden');
  closeClick.previousSibling.classList.add('hidden');
}

const powerBar = (powerLevel, changeColor) => {
  if (powerLevel === -1 || powerLevel === 0) {
    //changeColor.style.color = '#FF0000';
    return ': ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 1) {
    //changeColor.style.color = '#FF0000';
    return ': █ ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 2) {
    //changeColor.style.color = '#FF0000';
    return ': █ █ ▁ ▁ ▁ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 3) {
    //changeColor.style.color = '#FA8072';
    return ': █ █ █ ▁ ▁ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 4) {
    //changeColor.style.color = '#FF7256';
    return ': █ █ █ █ ▁ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 5) {
    //changeColor.style.color = '#FF4500';
    return ': █ █ █ █ █ ▁ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 6) {
    //changeColor.style.color = '#FFA500';
    return ': █ █ █ █ █ █ ▁ ▁ ▁ ▁';
  } else if (powerLevel === 7) {
    //changeColor.style.color = '#FFA500';
    return ': █ █ █ █ █ █ █ ▁ ▁ ▁';
  } else if (powerLevel === 8) {
    //changeColor.style.color = '#FFFF00';
    return ': █ █ █ █ █ █ █ █ ▁ ▁';
  } else if (powerLevel === 9) {
    //changeColor.style.color = '#ADFF2F';
    return ': █ █ █ █ █ █ █ █ █ ▁';
  } else if (powerLevel === 10) {
    //changeColor.style.color = '#808000';
    return ': █ █ █ █ █ █ █ █ █ █';
  } else if (powerLevel === 11) {
    changeColor.style.color = 'darkred';
    return ' (OP): █ █ █ █ █ █ █ █ █ █';
  }
};

const updateEventImage = (event) => {
  const checkClick = event.target;
  if (checkClick.nextSibling.checked) {
    checkClick.style.border = 'none';
  } else {
    checkClick.style.border = 'solid';
    checkClick.style.borderColor = 'red';
    checkClick.style.borderWidth = '4px';
  }
};

const addAthletes = () => {
  event.preventDefault();

  const athleteForm = document.getElementById('athlete-form');

  const athleteFormData = new FormData(athleteForm);
  const values = [...athleteFormData.entries()];

  const output = document.getElementById('athletes-enrolled');
  output.innerHTML = '';

  if (values.length !== 0) {
    const enrollList = document.createElement('h2');
    enrollList.innerText = 'Enrolled Athletes';
    output.append(enrollList);

    for (const [, value] of athleteFormData) {
      const p = document.createElement('p');
      p.textContent = `${value}`;
      output.append(p);
    }
  }
};

const addEvents = () => {
  event.preventDefault();

  const eventForm = document.getElementById('event-form');

  const eventFormData = new FormData(eventForm);
  const values = [...eventFormData.entries()];

  const output = document.getElementById('events-added');
  output.innerHTML = '';

  if (values.length !== 0) {
    const enrollList = document.createElement('h2');
    enrollList.innerText = 'Competition Events';
    output.append(enrollList);

    for (const [, value] of eventFormData) {
      const p = document.createElement('p');
      p.textContent = `${value}`;
      output.append(p);
    }
  }
};

const showResults = () => {
  event.preventDefault();
  window.scrollTo(0, 0);

  //PULL DATA FROM ATHLETES FORM
  const athleteForm = document.getElementById('athlete-form');
  const athleteFormData = new FormData(athleteForm);
  const arrayOfAthleteArrays = [...athleteFormData.entries()];

  // ATHLETES ARRAY
  const athletes = [];

  for (const array of arrayOfAthleteArrays) {
    athletes.push(array[1]);
  }

  if (athletes[0] === undefined) {
    return console.error('Error: Athlete input required.');
  }

  // PULL DATA FROM EVENTS FORM
  const eventForm = document.getElementById('event-form');

  const eventFormData = new FormData(eventForm);
  const arrayOfEventArrays = [...eventFormData.entries()];

  function camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (event, index) {
        return index === 0 ? event.toLowerCase() : event.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  // EVENTS & EVENTS_ID ARRAY
  const events = [];
  const eventIDs = [];

  for (const array of arrayOfEventArrays) {
    events.push(array[1]);
    eventIDs.push(camelize(array[1]));
  }

  if (events[0] === undefined) {
    return console.error('Error: Event input required.');
  }

  // REMOVE UNNECESSARY PARTS OF THE PAGE
  document.getElementById('athlete-selection').style.visibility = 'hidden';
  document.getElementById('athlete-selection').style.position = 'absolute';
  document.getElementById('event-selection').style.visibility = 'hidden';
  document.getElementById('event-selection').style.position = 'absolute';
  document.getElementById('simulate-competition').innerText = 'Retry';

  // SELECT DIV IN WHICH TO PUT ALL RESULTS
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (document.getElementById('comp-details')) {
    document.getElementById('comp-details').remove();
  }

  const resultsHeader = document.getElementById('results-header');

  // SHOW COMP DETAILS AT TOP OF RESULTS
  const divCompDetails = document.createElement('div');
  divCompDetails.id = 'comp-details';

  const divAthleteList = document.createElement('div');
  const divEventList = document.createElement('div');
  const ulAthletes = document.createElement('ul');
  const h3AthletesList = document.createElement('h3');
  h3AthletesList.innerText = 'Athletes';
  const olEvents = document.createElement('ol');
  const h3EventsList = document.createElement('h3');
  h3EventsList.innerText = 'Events';

  for (const athlete of athletes) {
    const li = document.createElement('li');
    li.innerText = athlete;
    ulAthletes.append(li);
  }

  for (const event of events) {
    const li = document.createElement('li');
    li.innerText = event;
    olEvents.append(li);
  }

  divAthleteList.append(h3AthletesList, ulAthletes);
  divEventList.append(h3EventsList, olEvents);

  divCompDetails.append(divAthleteList, divEventList);

  resultsHeader.append(divCompDetails);

  // CREATE REQUIRED CONTAINERS FOR ALL EVENTS
  for (const event in events) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-result-tile');
    resultsContainer.append(eventDiv);
  }

  // TRACK EVENT NUMBER IN eventIDs ARRAY
  let currentEventID = 0;

  // CREATE AN ARRAY IN WHICH TO STORE ALL EVENT RESULTS
  const totalResults = [];

  // SIMULATE EACH EVENT
  // POPULATE CORRESPONDING CONTAINERS ON THE DOM
  for (const [i, event] of events.entries()) {
    const h3 = document.createElement('h3');
    h3.innerText = `Event ${i + 1}: ${event}`;
    const img = document.createElement('img');
    img.classList.add('comp-event-img');
    const img_str = convertToCamelCase(event);
    img.src = `./event-images/${img_str}.png`
    const div = document.querySelector(
      `.event-result-tile:nth-of-type(${i + 1})`
    );

    // HIDDEN CLASS TO ALL EVENT DIVS
    div.style.visibility = 'hidden';
    div.classList.add('to-show');

    div.append(img, h3);

    // INDIVIDUAL EVENT RESULTS
    const athleteOrderArr = [];

    // INDIVIDUAL ATHLETE OBJECT TEMPLATE
    const person = {
      name: 'john',
      performance: 5,
    };

    // SET EACH ATHLETE IN THE EVENT'S NAME & EVENT SCORE
    for (const [, athlete] of athletes.entries()) {
      const performer = Object.create(person);
      performer.name = athlete;

      for (const person of athletesArray) {
        if (person.name === athlete) {
          const perfOptimal = person.skills[`${eventIDs[currentEventID]}`];

          // RANDOMNESS DUE TO OFF-DAY, HEALTH ISSUE
          // 5/8 likelihood of peak performance,
          // 2/8 likelihood of slightly off,
          // 1/8 likelihood of significantly off
          const inconsistency = [0, 0, 0, 0, 0, 1, 1, 2];
          const perfOnDay = inconsistency[Math.floor(Math.random() * 8)];

          const perfAdjusted = perfOptimal - perfOnDay;

          // Tie breaker if multiple athletes are comparably skilled
          let adjustedOutcome = perfAdjusted * ((Math.random() + 1000) / 1000);

          /*
          // SLIGHT BOOST FOR THOSE WITH LONG DOMINANT CAREERS
          if (person.careerDominanceRating > 100) {
            adjustedOutcome *= (person.careerDominanceRating / 4 + 75) / 100;
          }
          */
          performer.performance = adjustedOutcome;
        }
      }

      // ADD EACH ATHLETE OBJECT TO AN EVENT RESULTS ARRAY
      athleteOrderArr.push(performer);
    }

    // SORT THE ARRAY BY PERFORMANCE
    athleteOrderArr.sort((a, b) => b.performance - a.performance);

    // PUSH INDIVIDUAL EVENT RESULTS TO THE TotalResults ARRAY
    totalResults.push(athleteOrderArr);

    // PRINT EVENT RESULTS TO THE DOM
    const ol = document.createElement('ol');

    for (const [i, athlete] of athleteOrderArr.entries()) {
      const liResult = document.createElement('li');
      liResult.innerText = `${athlete.name} (${athletes.length - i} points)`;

      ol.append(liResult);
    }
    div.append(ol);

    // LOOP BACK UP TO THE NEXT EVENT AND SIMULATE IT
    currentEventID++;
  }

  // SORT ATHLETES IN DESC ORDER BY HIGHEST SCORE
  for (const event of totalResults) {
    event.sort((a, b) => b.performance - a.performance);
  }

  // CONVERST totalResults ARRAY TO EVENT SCORES RATHER THAN SKILL POINT TOTALS
  for (const event of totalResults) {
    for (const athlete of event) {
      athlete.performance = event.length - event.indexOf(athlete);
    }
  }

  // SUM UP EACH ATHLETE'S TOTAL POINTS
  const calcResults = totalResults.flat(1);

  const athleteTotals = calcResults.reduce((accumulator, current) => {
    const existing = accumulator.find((item) => item.name === current.name);
    if (existing) {
      existing.performance += current.performance;
    } else {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  athleteTotals.sort((a, b) => b.performance - a.performance);

  const divResult = document.createElement('div');
  divResult.id = 'result-container';
  // HIDDEN CLASS TO OVERALL RESULTS
  divResult.style.visibility = 'hidden';
  divResult.classList.add('event-result-tile', 'to-show');
  const h3Total = document.createElement('h3');
  h3Total.innerText = 'Overall Leaderboard';
  const olTotal = document.createElement('ol');
  let k = 0;

  const divPodium = document.createElement('div');
  divPodium.id = 'div-podium';

  for (const total in athleteTotals) {
    console.log(athleteTotals);
    k += 1;
    const liTotal = document.createElement('li');
    liTotal.classList.add('leaderboard');
    liTotal.innerText = `${athleteTotals[total].name} (${athleteTotals[total].performance} points)`;

    if (k <= 3 && athleteTotals.length >= 3) {
      const podiumAthlete = document.createElement('img');
      podiumAthlete.classList.add('podium-image');
      podiumAthlete.id = `podium-image${k}`;
      const podiumName = convertToKebabCase(athleteTotals[total].name);
      podiumAthlete.src = `./athlete-images/${podiumName}.png`;
      divPodium.append(podiumAthlete);
    }

    olTotal.append(liTotal);
    h3Total.append(divPodium);
  }

  divResult.append(h3Total, olTotal);

  resultsContainer.append(divResult);

  unHide();
};

// CONVERT WORDS TO USABLE FORMAT

const convertToKebabCase = (string) => {
  return string

    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const convertToTitleCase = (string) => {
  return string
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
};

const convertToCamelCase = (string) => {
  return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

// EVENT RESULTS ARE DISPLAYED GRADUALLY
const unHide = () => {
  const pLoading = document.getElementById('temp-load');
  pLoading.classList.remove('hidden');

  const divHidden = document.getElementsByClassName('to-show');

  const divFilter = Array.prototype.filter.call(
    divHidden,
    (divHidden) => divHidden.nodeName === 'DIV'
  );

  for (let i = 0; i < divFilter.length; i++) {
    setTimeout(
      () => {
        if (pLoading) {
          pLoading.classList.add('hidden');
        }
        divFilter[i].style.visibility = 'visible';
      },
      1000 * i + 1000
    );
  }
};

const refresh = () => {
  location.reload();
};
