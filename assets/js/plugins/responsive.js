// function updateStyles() {
//   let windowWidth = window.innerWidth;

//   if (windowWidth <= 640) {
//     document.documentElement.style.fontSize = '10px';
//   } else if (windowWidth <= 1024) {
//     document.documentElement.style.fontSize = '6.5px';
//   } else if (windowWidth <= 1200) {
//     let baseFontSize = windowWidth / 100 * .626;
//     document.documentElement.style.fontSize = baseFontSize + 'px';
//   } else if (windowWidth <= 1440) {
//     let baseFontSize = windowWidth / 100 * .562999;
//     document.documentElement.style.fontSize = baseFontSize + 'px';
//   } else {
//     let baseFontSize = (windowWidth / 100 * .520834);
//     document.documentElement.style.fontSize = baseFontSize + 'px';
//   }

//   updateDynamicElements(parseFloat(document.documentElement.style.fontSize));
// }

// function updateDynamicElements(baseFontSize) {
//   const container = document.querySelector('.container');
//   if (!container) return;

//   const elements = container.querySelectorAll('*');

//   elements.forEach(element => {
//     let styles = window.getComputedStyle(element);
//     let fontSize = styles.getPropertyValue('font-size');
//     if (fontSize.includes('rem-calc')) {
//       let value = parseFloat(fontSize.replace('rem-calc(', '').replace('px)', ''));
//       if (!isNaN(value)) {
//         let remValue = (value / baseFontSize).toFixed(3);
//         element.style.fontSize = remValue + 'rem';
//       }
//     }
//   });
// }

// function remCalc(valuesInPx) {
//   let windowWidth = window.innerWidth;
//   let values = valuesInPx.split(' ').map(value => parseFloat(value));

//   if (windowWidth <= 768) {
//     let remValues = values.map(value => (value / 16).toFixed(3) + 'rem');
//     return remValues.join(' ');
//   } else {
//     let baseFontSize = windowWidth <= 1440 ? windowWidth / 100 : (windowWidth / 100) * 1.2;
//     let remValues = values.map(value => (value / baseFontSize).toFixed(3) + 'rem');
//     return remValues.join(' ');
//   }
// }

// window.onload = function() {
//   updateStyles();
// };

// window.addEventListener('resize', function() {
//   updateStyles();
// });

// document.addEventListener('DOMContentLoaded', function() {
//   localStorage.setItem('applyRemCalc', 'true');
//   updateStyles();
// });


// let baseFontSize = (1440 / 100 * 0.69444444) + (windowWidth - 1920) * 0.5 / 100;


function updateStyles(frameWidth = 1920, containerMaxWidth = 1920) {
  let windowWidth = window.innerWidth;

  // Рассчитываем коэффициент масштабирования относительно frameWidth
  let scaleFactor = windowWidth / frameWidth;

  // Устанавливаем масштабируемый размер шрифта для элементов
  if (windowWidth <= 640) {
    document.documentElement.style.fontSize = '10px';
  } else if (windowWidth <= 1024) {
    document.documentElement.style.fontSize = '6.5px';
  }  else if (windowWidth <= 1200) {
    let baseFontSize = windowWidth / 100 * 0.69444444;
    document.documentElement.style.fontSize = baseFontSize + 'px';
  } else if (windowWidth <= 1440) {
    let baseFontSize = windowWidth / 100 * 0.69444444;
    document.documentElement.style.fontSize = baseFontSize + 'px';
  } else {
    // Пропорциональное увеличение для экранов больше 1440px
    let baseFontSize = (1440 / 100 * 0.861) + (windowWidth - 1920) * 0.5 / 100;
    document.documentElement.style.fontSize = baseFontSize + 'px';
  }

  // Применяем стили для контейнера
  const container = document.querySelector('.container');
  if (container) {
    // Контейнер шириной до containerMaxWidth и центрирован
    if (windowWidth <= containerMaxWidth) {
      container.style.width = '100%'; // Если экран меньше ширины контейнера, устанавливаем ширину 100%
    } else {
      container.style.width = containerMaxWidth + 'px'; // Ограничиваем контейнер максимальной шириной
    }
    container.style.margin = '0 auto'; // Центрируем контейнер
  }

  // Обновляем динамические элементы внутри контейнера
  updateDynamicElements(parseFloat(document.documentElement.style.fontSize));
}

function updateDynamicElements(baseFontSize) {
  const container = document.querySelector('.container');
  if (!container) return;

  const elements = container.querySelectorAll('*');
  elements.forEach(element => {
    let styles = window.getComputedStyle(element);
    let fontSize = styles.getPropertyValue('font-size');
    if (fontSize.includes('rem-calc')) {
      let value = parseFloat(fontSize.replace('rem-calc(', '').replace('px)', ''));
      if (!isNaN(value)) {
        let remValue = (value / baseFontSize).toFixed(3);
        element.style.fontSize = remValue + 'rem';
      }
    }
  });
}

function remCalc(valuesInPx, frameWidth = 1920) {
  let windowWidth = window.innerWidth;
  let scaleFactor = windowWidth / frameWidth;
  let values = valuesInPx.split(' ').map(value => parseFloat(value));

  if (windowWidth <= 768) {
    let remValues = values.map(value => (value / 16 * scaleFactor).toFixed(3) + 'rem');
    return remValues.join(' ');
  } else {
    let baseFontSize = windowWidth <= 1440 ? windowWidth / 100 : (windowWidth / 100) * 1.2;
    let remValues = values.map(value => (value / baseFontSize * scaleFactor).toFixed(3) + 'rem');
    return remValues.join(' ');
  }
}

// Инициализация с нужной шириной frame (например, 1440px)
window.onload = function() {
  updateStyles(1440, 1200);  // Передаем ширину frame как 1440px и максимальную ширину контейнера 1200px
};

window.addEventListener('resize', function() {
  updateStyles(1440, 1200);  // Масштабируем под frame 1440px и фиксируем контейнер на 1200px
});

document.addEventListener('DOMContentLoaded', function() {
  localStorage.setItem('applyRemCalc', 'true');
  updateStyles(1440, 1200);  // Подгоняем под ширину frame 1440px и максимальную ширину контейнера 1200px
});
