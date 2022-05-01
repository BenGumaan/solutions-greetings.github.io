    // Make the text element draggable.
    $(document).ready(function() {
        $(function() {
            $('#theText').draggable({
                containment: 'parent' // set draggable area.
            });
        });
    })

    var fontFamily = "Calibri";
    var fontColor = "white";
    var fontSize = "28px";

    var xxx = document.getElementById('fonts').onchange = function() {
        fontFamily = this.value;
        document.getElementById('theText').style.fontFamily = fontFamily;
        console.log('You selected: ', fontFamily);
    };
    var yyy = document.getElementById('fontSize').onchange = function() {
        fontSize = this.value;
        document.getElementById('theText').style.fontSize = fontSize;
        console.log('You selected: ', fontSize);
    };
    var zzz = document.getElementById('fontColor').onchange = function() {
        fontColor = this.value;
        document.getElementById('theText').style.color = fontColor;
        console.log('You selected: ', fontColor);
    };

    // Select image and show it.
    let chooseImage = () => {
        document.getElementById('file').click();
    }

    let showImage = (fl) => {
        if (fl.files.length > 0) {
            let reader = new FileReader();

            reader.onload = function(e) {
                let img = new Image();
                const imgRatio = img.height / img.width
                const winRatio = window.innerHeight / window.innerWidth
                console.log("imgRatio: ", imgRatio);
                console.log("winRatio: ", winRatio);
                console.log("window.innerHeight: ", window.innerHeight);
                console.log("window.innerWidth: ", window.innerWidth);

                img.onload = function() {

                    if (this.width > screen.width || this.height > screen.height) {
                        // alert('Please select a small image. The image width and height should be less than the screen width and height.');

                        document.getElementById('theText').style.display = 'block';
                        document.getElementById('bt').style.display = 'block';
                        document.getElementById('textArea').style.display = 'block';

                        // document.getElementById('theText').style.display = 'none';
                        // document.getElementById('bt').style.display = 'none';
                        // document.getElementById('textArea').style.display = 'none';
                        // document.getElementById('myimage').src = '';
                    } else {
                        document.getElementById('theText').style.display = 'block';
                        document.getElementById('bt').style.display = 'block';
                        document.getElementById('textArea').style.display = 'block';
                    }
                }

                img.src = e.target.result; // actual image.
                document.getElementById('myimage').src = reader.result; // Add the image on the form.
            };
            reader.readAsDataURL(fl.files[0]);
        }
    }

    // const coverImg = (img, type = 'contain') => {
    //     const imgRatio = img.height / img.width
    //     const winRatio = window.innerHeight / window.innerWidth
    //     console.log("imgRatio: ", imgRatio);
    //     console.log("winRatio: ", winRatio);
    //     if ((imgRatio < winRatio) || (imgRatio > winRatio)) {
    //         const h = window.innerWidth * imgRatio
    //         ctx.drawImage(img, 0, (window.innerHeight - h) / 2, window.innerWidth, h)
    //         console.log("h: ", h);
    //         console.log("window.innerWidth: ", window.innerWidth);
    //     }
    //     if ((imgRatio > winRatio) || (imgRatio < winRatio)) {
    //         const w = window.innerWidth * winRatio / imgRatio
    //         ctx.drawImage(img, (win.w - w) / 2, 0, w, window.innerHeight)
    //         console.log("w: ", w);
    //         console.log("window.innerWidth: ", window.innerWidth);
    //     }
    // }


    let textContainer;
    let t = 'أكتب اسمك هنا';

    // Get the values that you have entered in the textarea and
    // write it in the DIV over the image.

    let writeText = (ele) => {
        t = ele.value;
        document.getElementById('theText').innerHTML = t.replace(/\n\r?/g, '<br />');
    }

    // Finally, save the image with text over it.
    let saveImageWithText = () => {

        // Change the values after saving
        textContainer = document.getElementById('theText'); // The element with the text.
        textContainer.style.color = fontColor;
        textContainer.style.fontSize = fontSize;

        // Create an image object.
        let img = new Image();
        img.src = document.getElementById('myimage').src;

        // Create a canvas object.
        let canvas = document.createElement("canvas");

        // Wait till the image is loaded.
        img.onload = function() {
            drawImage();
            // downloadImage(img.src.replace(/^.*[\\\/]/, '')); // Download the processed image.
            var img_name = document.getElementById('theText').textContent;
            downloadImage(img_name); // Download the processed image.
        }

        // Draw the image on the canvas.
        let drawImage = () => {
            let ctx = canvas.getContext("2d"); // Create canvas context.

            // Assign width and height.
            img.width = 900;
            img.height = 600;
            canvas.width = img.width; // Make the canvas the same width as the image
            canvas.height = img.height; // Make the canvas the same height as the image

            // Draw the image.
            // ctx.drawImage(img, 0, 0);
            ctx.drawImage(img, 0, 0, 900, 600); // define the default width and height of the image

            textContainer.style.border = 0;

            // Get the padding etc.
            let left = parseInt(window.getComputedStyle(textContainer).left);
            let right = textContainer.getBoundingClientRect().right;
            let top = parseInt(window.getComputedStyle(textContainer).top, 0);
            let center = textContainer.getBoundingClientRect().width / 2;

            let paddingTop = window.getComputedStyle(textContainer).paddingTop.replace('px', '');
            console.log("paddingTop:", paddingTop); // 5
            let paddingLeft = window.getComputedStyle(textContainer).paddingLeft.replace('px', '');
            let paddingRight = window.getComputedStyle(textContainer).paddingRight.replace('px', '');

            // Get text alignement, colour and font of the text.
            let txtAlign = window.getComputedStyle(textContainer).textAlign;
            let color = window.getComputedStyle(textContainer).color;
            let fnt = window.getComputedStyle(textContainer).font;

            // Assign text properties to the context.
            ctx.font = fontSize + ' ' + fontFamily.replaceAll('"', ''); /// using the last part
            ctx.fillStyle = fontColor;
            ctx.textAlign = txtAlign;

            // Now, we need the coordinates of the text.
            let x; // coordinate.
            if (txtAlign === 'right') {
                x = right + parseInt(paddingRight) - 11;
                console.log("X: ", x);
                console.log("Right: ", right);
                console.log("textAlign: ", txtAlign);
            }
            if (txtAlign === 'left') {
                x = left + parseInt(paddingLeft);
                console.log("X: ", x);
                console.log("Left: ", left);
                console.log("textAlign: ", txtAlign);
            }
            if (txtAlign === 'center') {
                x = center + left;
                console.log("X: ", x);
                console.log("Center: ", center);
                console.log("textAlign: ", txtAlign);
            }

            // Get the text (it can a word or a sentence) to write over the image.
            let str = t.replace(/\n\r?/g, '<br />').split('<br />');

            // finally, draw the text using Canvas fillText() method.
            for (let i = 0; i <= str.length - 1; i++) {
                ctx.fillText(
                    str[i].replace('</div>', '').replace('<br>', '').replace(';', ''),
                    x, // X-axis of the text
                    parseInt(paddingTop, 10) + parseInt(top, 10) + 35 + (i * 15)); // Y-axis of the text  // paddingTop = 5  => as in style file

                console.log("parstInt paddingTop", parseInt(paddingTop, 10));
                console.log(parseInt(paddingTop, 10) + parseInt(top, 10) + 10 + (i * 15));
                console.log("Top:", top);
                console.log("i", i);
            }

            // document.body.append(canvas);  // Show the image with the text on the Canvas.
        }

        // Download the processed image.
        let downloadImage = (img_name) => {
            let a = document.createElement('a');
            a.href = canvas.toDataURL("image/png");
            a.download = img_name;
            document.body.appendChild(a);
            a.click();
        }
    }