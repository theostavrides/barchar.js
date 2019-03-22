function barchart(data, options, $parentElement) {
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
    let paddingTop = options.paddingTopPercent * chartHeight / 100;
    let height = (chartHeight - paddingTop) * ratio;
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
    let paddingTop = options.paddingTopPercent * chartHeight / 100;
    let maxBarHeight = chartHeight - paddingTop;
    let attributes =  {css: {position: 'absolute',
                             height: 1,
                             width: chartWidth,
                             bottom: maxBarHeight,
                            'background-color': 'grey'
                            }
                      }
    let lineSpace = maxBarHeight / options.lineNumber;

    for (let i = 0; i < options.lineNumber + 1; i++) {
      let $line = $('<div></div>', attributes);
      $chartElement.append($line);
      attributes.css.bottom -= lineSpace;
    }
  }

  //TITLE DIV

  function buildTitleElement(){
    let css = { position:  'absolute',
                            width: options.width * 0.1,
                            height: options.height }

    $titleElement.css(css)
    $titleElement.css("width")
    $parentElement.append($titleElement)
    buildValueLabels();
  }

  function buildValueLabels(){

  }

  function writeLabels(){

  }

  //EXECUTE
  changeParentCSS();
  buildChartElement();
  buildTitleElement();
}



let options =  {height: 300,
                width: 500,
                spacing: 20,
                paddingTopPercent: 2,
                lineNumber: 8,
                valueLabelFontSize: 10,
                litleLabelFontSize: 20,
                barLabelFontSize: 10,
               'background-color': 'lightgrey'
              };

barchart([192, 21,130,39,148,57,66,92,52,66,126,25], options, $("#chart"))