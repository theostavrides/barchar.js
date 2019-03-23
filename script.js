function barchart(data, barLabels, options, $parentElement) {
  if (!($parentElement instanceof jQuery)) {
    $parentElement = $($parentElement);
  }

  let $chartElement =  $("<div></div>"),
      $valueLabelElement = $("<div></div>"),
      $barLabelElement = $("<div></div>"),
      $titleElement = $("<div></div>")

  //PARENT
  function changeParentCSS() {
    let css = {height: options.height,
               width: options.width,
              'background-color': options['background-color'],
               position: 'relative'
              };

    $parentElement.css(css);
  }

  //CHART ELEMENT FUCNTIONS
  function buildChartElement() {
    let css = {width: options.width * 0.9,
               height: options.height * 0.8,
               top: options.height * 0.1,
               position: 'absolute',
               right: 0,
              }
    $chartElement.css(css)
    $parentElement.append($chartElement)
    drawLines();
    drawBars();
  }
      //bars
  function getBarHeight(bar) {
    let chartHeight = parseFloat($chartElement.css("height"))
    let ratio = bar / Math.max(...data);
    let height = chartHeight * ratio;
    return height;
  }

  function buildBarElement(x, y, width, height) {
    let attributes = {css:{position: 'absolute',
                           left: x,
                           top: y,
                           width: width,
                           height: height,
                           'background-color': 'black'
                          }
                     };
    let $bar = $("<div></div>", attributes);
    $chartElement.append($bar);

  }

  function drawBars() {
    let n = data.length;
    let chartWidth = parseFloat($chartElement.css("width"));
    let chartHeight = parseFloat($chartElement.css("height"));
    let barWidth = (chartWidth - options.spacing * (n + 1))/n;

    let x = 0;
    for (let bar of data) {
      let barHeight = getBarHeight(bar);
      x += options.spacing;
      buildBarElement(x, chartHeight - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  }
      //lines
  function drawLines(){
    let chartHeight = parseFloat($chartElement.css("height"))
    let chartWidth = parseFloat($chartElement.css("width"))
    let attributes =  {css: {position: 'absolute',
                             height: 1,
                             width: chartWidth,
                             bottom: chartHeight,
                            'background-color': 'grey'
                            }
                      }
    let lineSpace = chartHeight / options.lineNumber;

    for (let i = 0; i < options.lineNumber + 1; i++) {
      let $line = $('<div></div>', attributes);
      $chartElement.append($line);
      attributes.css.bottom -= lineSpace;

    }
  }

  //VALUES ELEMENT

  function buildValuesElement(){
    let css = { position:  'absolute',
                            top: options.height * 0.1,
                            width: options.width * 0.1,
                            height: $chartElement.css("height")}

    $valueLabelElement.css(css)
    $parentElement.append($valueLabelElement)
    buildValueLabels();
  }

  function buildValueLabels(){
    let max = Math.max(...data)
    for (let i = 0; i < options.lineNumber + 1; i ++) {
      let $label = $("<div></div>");
      let top = parseInt($($valueLabelElement.siblings()[0]).children()[i].style.bottom)
                - (options.valueLabelFontSize/2 + 2);
      let css = { position: 'absolute',
                  top: top,
                  right: 10,
                  'font-size': options.valueLabelFontSize}
      $label.css(css)
      let currentVal = (i * max / options.lineNumber).toFixed(options.decimalRound);
      $label.html(currentVal)
      $valueLabelElement.append($label)

    }
  }



  //TITLE ELEMENT
  function buildTitleElement() {
    let css = { position:  'absolute',
                width: options.width,
                height: options.height * 0.1,//options.titleLabelFontSize * 1.5,
                'font-size': options.titleLabelFontSize,
                right: 0,
                'text-align': 'center',
                };
    $titleElement.css(css)
    $titleElement.html(options.title);
    $parentElement.append($titleElement)
  }

  //BAR LABLE ELEMENT
  function buildBarLabelElement(){
    let css = { position: 'absolute',
                width: options.width * 0.9,
                height: options.height * 0.1,
                right: 0,
                bottom: 0
    }
    $barLabelElement.css(css)
    $parentElement.append($barLabelElement)
    buildBarLabels()
  }

  function buildBarLabels() {
    let n = data.length;
    let chartWidth = parseFloat($chartElement.css("width"));
    let barWidth = (chartWidth - options.spacing * (n + 1))/n;
    let css = { position: 'absolute',
                left: options.spacing + barWidth / 2,
                }
    for (let i = 0; i < data.length; i++) {
      let $label = $("<div></div>")
      $label.css(css)
      $label.html(barLabels[i])
      $barLabelElement.append($label)
      let currentWidth = parseFloat($label.css("width"));
      let desiredLeft = parseFloat($label.css("left")) - currentWidth / 2
      $label.css("left", desiredLeft)
      css.left += barWidth + options.spacing;
    }
  }




  //EXECUTE
  changeParentCSS();
  buildChartElement();
  buildTitleElement();
  buildValuesElement();
  buildBarLabelElement();
}


// DATA GENERATORS
function createRandomArrData(arrLen, valueMax){
  let newArr = [];

  function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  for (let i = 0; i < arrLen; i++) {
    newArr.push(randomInt(valueMax))
  }

  return newArr
}

function createRandomDataSet(arrLen, valueMax, n) {
  let dataSet = [];
  for (let i = 0; i < n; i++) {
    dataSet.push(createRandomArrData(arrLen, valueMax))
  }
  return dataSet
}

//ANIMATOR
function getArrayWithBiggestValue(arr) {
  let max = 0;
  let arrayIndex = 0;
  let currentMax = 0;
  for (let i = 0; i < arr.length; i++) {
    currentMax = Math.max(...arr[i]);
    if (currentMax > max) {
      max = currentMax;
      arrayIndex = i;
    }
  }
  return arr[arrayIndex]
}

function animateBarchart(dataSet, barLabels, options, $parentElement) {
  let biggest = getArrayWithBiggestValue(dataSet);
  barchart(biggest, barLabels, options, $parentElement);
  let $barsAndLines = $parentElement.children().eq(0).children();
  let $bars = $barsAndLines.filter(function(index) {
    return index >= $barsAndLines.length - dataSet[0].length
  })
  let chartHeightPixels = parseFloat($barsAndLines.parent().css("height"));
  let firstChartValues = dataSet[0]

  $bars.each(function(i, val){
    let newHeightValue = firstChartValues[i];
    let newTop = newHeightValue / Math.max(...biggest) * chartHeightPixels;
    $(val).css({top: chartHeightPixels - newTop, height: newTop})
  })



  function * dataSetGenerator(dataSet) {
    for (let i = 1; i < dataSet.length; i ++) {
      yield dataSet[i]
    }
  }

  const nextValues = dataSetGenerator(dataSet);

  function newState() {
    let currentValues = nextValues.next().value;
    console.log(currentValues)
    for (let i = 0; i < $bars.length; i++) {
      let newHeightValue = currentValues[i];
      let newTop = newHeightValue / Math.max(...biggest) * chartHeightPixels;
      console.log(newTop)
      $($bars[i]).animate({top: chartHeightPixels - newTop, height: newTop}, options.animationSpeed/2)
    }
  }
  // MUST MAKE BETTER
  setInterval(function(){
    newState()
  }, options.animationSpeed)

}

let options =  {height: 400,
                width: 400,
                spacing: 5,
                lineNumber: 6,
                valueLabelFontSize: 15,
                decimalRound: 0,
                title: 'DEATHS',
                titleLabelFontSize: 25,
                barLabelFontSize: 6,
               'background-color': 'lightgrey',
                animationSpeed: 4000,
              };

let randomSet = createRandomDataSet(5, 13, 100);

animateBarchart(randomSet, ['a','b','c','d','e'], options, $("#chart"))
//barchart([1,2,3,4,5], ['chick','meow','lol','heh','dude'],options, $("#chart"));



