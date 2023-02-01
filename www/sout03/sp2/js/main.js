$(document).ready(function () {



    var url1 = "https://picsum.photos/id/";
    var url3 = "/800?";




    url2 = $("[type='radio']:checked").val();
    path = $("#formFile").val();

    $("#main-text").change(function () {
        text_img = $("#main-text").val()
        text = $("#text_i")
        text.html(text_img)
    })

    $("#name").change(function () {
        from_who = $("#name").val()
        from = $("#from_i")
        from.html(from_who)
    })


    $("#font-picker").change(function () {

        text.css("font-family", $(this).val());
        from.css("font-family", $(this).val());

    });

    $("#size").change(function () {
        from.css("font-size", $(this).val() + "px");
        text.css("font-size", $(this).val() + "px");
    });

    $("#color").change(function () {
        from.css("color", $(this).val());
        text.css("color", $(this).val());
    });



    $("#submit").click(function () {

        src = url1 + $("[type='radio']:checked").val() + url3;
        xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.send();
        xhr.responseType = 'blob';
        xhr.onload = response;
        function response(e) {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            document.querySelector("#output").src = imageUrl;
        }

    });


    $("#formFile").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#output").attr("src", e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $('#download').click(function () {
        html2canvas(document.querySelector("#img_container")).then(canvas => {
            {
                var a = document.createElement('a');
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.download = 'prani.jpg';
                a.click();

            }
        });
    });


    $("#share").click(() => {
        html2canvas(document.querySelector("#img_container")).then(canvas => {

            canvas.toBlob(file = function (blob) {

                file = blob;
                file = new File([blob], "image.png", { type: blob.type });

                async function share() {
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: "Přání",
                                text: "Přání!",
                                url: "http://127.0.0.1:5500/index.html",
                                files: [file]
                            });
                            console.log("Sdílení se podařilo.");
                        } catch (err) {
                            console.error("Sdílení selhalo:", err.message);
                        }
                    } else {
                        alert("Nemáte funkci sdílení ve vašem prohlížeči");
                    };
                };
                share();
            }

                , 'image/png');
        });
    });

})


