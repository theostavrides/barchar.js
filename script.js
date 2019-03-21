function drawBarChart(data, options, $element) {
  if (!($element instanceof jQuery)) {
    $element = $(element);
  }

  let n = data.length;
  let biggestBarInUnits = Math.max(...data);

  function drawBars() {
    let barWidth = (options.css.width - options.spacing * (n + 1))/n;
    let x = 0;
    for (let bar of data) {
      let barHeight = getBarHeight(bar);
      x += options.spacing;
      makeBarElement(x, options.css.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  }

  function getBarHeight(bar) {
    let ratio = bar / biggestBarInUnits;
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
                           'background-color': 'red'
                          }
                     };
    let $bar = $("<div></div>", attributes);
    $element.append($bar)

  }

  $element.css(options.css);
  drawBars();
}



let options =  {css: {height: 500,
                      width: 500,
                     'background-color': 'blue',
                      position: 'relative'},
                spacing: 50,
                paddingTopPercent: 4
              }

drawBarChart([12,2,30,45,15,26,50], options, $("#chart"))