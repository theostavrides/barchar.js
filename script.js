function drawBarChart(data, options, $parentElement) {
  if (!($parentElement instanceof jQuery)) {
    $parentElement = $($parentElement);
  }

  let $chartElement =  $("<div></div>")

  function makeChartAndTitleAndLabelDivs() {
    $chartElement.css(options.css);
  }

  function getBarHeight(bar) {
    let ratio = bar / Math.max(...data);
    let paddingTop = options.paddingTopPercent * options.css.height / 100;
    let height = (options.css.height - paddingTop) * ratio;
    return height;
  }

  function makeBarElement(x, y, width, height) {
    let attributes = {css:{position: 'absolute',
                           left: x,
                           top: y,
                           width: width,
                           height: height,
                           'background-color': 'black'
                          }
                     };
    let $bar = $("<div></div>", attributes);
    $chartElement.append($bar)
  }

  function drawBars() {
    let n = data.length;
    let barWidth = (options.css.width - options.spacing * (n + 1))/n;
    let x = 0;
    for (let bar of data) {
      let barHeight = getBarHeight(bar);
      x += options.spacing;
      makeBarElement(x, options.css.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  }

  function drawLines(){
    let paddingTop = options.paddingTopPercent * options.css.height / 100;
    let maxBarHeight = options.css.height - paddingTop;
    let attributes =  {css: {position: 'absolute',
                             height: 1,
                             width: options.css.width,
                             bottom: maxBarHeight,
                            'background-color': 'grey'
                            }
                      }
    let lineSpace = maxBarHeight / options.lineNumber;

    for (let i = 0; i < options.lineNumber; i++) {
      let $line = $('<div></div>', attributes);
      $chartElement.append($line);
      attributes.css.bottom -= lineSpace;
    }
  }


  makeChartAndTitleAndLabelDivs();
  drawLines();
  drawBars();
  $parentElement.append($chartElement)
}



let options =  {spacing: 12,
                paddingTopPercent: 7,
                lineNumber: 8,
                css: {height: 500,
                      width: 500,
                     'background-color': 'lightgrey',
                      position: 'relative'},
              }

drawBarChart([192, 21,130,39,148,57,66], options, $("#chart"))