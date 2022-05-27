const showHoroscope = () => {
    const month = document.getElementById('months');
    const day = document.getElementById('days');
    const monthValue = month.options[month.selectedIndex].value;
    const dayValue = day.options[day.selectedIndex].value;

    console.log(findZodiac(monthValue, dayValue));
    let zodiac = findZodiac(monthValue, dayValue);
    let zodiacData = zodiacApi(zodiac);
  
    let hexColor = getHexColor(zodiacData);
    
    
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

const getHexColor = async (colorName)=>{
    const url = `https://api.color.pizza/v1/names/?name=${colorName}`;
    await fetch(url, {
        method: 'POST',
       // body: JSON.stringify(data)

    })
    .then(res => res.json())
    .then(data => {
        //let newData= JSON.stringify(data)
        console.log(data.colors);
        for (i in data.colors){
            //console.log(data.colors[i].name);
            if (data.colors[i].name==colorName){
                console.log(data.colors[i].hex)
                return data.colors[i].hex;
            }
        }
    });
}


const zodiacApi = (zodiac) => {
    const url = `https://aztro.sameerkumar.website?sign=${zodiac}&day=today`;
    fetch(url, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        const zodiacInfo = data;
        let hex = getHexColor(data.color);
        let zodiacData =[ data,  hex]
        return zodiacData;
    });
};

const renderHoroscope = () => {
    
}