  // initializing my firbase database

var config = {
    apiKey: "AIzaSyDxLwlD5CK1RHkalneh7HoApCw6S6Yso4g",
    authDomain: "train-scheduler-f8f4c.firebaseapp.com",
    databaseURL: "https://train-scheduler-f8f4c.firebaseio.com",
    projectId: "train-scheduler-f8f4c",
    storageBucket: "",
    messagingSenderId: "771636920665"
  };
firebase.initializeApp(config);

  //   storing firebase database into a var

var database = firebase.database();

  // on click button for adding train
  
$("#submitBtn").on("click", function(event){
      event.preventDefault();

  // for getting input from user

    var newTrain=$("#trainNameInput").val().trim();
    var newDest=$("#destinationInput").val().trim();
    var firstTrain=moment($("#firstTrainTime").val().trim(), "HH:mm");
    var newFreq=parseInt($("#frquency").val().trim());
  
    var nTrain={
      trainName: newTrain,
      trainDestination: newDest,
      firsttrain: firstTrain,
      frequency: newFreq
    };

    // Uploading train datas into database

    database.ref().push(nTrain);

    //  here consoles the logs

    // console.log(nTrain.trainName);
    // console.log(nTrain.trainDestination);
    // console.log(nTrain.firsttrain);
    // console.log(nTrain.frequency);

    alert("Train Successfully Added")

    // Now have to clear all text boxes input to add another train

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTime").val("");
    $("#frquency").val("");
});

//    creating firebase event for  adding train into database

database.ref().on("child_added", function(childSnapshot){
    // console.log(childSnapshot.val());

    // and storing values into a seperate variables

    var newTrain = childSnapshot.val().trainName;
    var newDest = childSnapshot.val().trainDestination;
    var firstTrain = childSnapshot.val().firsttrain;
    var newFreq = childSnapshot.val().frequency;

    // Logging into console
    // console.log(newTrain);
    // console.log(newDest);
    // console.log(firstTrain);
    // console.log(newFreq);
   
    var fttConverted = (moment.unix(firstTrain)) / 1000;
    var currtime = moment();

    var diffTime = currtime.diff(fttConverted, "minutes");
    
    var tRemainder = diffTime % newFreq;
    var minAway= newFreq - tRemainder;   // Calculates the Minutes Away.

    var nextTrain=currtime.add(minAway, "minutes").format("HH:mm");
    
    var newRow=$("<tr>").append(
        $("<td>").text(newTrain),// Done
        $("<td>").text(newDest), // Done
        $("<td>").text(newFreq), // Done
        $("<td>").text(nextTrain), // Done
        $("<td>").text(minAway)  // Done
    );

    $("#currentTrainTime > tbody").append(newRow);
});