/*
 * created by Sarah Blankespoor on 10/17/17
 */

var currentGrade = 0;

function reset() {
    document.getElementById("weightAddToHundred").innerHTML = "";
    document.getElementById("currentGrade").innerHTML = "";
    document.getElementById("badDataMessage").innerHTML = "";
    document.getElementById("calculateFinalButton").innerHTML = "";
    document.getElementById("enterFinalDesired").innerHTML = "";
    document.getElementById("badFinalWeightMessage").innerHTML = "";
    document.getElementById("badFinalDataMessage").innerHTML = "";
    document.getElementById("finalGradeNeeded").innerHTML = "";
    document.getElementById("newGrade").innerHTML = "";
    document.getElementById("test").style.backgroundColor = "";
    document.getElementById("quiz").style.backgroundColor = "";
    document.getElementById("hw").style.backgroundColor = "";
    document.getElementById("midterm").style.backgroundColor = "";
}

function calculateCurrentGrade() {
    var testGrade = getGradeForCategory("test");
    var testWeight = parseInt(document.getElementById("testWeight").value);
    var testScore = (testGrade / testWeight) * 100;
    var quizGrade = getGradeForCategory("quiz");
    var quizWeight = parseInt(document.getElementById("quizWeight").value);
    var quizScore = (quizGrade / quizWeight) * 100;
    var hwGrade = getGradeForCategory("hw");
    var hwWeight = parseInt(document.getElementById("hwWeight").value);
    var hwScore =  (hwGrade / hwWeight) * 100;
    var midtermGrade = getGradeForCategory("midterm");
    var midtermWeight = parseInt(document.getElementById("midtermWeight").value);
    var midtermScore = (midtermGrade / midtermWeight) * 100;

    currentGrade = testGrade + quizGrade + hwGrade + midtermGrade;

    var testColor = getStudentGradeColor(testScore);
    var quizColor = getStudentGradeColor(quizScore);
    var hwColor = getStudentGradeColor(hwScore);
    var midtermColor = getStudentGradeColor(midtermScore);
    document.getElementById("test").style.backgroundColor = "" + testColor + "";
    document.getElementById("quiz").style.backgroundColor = "" + quizColor + "";
    document.getElementById("hw").style.backgroundColor = "" + hwColor + "";
    document.getElementById("midterm").style.backgroundColor = "" + midtermColor + "";

    var totalPercent = testWeight + quizWeight + hwWeight + midtermWeight;
    if(totalPercent !== 100) {
        document.getElementById("weightAddToHundred").innerHTML = "Those weights do not add to 100.";
    }

    document.getElementById("currentGrade").innerHTML = "You currently have a " + "" + currentGrade + "" + " in this class.";
    if(currentGrade > 120) {
        document.getElementById("badDataMessage").innerHTML = "Your grade seems rather high- " +
            "are you sure you entered the right data?";
    }
    if(currentGrade < 0) {
        document.getElementById("badDataMessage").innerHTML = "Your grade is negative- " +
            "are you sure you entered the right data?";
    }
    document.getElementById("calculateFinalButton").innerHTML = "    <button id=\"finalGradeButton\" onclick=\"calculateGradeNeeded()\" class=\"enterButton\" style=\"width:100px; height:60px\">Calculate Final Grade</button>\n";
    document.getElementById("enterFinalDesired").innerHTML = "<table border=\"1\" cellpadding=\"5\" id=\"entryTableFinal\" class=\"enterData\">\n" +
        "        <tr>\n" +
        "            <td><label for=\"finalDesiredEntry\">desired final grade:</label></td>\n" +
        "            <td><input type=\"text\" id=\"finalDesiredEntry\" value=\"90\" size=\"25\"></td>\n" +
        "        </tr>\n" +
        "\n" +
        "        <tr>\n" +
        "            <td><label for=\"finalWeight\">weighting of final:</label></td>\n" +
        "            <td><input type=\"text\" id=\"finalWeight\" value=\"20\" size=\"25\"></td>\n" +
        "        </tr>\n" +
        "    </table>";
}

function getGradeForCategory(cat) {
    var catGrades = document.getElementById(cat + "Entry").value;
    catGrades = convertArrayStringToNumber(catGrades);
    var catWeight = document.getElementById(cat + "Weight").value;
    catWeight = catWeight / 100;
    catGrades = averageArray(catGrades);
    catGrades = catGrades * catWeight;
    return catGrades;
}

function getStudentGradeColor(grade) {
    var color = "";
    if (grade >= 90) {
        color = "green";
    }
    if (grade < 90 && grade >= 80) {
        color = "yellowgreen";
    }
    if (grade < 80 && grade >= 70) {
        color = "yellow";
    }
    if (grade < 70 && grade >= 60) {
        color = "orange";
    }
    if (grade < 60) {
        color = "firebrick";
    }
    return color;
}

function convertArrayStringToNumber(arrayString) {
    var arrayOfGrades = arrayString.split(",");
    for(var i = 0; i < arrayOfGrades.length; i++) {
        arrayOfGrades[i] = parseInt(arrayOfGrades[i]);
    }
    console.log("arrayOfGrades=" + arrayOfGrades);
    return arrayOfGrades;
}

function averageArray(givenArray) {
    var averageOfArray = 0;
    for(var i = 0; i < givenArray.length; i++) {
        averageOfArray += givenArray[i];
    }
    averageOfArray = averageOfArray / givenArray.length;
    return averageOfArray;
}

function calculateGradeNeeded() {
    var gradeWanted = document.getElementById("finalDesiredEntry").value;
    var finalWeight = (document.getElementById("finalWeight").value) / 100;
    var otherGradesWeight = 1 - finalWeight;
    var grade = (gradeWanted - (currentGrade * otherGradesWeight)) / finalWeight;
    if(finalWeight > .8){
        document.getElementById("badFinalWeightMessage").innerHTML = "That's a very high weight. Maybe check the entry again?";
    }
    if(finalWeight < .05){
        document.getElementById("badFinalWeightMessage").innerHTML = "That's a very low weight. Maybe check the entry again?";
    }
    if(gradeWanted > 100) {
        document.getElementById("badFinalDataMessage").innerHTML = "That desired grade seems very high. Are you sure you entered the right data?";
    }
    if(gradeWanted < 50) {
        document.getElementById("badFinalDataMessage").innerHTML = "That desired grade seems very low. Are you sure you entered the right data?";
    }
    document.getElementById("finalGradeNeeded").innerHTML = "You need " + "" + grade + "" + " on your final to get " + "" + gradeWanted + "" + " in the class.   ";
    document.getElementById("newGrade").innerHTML = "        <button id=\"playAgain\" class=\"enterButton\" style=\"width:100px; height:60px;\" onclick=\"reset()\">Reset</button>\n";
}