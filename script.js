function drawBarChart(data, options, $element) {
  if (!($element instanceof jQuery)) {
    $element = $(element);
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
    $element.append($bar)
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
    let maxInput = Math.max(...data);
    let paddingTop = options.paddingTopPercent * options.css.height / 100;
    let maxBarHeight = options.css.height - paddingTop;
    let attributes = {css: {position: 'absolute',
                              height: 1,
                              width: options.css.width,
                              bottom: maxBarHeight,
                             'background-color': 'blue'
                             }
                       }

    for (let i = 0; i < data.length; i++) {


    }
    let $line = $('<div></div>', attributes);
    $element.append($line)
  }

  $element.css(options.css);
  drawLines();
  drawBars();

}



let options =  {css: {height: 500,
                      width: 500,
                     'background-color': 'lightgrey',
                      position: 'relative'},
                spacing: 20,
                paddingTopPercent: 4,
                lineNumber: 8
              }

drawBarChart([192, 21,30,39,48,57,66], options, $("#chart"))