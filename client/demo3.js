Template.demo3.onRendered(function() {


    $(".famous-container").remove();

    div = document.createElement('div');
    div.className += "famous-container black";
    document.body.appendChild(div);
    Famous.Engine.init();


        var geometry = new Famous.Circle();

        var colors = [ [151, 131, 242], [47, 189, 232] ];
        var totalCols = 12;
        var totalRows = 10;
        var pe = new Famous.PhysicsEngine();

        function createColorStep(step, isDom) {
            step -= (step >= totalCols) ? totalCols : 0;
            var r = colors[0][0] - Math.round(((colors[0][0] - colors[1][0]) / totalCols) * step);
            var g = colors[0][1] - Math.round(((colors[0][1] - colors[1][1]) / totalCols) * step);
            var b = colors[0][2] - Math.round(((colors[0][2] - colors[1][2]) / totalCols) * step);
            if (isDom) return 'rgb(' + r + ',' + g + ',' + b + ')';
            return [r, g, b];
        }

        function Phys (node, x, y) {
            this.id = node.addComponent(this);
            this.node = node;
            this.body = new Famous.Particle({
                mass: 1,
                position: new Famous.Vec3(x, y, 0)
            });
            this.force = new Famous.Spring(null, this.body, {
                period: 0.9,
                dampingRatio: 0.12,
                anchor: new Famous.Vec3(x, y, 0)
            });
            pe.add(this.body, this.force);
            node.requestUpdate(this.id);
        }

        Phys.prototype.onUpdate = function onUpdate () {
            var pos = this.body.position;
            this.node.setPosition(pos.x, pos.y, pos.z);
            this.node.requestUpdateOnNextTick(this.id);
        }

        function Dot (node, i, sceneSize) {
            node.setProportionalSize(1 / 12, 1 / 18)
                .setDifferentialSize(-4, -4);

            new Famous.Mesh(node).setGeometry(geometry)
                .setBaseColor(new Famous.Color(createColorStep(i / 18)));

            new Phys(node, sceneSize[0] * (i % totalRows) / totalRows,
                    sceneSize[1] * ((((i / totalRows)|0) % totalCols) / totalCols));
        }

        var grav = new Famous.Gravity3D(null, pe.bodies, {
            strength: -5e7,
            max: 1000,
            anchor: new Famous.Vec3()
        });

        pe.add(grav);

        document.addEventListener('mousemove', function (e) {
            grav.anchor.set(e.pageX, e.pageY);
        });
        document.addEventListener('touchmove', function (e) {
            grav.anchor.set(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
            e.preventDefault();
        });

// APP CODE


        var scene = Famous.Engine.createScene('div');
        var peUpdater = scene.addComponent({
            onUpdate: function (time) {
                pe.update(time);
                scene.requestUpdateOnNextTick(peUpdater);
            }
        });
        scene.requestUpdate(peUpdater);
        var root = scene.addChild();
        var sized = false;
        root.addComponent({
            onSizeChange: function (size) {
                if (!sized) {
                    for (var i = 0 ; i < (totalRows * totalCols) ; i++)
                        Dot(root.addChild(), i, size);
                    sized = true;
                }
            }
        });





}
);
