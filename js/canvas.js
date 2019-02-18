var CanvasForSign = {


    // Variables pour suivre la position de la souris et l'état du bouton gauche
    mouseX: 0,
    mouseY: 0,
    mouseDown: 0,

    // Variables pour garder une trace de la position tactile
    touchX: 0,
    touchY: 0,

    // Gardez une trace de l'ancienne / dernière position lorsque vous tracez une ligne
    // Mettre -1 au début pour indiquer que nous n'avons pas encore un bon rapport
    lastX: -1,
    lastY: -1,

    // Configuration du canvas et ajoutez gestionnaires d'évènements une fois que la page sera chargée
    init: function () {
        // obtenir l'élèment de toile spécifique du document html
        ctx = document.getElementById('canvas-sign').getContext('2d');


        // réagir aux évènements de la souris sur le canvas 
        document.getElementById('canvas-sign').addEventListener('mousedown', CanvasForSign.sketchpad_mouseDown, false);
        document.getElementById('canvas-sign').addEventListener('mousemove', CanvasForSign.sketchpad_mouseMove, false);
        window.addEventListener('mouseup', CanvasForSign.sketchpad_mouseUp, false);

        // réaction lorsque l'on touche le canvas avec des touches
        document.getElementById('canvas-sign').addEventListener('touchstart', CanvasForSign.sketchpad_touchStart, false);
        document.getElementById('canvas-sign').addEventListener('touchend', CanvasForSign.sketchpad_touchEnd, false);
        document.getElementById('canvas-sign').addEventListener('touchmove', CanvasForSign.sketchpad_touchMove, false);

        // réinitialiser le canvas en cliquant sur la touche "effacer"
        document.getElementById('erase').addEventListener('click', function () {
            ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);
        });

    },

    // Trace une ligne entre la position spécifique et le canvas 
    // paramètres sont : les positions x et y et la taille du point 
    drawLine: function (ctx, x, y, size) {

        // SI lastx n'est pas défini, définir last x et y sur la position actuelle
        if (CanvasForSign.lastX == -1) {
            CanvasForSign.lastX = x;
            CanvasForSign.lastY = y;
        }

        // sélection du style 
        ctx.strokeStyle = "#45505b";

        // défini le style sur arrondi pour une meilleurs lecture
        ctx.lineCap = "round";
        //ctx.lineJoin = "round";


        // Tracez une ligne
        ctx.beginPath();

        // Premiérement passez à l'ancienne position
        ctx.moveTo(CanvasForSign.lastX, CanvasForSign.lastY);

        // Ensuite tracer d'une ligne 
        ctx.lineTo(x, y);

        // Définissez l'épaisseur de la ligne et tracez la ligne
        ctx.lineWidth = size;
        ctx.stroke();

        ctx.closePath();

        // Mettre à jour la dernière position pour référencer la position actuelle
        CanvasForSign.lastX = x;
        CanvasForSign.lastY = y;
    },

    // Effacer le contexte du canvas à l'aide de la largeur et de la hauteur de la toile
    clearCanvas: function (canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    // Gardez la trace du bouton de la souris enfoncé et dessinez un point à l'emplacement actuel.
    sketchpad_mouseDown: function () {
        CanvasForSign.mouseDown = 1;
        CanvasForSign.drawLine(ctx, CanvasForSign.mouseX, CanvasForSign.mouseY, 4);
    },

    // Gardez une trace du bouton de la souris qui est relâché
    sketchpad_mouseUp: function () {
        CanvasForSign.mouseDown = 0;

        // Réinitialisez lastX et lastY à -1 pour indiquer qu'ils sont maintenant invalides, puisque nous avons levé le "stylo".
        CanvasForSign.lastX = -1;
        CanvasForSign.lastY = -1;
    },

    // Suivre la position de la souris et dessiner un point si le bouton de la souris est actuellement enfoncé.
    sketchpad_mouseMove: function (e) {
        // Mettre à jour les coordonnées de la souris lorsqu'elle est déplacée
        CanvasForSign.getMousePos(e);

        // Dessiner un point si le bouton de la souris est actuellement enfoncé
        if (CanvasForSign.mouseDown == 1) {
            CanvasForSign.drawLine(ctx, CanvasForSign.mouseX, CanvasForSign.mouseY, 4);
        }
    },

    // Obtenir la position actuelle de la souris par rapport au coin supérieur gauche du canvas
    getMousePos: function (e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            CanvasForSign.mouseX = e.offsetX;
            CanvasForSign.mouseY = e.offsetY;
        } else if (e.layerX) {
            CanvasForSign.mouseX = e.layerX;
            CanvasForSign.mouseY = e.layerY;
        }
    },

    
}

$(document).ready(function () {
    CanvasForSign.init();
});