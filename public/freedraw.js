var drawingModeEl = document.querySelector('#drawing-mode')
var drawingOptionsEl = document.querySelector('#drawing-mode-options'),
    drawingColorEl = document.querySelector('#drawing-color'),
    drawingLineWidthEl = document.querySelector('#drawing-line-width'),
    clearEl = document.querySelector('#clear-canvas');

clearEl.onclick = function() {
    var activeObject = canvas.getActiveObject()
    if (activeObject) {
        canvas.remove(activeObject);
    }
};

drawingModeEl.onclick = function() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = 'Cancel drawing mode';
        drawingOptionsEl.style.display = '';
    } else {
        drawingModeEl.innerHTML = 'Enter drawing mode';
        drawingOptionsEl.style.display = 'none';
    }
};


document.getElementById('drawing-mode-selector').addEventListener('change', function() {
    canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    }
});
drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
};
drawingLineWidthEl.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
};

if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadowBlur = 0;
}