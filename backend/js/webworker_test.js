var i = 0;
function updateTime() {
    i = i + 1;
    postMessage(i);
    setTimeout("updateTime()", 500);
};

updateTime();