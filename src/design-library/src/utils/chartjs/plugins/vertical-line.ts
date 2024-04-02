// Used for Chart.js version - 3
export default (averageValue: number, lineHeaders: string[]) => ({
  afterDraw(chartInstance) {
    const { canvas, ctx } = chartInstance;

    const { padding } = chartInstance.options.layout;
    const barsDataset = chartInstance.getSortedVisibleDatasetMetas().find((ds) => ds.type === 'bar');
    // eslint-disable-next-line no-underscore-dangle
    const maxBarValue = Math.max(...barsDataset.controller._data);
    const firstBar = barsDataset.data[0];
    // The start place on x axis of first bar in canvas
    const { base, width } = firstBar;
    const lineXDiff = (averageValue * width) / maxBarValue;
    ctx.lineWidth = 2;
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(base + lineXDiff, padding.top + 3);
    ctx.lineTo(base + lineXDiff, canvas.height - 20);
    ctx.stroke();
    ctx.setLineDash([10, 6]);

    if (lineHeaders && lineHeaders.length > 0) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '400 12px Figtree, Helvetica, Arial, sans-serif';
      const lineHeight = 16;
      const startHeadersY = 0;
      lineHeaders.forEach((header: string, index: number) => {
        ctx.fillText(header, base + lineXDiff, startHeadersY + lineHeight * index);
      });
    }
  },
});
