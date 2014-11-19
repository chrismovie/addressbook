var Resample = (function (canvas) {

 // (C) WebReflection Mit Style License

 function Resample(img, width, height, onresample) {
  var

   load = typeof img == "string",
   i = load || img;

  // if string, a new Image is needed
  if (load) {
   i = new Image;
   i.onload = onload;
   i.onerror = onerror;
  }

  i._onresample = onresample;
  i._width = width;
  i._height = height;
  load ? (i.src = img) : onload.call(img);
 }

 function onerror() {
  throw ("not found: " + this.src);
 }

 function onload() {
  var
   img = this,
   width = img._width,
   height = img._height,
   onresample = img._onresample
  ;
  // if width and height are both specified
  // the resample uses these pixels
  // if width is specified but not the height
  // the resample respects proportions
  // accordingly with orginal size
  // same is if there is a height, but no width
  var minValue = Math.min(img.height, img.width);
  width == null && (width = round(img.width * height / img.height));
  height == null && (height = round(img.height * width / img.width));

  delete img._onresample;
  delete img._width;
  delete img._height;

  // when we reassign a canvas size
  // this clears automatically
  // the size should be exactly the same
  // of the final image
  // so that toDataURL ctx method
  // will return the whole canvas as png
  // without empty spaces or lines
  canvas.width = width;
  canvas.height = height;
  // drawImage has different overloads
  // in this case we need the following one ...
  context.drawImage(
   // original image
   img,
   // starting x point
   0,
   // starting y point
   0,
   // image width
   minValue,
   // image height
   minValue,
   // destination x point
   0,
   // destination y point
   0,
   // destination width
   width,
   // destination height
   height
  );
  // retrieve the canvas content as
  // base4 encoded PNG image
  // and pass the result to the callback
  onresample(canvas.toDataURL("image/png"));
 }

 var context = canvas.getContext("2d"),
  // local scope shortcut
  round = Math.round
 ;

 return Resample;

}(
 this.document.createElement("canvas"))
);



// Required for drag and drop file access
jQuery.event.props.push('dataTransfer');

// IIFE to prevent globals
(function () {

  var s;
  var Avatar = {

    settings: {
      bod: $('body'),
      img: '#profile-avatar',
      doc: $(document)
    },

    init: function() {
      s = Avatar.settings;
      Avatar.bindUIActions();
    },

    bindUIActions: function() {

      var timer;

      s.bod.on("dragover", function(event) {
        clearTimeout(timer);
        if (event.currentTarget == s.bod[0]) {
          Avatar.showDroppableArea();
        }

        // Required for drop to work
        return false;
      });

      s.bod.on('dragleave', function(event) {
        if (event.currentTarget == s.bod[0]) {
          // Flicker protection
          timer = setTimeout(function() {
            Avatar.hideDroppableArea();
          }, 200);
        }
      });

      s.bod.on('drop', function(event) {
        // Or else the browser will open the file
        event.preventDefault();
        Avatar.handleDrop(event.dataTransfer.files);
      });

      s.doc.on('change', 'input[type="file"]', function(event) {
        Avatar.handleDrop(event.target.files);
      });
    },

    showDroppableArea: function() {
      s.bod.addClass("droppable");
    },

    hideDroppableArea: function() {
      s.bod.removeClass("droppable");
    },

    handleDrop: function(files) {

      Avatar.hideDroppableArea();

      // Multiple files can be dropped. Lets only deal with the "first" one.
      var file = files[0];

      if (file.type.match('image.*')) {

        Avatar.resizeImage(file, 256, function(data) {
          Avatar.placeImage(data);
        });

      } else {

        alert("That file wasn't an image.");

      }

    },

    resizeImage: function(file, size, callback) {

      var fileTracker = new FileReader;
      fileTracker.onload = function() {
        Resample(
         this.result,
         size,
         size,
         callback
       );
      }
      fileTracker.readAsDataURL(file);

      fileTracker.onabort = function() {
        alert("The upload was aborted.");
      }
      fileTracker.onerror = function() {
        alert("An error occured while reading the file.");
      }

    },

    placeImage: function(data) {
      $(s.img).attr("src", data);
    }

  }

  Avatar.init();

})();