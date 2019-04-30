
let APP =
{
    SSD: null,
    Counting: false,
    Interval: null
}


window.onload = function()
{
    APP.SSD = new SevenSegmentDisplay("SVGSSD");

    SetEventHandlers();
}


function SetEventHandlers()
{
    document.getElementById("udNumberOfDigits").onchange = function(){APP.SSD.NumberOfDigits = parseInt(document.getElementById("udNumberOfDigits").value);};
    document.getElementById("udNumberOfDecimalPlaces").onchange = function(){APP.SSD.NumberOfDecimalPlaces = parseInt(document.getElementById("udNumberOfDecimalPlaces").value);};
    document.getElementById("udValue").onchange = function(){APP.SSD.Value = parseFloat(document.getElementById("udValue").value);};

    document.getElementById("colBackgroundColor").onchange = function () { APP.SSD.BackgroundColor = document.getElementById("colBackgroundColor").value; };
    document.getElementById("colLitSegmentColor").onchange = function () { APP.SSD.LitSegmentColor = document.getElementById("colLitSegmentColor").value; };
    document.getElementById("colUnlitSegmentColor").onchange = function () { APP.SSD.UnlitSegmentColor = document.getElementById("colUnlitSegmentColor").value; };

    let decimalpoint_radios = document.getElementsByName("rdoDecimalPointType");
    for(let i = 0; i < decimalpoint_radios.length; decimalpoint_radios[i].onchange = function(Sender){SetDecimalPointType(this);}, i++);

    let color_radios = document.getElementsByName("rdoColorScheme");
    for(let i = 0; i < color_radios.length; color_radios[i].onchange = function(Sender){SetColorScheme(this);}, i++);

    document.getElementById("btnStart").onclick = function(){Start();};
}


function SetDecimalPointType(Sender)
{
    if (Sender.value == "Fixed")
        APP.SSD.DecimalPointType = APP.SSD.DecimalPointTypes.Fixed;
    else
        APP.SSD.DecimalPointType = APP.SSD.DecimalPointTypes.Floating;
}


function SetColorScheme(Sender)
{
    switch (Sender.value)
    {
        case "LCD":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.LCD;
            break;
        case "Green":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.Green;
            break;
        case "Orange":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.Orange;
            break;
        case "Blue":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.Blue;
            break;
        case "Sky":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.Sky;
            break;
        case "Red":
            APP.SSD.ColorScheme = APP.SSD.ColorSchemes.Red;
            break;
        default:
            break;
    }

    document.getElementById("colBackgroundColor").value = APP.SSD.BackgroundColor;
    document.getElementById("colLitSegmentColor").value = APP.SSD.LitSegmentColor;
    document.getElementById("colUnlitSegmentColor").value = APP.SSD.UnlitSegmentColor;
}


function Start()
{
    if (APP.Counting == true)
    {
        APP.Counting = false;
        clearInterval(APP.Interval);
        document.getElementById("btnStart").innerHTML = "Start";
    }
    else
    {
        APP.Interval = setInterval(function () { APP.SSD.Value = APP.SSD.Value + 1; }, 1000);
        APP.Counting = true;
        document.getElementById("btnStart").innerHTML = "Stop";
    }
}
