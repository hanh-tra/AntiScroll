slider = document.getElementById("myRange");
output = document.getElementById("sensitivitynumber");

chrome.storage.sync.get(['sensitivity'], function(result) {
        if (result.sensitivity == null) {
            slider.value = 0;
        } else {
            slider.value = result.sensitivity;
        }
        console.log('Sensitivity currently is ' + result.sensitivity);
    });

slider.oninput = function() {
    myValue = slider.value;
    output.innerText = myValue;
    chrome.storage.sync.set({sensitivity: myValue}, function() {
        console.log('Value is set to ' + myValue);
    });
}

