const truncate = (input, limit) => (limit && input.length > limit ? `${input.substring(0, limit)}...` : input);

class ChartJsTooltip {
  createCaret(tooltipEl, caret, caretId, cartColor) {
    let innerBG = document.getElementById(`inner-${caretId}`);
    if (!caret) {
      caret = document.createElement('div');
      caret.id = caretId;
      tooltipEl.appendChild(caret);
    } else {
      caret.removeAttribute('style');
    }
    if (!innerBG) {
      innerBG = document.createElement('div');
      innerBG.id = `inner-${caretId}`;
      caret.appendChild(innerBG);
    } else {
      innerBG.removeAttribute('style');
    }
    caret.style.width = 0;
    caret.style.height = 0;
    caret.style.borderLeft = '9px solid transparent';
    caret.style.borderRight = '9px solid transparent';
    caret.style.borderTop = '9px solid #D8DBE0';
    caret.style.position = 'relative';
    caret.style.marginLeft = 'calc(50% - 9px)';
    innerBG.style.position = 'absolute';
    innerBG.style.left = '-9px';
    innerBG.style.top = '-10px';
    innerBG.style.width = '0px';
    innerBG.style.height = '0px';
    innerBG.style.borderLeft = '9px solid transparent';
    innerBG.style.borderRight = '9px solid transparent';
    innerBG.style.borderTop = `9px solid ${cartColor}`;
  }

  createTooltipOld(
    tooltipModel,
    rectBound,
    parentNode,
    childId,
    caretId,
    backgroundColor = '#FFFFFF',
    textColor = '#131F3C',
    truncateLimit = 12,
    styleOverride = {},
    wordBreak = false,
    customTooltipBuilder = null,
  ) {
    const contentsGetter = (model) => {
      /**  returns type IChartJsTooltip */
      const line = model.body[0].lines[0];
      if (customTooltipBuilder) return customTooltipBuilder(line);
      const title = `${truncate(line.label, truncateLimit)}: ${line.percentage}`;
      const label = `${line.value} / ${line.valueTotal}`;
      return {
        title,
        label,
      };
    };
    this.createTooltip(
      tooltipModel,
      rectBound,
      parentNode,
      childId,
      caretId,
      backgroundColor,
      textColor,
      contentsGetter,
      styleOverride,
      wordBreak,
    );
  }

  createTooltipNew(
    tooltipModel,
    rectBound,
    parentNode,
    childId,
    caretId,
    backgroundColor = '#FFFFFF',
    textColor = '#131F3C',
    styleOverride = {},
    wordBreak = false,
  ) {
    const contentsGetter = (model) => {
      /**  returns type IChartJsTooltip */
      const title = model.title[0];
      const body = model.body[0];
      const label = body.lines[0];
      return {
        title,
        label,
      };
    };
    this.createTooltip(
      tooltipModel,
      rectBound,
      parentNode,
      childId,
      caretId,
      backgroundColor,
      textColor,
      contentsGetter,
      styleOverride,
      wordBreak,
    );
  }

  createTooltip(
    tooltipModel,
    rectBound,
    parentNode,
    childId,
    caretId,
    backgroundColor = '#FFFFFF',
    textColor = '#131F3C',
    contentsGetter,
    styleOverride,
    wordBreak,
  ) {
    // Tooltip Element
    let tooltipEl = document.getElementById(childId);
    // Create element on first renders
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = childId;
      if (parentNode) {
        parentNode.appendChild(tooltipEl);
      } else {
        document.body.appendChild(tooltipEl);
      }
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.visibility = 'hidden';
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    // Set Text
    if (tooltipModel.body) {
      const content = contentsGetter(tooltipModel);
      if (!content) return; /** if no content- don't add tooltip */
      const { title, label } = content;
      const { horizontalBars } = tooltipModel;
      tooltipEl.innerHTML = `<div class="tooltipInner body-small txt-primary border-radius-small border shadow-bold"
                                  style="background: ${backgroundColor};
                                         color: ${textColor};
                                         display: flex;
                                         flex-direction: column;
                                         padding: 16px;
                                         align-items: center;"
                             >
                                    <span>${title || ''}</span>
                                    <span>${label || ''}</span>
                             </div>`;

      const caret = document.getElementById(caretId);
      this.createCaret(tooltipEl, caret, caretId, backgroundColor);

      const elStyle = {
        ...{
          visibility: 'visible',
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: 2,
          left: horizontalBars
            ? `${
                Math.min(tooltipModel.caretX, tooltipModel.chart.canvas.clientWidth - 200) - tooltipEl.clientWidth / 2
              }px`
            : `${tooltipModel.caretX - tooltipEl.clientWidth / 2}px`,
          width: '200px',
          top: `${tooltipModel.caretY - tooltipEl.clientHeight}px`,
          padding: `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`,
          wordBreak: wordBreak ? 'break-all' : '',
        },
        ...styleOverride,
      };
      Object.entries(elStyle).forEach(([key, value]) => {
        tooltipEl.style[key] = value;
      });
    }
  }
}

export const chartjsTooltip = new ChartJsTooltip();
