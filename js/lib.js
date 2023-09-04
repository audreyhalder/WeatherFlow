function cleaner(data){
    let newData = [];
    let i = 0;
    for(let j=0; j<data.length; j++){
        if(data[j].join('').trim()==="") continue;
        newData[i] = data[j];
        i++;
    }

    return newData;
}

function csvJSON(csv){

    let lines=csv.split("\n");
    let result = [];

    for(let i=0;i<lines.length;i++){
        let line = lines[i].split(';');

        for(let j=0; j<line.length; j++){
            try{
                result[j].push(line[j]);
            }catch(e){
                result[j]=[line[j]];
            }
        }
    }

    result.pop(); // remove \r
    result.pop(); // remove ,

    return result;
  }

  function numberConverter(num){

      if (num == "") return 0;

      try {
        let numberArr = num.split('');
        if(numberArr[numberArr.length - 1] === '+' || numberArr[numberArr.length - 1] === '-'){
            numberArr.pop();
        }
  
        let newNumber = numberArr.join('');
        return Number(Number(newNumber.replace(',', '.') ? newNumber.replace(',', '.') : newNumber).toFixed(2));
          
      } catch (error) {
          return num;
      }
  }

  function responsive(desktop, phone){
      if(window.screen.width > 756) return desktop;
      return phone;
  }

  function dateCleaner(date, isTimeExcluded){
        let dateTimeArr = date.split(' ');
        let dateArr = dateTimeArr[0].split('.');
        let newDate = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
        let time = dateTimeArr[1] + ':00';

        if(!isTimeExcluded) return newDate + ' ' + time;
        return newDate;
  }

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    date.setHours(24);
    return date;
}
