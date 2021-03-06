const showHoroscope = () => {
    const month = document.getElementById('months');
    const day = document.getElementById('days');
    const monthValue = month.options[month.selectedIndex].value;
    const dayValue = day.options[day.selectedIndex].value;

    console.log("User Zodiac Sign: " + findZodiac(monthValue, dayValue)); //returns user zodiac sign
    let zodiac = findZodiac(monthValue, dayValue);
    zodiacApi(zodiac);
};

let submitBtn = document.getElementById('submitButton');
submitBtn.addEventListener('click', () => {
    showHoroscope();
});

const findZodiac = (month, day) => {
    let zodiacSign = "";

    if (month === "December") {        
        if (day < 22) {
        zodiacSign = "Sagittarius";
        } else { 
        zodiacSign = "Capricorn";
        }
    }

    else if (month === "January") {
        if (day < 20) {
        zodiacSign = "Capricorn";
        } else {
        zodiacSign = "Aquarius";
        }
    }
           
    else if (month === "February") {
        if (day < 19) {
        zodiacSign = "Aquarius";
        } else {
        zodiacSign = "Pisces";
        }
    }
           
    else if(month === "March") {
        if (day < 21) {
        zodiacSign = "Pisces";
        } else {
        zodiacSign = "Aries";
        }
    }

    else if (month === "April") {
        if (day < 21) {
        zodiacSign = "Aries";
        } else {
        zodiacSign = "Taurus";
        }
    }
           
    else if (month === "May") {
        if (day < 21) {
        zodiacSign = "Taurus";
        } else {
        zodiacSign = "Gemini";
        }
    }
           
    else if( month === "June") {
        if (day < 22) {
        zodiacSign = "Gemini";
        } else {
        zodiacSign = "Cancer";
        }
    }
           
    else if (month === "July") {
        if (day < 23) {
        zodiacSign = "Cancer";
        } else {
        zodiacSign = "Leo";
        }
    }
           
    else if( month === "August") {
        if (day < 23) {
        zodiacSign = "Leo";
        } else {
        zodiacSign = "Virgo";
        }
    }
           
    else if (month === "September") {
        if (day < 23) {
        zodiacSign = "Virgo";
        } else {
        zodiacSign = "Libra";
        }
    }
           
    else if (month === "October") {
        if (day < 23) {
        zodiacSign = "Libra";
        } else {
        zodiacSign = "Scorpio";
        }
    }
           
    else if (month === "November") {
        if (day < 23) {
        zodiacSign = "Scorpio";
        } else {
        zodiacSign = "Sagittarius";
        }
    }
    return zodiacSign;
};

const getHexColor = (colorName, usercomp)=>{
    const url = `https://api.color.pizza/v1/names/?name=${colorName}`;
    fetch(url, {
        method: 'GET',

    })
    .then(res => res.json())
    .then(data => {
        let bcFlag;
        for (i in data.colors){
            if (data.colors[i].name==colorName){
                // Returns specific hex code for color
                // console.log(data.colors[i].hex)
                document.getElementById(usercomp).style.backgroundColor = data.colors[i].hex;
                 bcFlag=true;
                 break; //return data.colors[i].hex;
            }
        }
        if (bcFlag!=true){
            document.getElementById(usercomp).style.backgroundColor = data.colors[0].hex;
        }
    });
};

const zodiacApi = (zodiac) => {
    const url = `https://aztro.sameerkumar.website?sign=${zodiac}&day=today`;
    fetch(url, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        getHexColor(data.color, "b1"); //returns hex code for user color
        let userHoroscope = renderUserHoroscope(data);
        document.getElementById('left').innerHTML = `<h2>Zodiac Sign: ${zodiac}</h2>` + userHoroscope;

        console.log("Comp Zodiac: " + data.compatibility); //returns compatibile zodiac sign
        let compZodiac = data.compatibility;
        fetch (`https://aztro.sameerkumar.website?sign=${compZodiac}&day=today`, { //fetch API for comp zodiac info
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            let compHoroscope = renderCompHoroscope(data);
            document.getElementById('right').innerHTML = `<h2>Compatible Sign: ${compZodiac}</h2>` + compHoroscope;
        })
    });
};

const renderUserHoroscope = (data) => {
    let info = data ;
    let {description, date_range, color, mood, lucky_number, compatibility} = info;
    return `<div class="zodiacInfo">
                <div><strong>Date Range:</strong> ${date_range}</div>
                <div><strong>Compatibility:</strong> ${compatibility}</div>
                <div><strong>Mood:</strong> ${mood}</div>
                <div><strong>Color:</strong> ${color}</div>
                <div><strong>Lucky Number:</strong> ${lucky_number}</div>
                <br>
                <div style="text-align:center">"${description}"</div>
            </div>`
};

const renderCompHoroscope = (data) => {
    let compInfo = data;
    let {description, date_range, color, mood, lucky_number} = compInfo;
    return `<div class="zodiacInfo">
                <div><strong>Date Range:</strong> ${date_range}</div>
                <div><strong>Mood:</strong> ${mood}</div>
                <div><strong>Color:</strong> ${color}</div>
                <div><strong>Lucky Number:</strong> ${lucky_number}</div>
                <br>
                <div style="text-align:center">"${description}"</div>
            </div>`
};