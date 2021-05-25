function setValue(key, value) {
    if (canvas.getActiveObject() != null) {
        const activeText = canvas.getActiveObject()
        activeText.set(key, value)
        canvas.renderAll();
    }
}


function createImgName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${result}.png`;
}

function loadObjectHandlers() {
    $('#text').off('input').on('input', function() {
        setValue("text", $(this).val())
    })

    $('#cp-text').off('input').on('input', function() {
        setValue("fill", $('#text-color').val())
    })
    $('#font-family').off('input').on('input', function() {
        setValue("fontFamily", $('#font-family').find(":selected").attr('value'))
    })
    $('#font-size').off('input').on('input', function() {
        setValue("fontSize", $(this).val())
    })

    $('#cp-stroke').off('input').on('input', function() {
        setValue("stroke", $('#stroke-color').val())
    })

    $('#stroke-width').off('input').on('input', function() {
        if ($(this).val() == 0) {
            $(this).val(null)
        }
        setValue("strokeWidth", $(this).val())
    })

    $('#opacity').off('input').on('input', function() {
        setValue("opacity", parseFloat($(this).val() / 100))
    })
}


const canvas = new fabric.Canvas('canvas-wrapper', {
    width: 500,
    height: 500 * memeInfo.height / memeInfo.width,
    selection: false,
    allowTouchScrolling: true
});

$(window).resize(resizeCanvas);

function resizeCanvas() {
    var width = $('#canvas-wrapper').width()
    $('.canvas-container').css('width', width)
    $('.canvas-container').css('height', width * memeInfo.height / memeInfo.width)
}
resizeCanvas();

fabric.Image.fromURL(`${memeInfo.url}`, function(meme) {

    meme.scaleToWidth(500);
    canvas.setBackgroundImage(meme, canvas.renderAll.bind(canvas))
}, {
    crossOrigin: "anonymous"
});
$('#add-text').off('click').on('click', function() {
    if ($('#text').val() == '') {
        alert('Error! Text field is empty')
        return
    }

    // Create new text object
    let text = new fabric.Text($('#text').val(), {
        top: 10,
        left: 10,
        fontFamily: $('#font-family').find(":selected").attr('value'),
        fontSize: $('#font-size').val(),
        fill: $('#text-color').val(),
        stroke: $('#stroke-color').val(),
        strokeWidth: $('#stroke-width').val(),
        opacity: parseFloat($('#opacity').val() / 100),
    })
    text.scaleToWidth(canvas.width / 2)
    $('#scale').val(text.scaleX)

    canvas.add(text);
    canvas.setActiveObject(text);

})

loadObjectHandlers()

$('#generate-meme').off('click').on('click', function() {
    const dataURL = canvas.toDataURL({
        format: 'png',
    });

    let link = document.createElement('a');
    link.href = dataURL;
    link.download = createImgName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

$('#add-image').off('input').on('input', function() {
    const file = this.files[0];
    const fileType = file['type'];
    $('#add-image').val('')

    const reader = new FileReader()
    reader.onload = function() {
        var image = new Image()
        image.src = reader.result
        image.onload = function() {
            fabric.Image.fromURL(reader.result, function(image) {
                image.scaleToWidth(canvas.width / 2)
                canvas.add(image).setActiveObject(image);
                $('#scale').val(image.scaleX)
            }, {
                opacity: $('#opacity').val()
            })
        }
    }
    reader.readAsDataURL(file)
})