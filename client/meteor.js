

Template.main.onRendered(function() {

    $(".famous-container").remove();
    div = document.createElement('div');
    div.className += "famous-container";
    document.body.appendChild(div);
    Famous.Engine.init();

    var scene = Famous.Engine.createScene('div');

var rootNode = scene.addChild();
var aNode = scene.addChild();

    aNode
        .setSizeMode('absolute', 'absolute', 'absolute')
        .setAbsoluteSize(350, 50)
        .setAlign(0.5,0,0)
        .setMountPoint(0.5, 0)
        .setOrigin(0.5, 0,0)

    var e2 = new Famous.DOMElement(aNode, {
        content: 'Famo.us Mixed Mode Examples!',
        properties: {
            'border':'1px solid black',
            'background-color':'grey',
            'color':'white',
            'text-align':'center',
            'font-size':'x-large'
        }
    })

    rootNode
        // Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
        .setSizeMode('absolute', 'absolute', 'absolute')
        .setAbsoluteSize(250, 250)
        .setAlign(0.5, 0.5,10)
        .setMountPoint(0.5, 0.5)
        .setOrigin(0.5, 0.5,10)


    var element = new Famous.DOMElement(rootNode, {
        tagName: 'img'
    }).setAttribute('src', 'famous_logo.png');


    var spinner = rootNode.addComponent({
        onUpdate: function(time) {
            rootNode.setRotation(0, time / 1000, 0);
            rootNode.requestUpdateOnNextTick(spinner);
        }
    });
    rootNode.requestUpdate(spinner);


});

