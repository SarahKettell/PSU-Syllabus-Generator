// Schedule class

// Schedule Formatting
// [Month] [Day] - [Month] [Day], [Year]
//  Start Date to End Date of THAT week
// Monday to Friday of the WEEK
// should use only monday to friday but need to use the start date and end date as the actually 
// start and end date

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class SyllabusSchedule {

    constructor(start, end) {
        this.start = start;
        this.end = end;
        //this.length = length;

        this.schedule = [];

        this.start_date = new Date(start);
        this.end_date = new Date(end);

        this.length = this.setLength();
    }

    // dynamically set length
    setLength() {
        
        var diff = (this.end_date.getTime() - this.start_date.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);

        return Math.abs(Math.round(diff)) + 2; // add 2 because of first and last week
    }

    addDate(date1, date2) {
        // Month Date - Month Date, Year
        const s_week = months[date1.getUTCMonth()] + " " + date1.getUTCDate();
        const e_week = months[date2.getUTCMonth()] + " " + date2.getUTCDate() + ", " + date2.getUTCFullYear();
        
        // entry for a week
        let entry = {
            entry_key: this.schedule.length + 1,
            week: s_week + " - " + e_week
        }
        this.schedule.push(entry);
    }
    // loops until date is sunday
    toSunday(date) {
        while(days[date.getUTCDay()] !== "Sunday") {
            date.setDate(date.getDate() + 1);
        }
    }

    // loops until date is monday
    toMonday(date) {
        while(days[date.getUTCDay()] !== "Monday") {
            date.setDate(date.getDate() + 1);
        }
    }

    // returns an array of week objects
    generateSchedule() {

        console.log(this.start, this.end);

        var temp1;
        var temp2;

        // first week
        temp1 = new Date(this.start_date);
        temp2 = new Date(this.start_date);
        this.toSunday(temp2);
        this.addDate(temp1, temp2);

        //console.log(schedule);
        for(let i = 0; i < this.length - 3; i++) {
            temp1 = new Date(temp2);
            this.toMonday(temp1);
            temp2 = new Date(temp1);
            this.toSunday(temp2);
            this.addDate(temp1, temp2);
        }

        // last week
        temp1 = new Date(temp2);
        this.toMonday(temp1);
        temp2 = new Date(this.end_date);
        this.addDate(temp1, temp2);
    }
}

//let test = new SyllabusSchedule("2021-01-19", "2021-04-30");
// console.log(test.setLength());

export default SyllabusSchedule;
