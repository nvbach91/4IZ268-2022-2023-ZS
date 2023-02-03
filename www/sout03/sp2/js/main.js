$(document).ready(function () {

    let text = $("#text_i");
    let from = $("#from_i");
    let color = $("#color");
    let fonts = $("#font-picker");
    let size = $("#size");
    let submit = $('#submit');
    let form = $("#formFile");
    let download = $('#download');
    let share = $("#share");
    let img1 = $("#img2");
    let img2 = $("#img2");
    let img3 = $("#img3");
    let img_cont = [img1, img2, img3];
    let style = $("#style-btn");
    let name = $("#name");
    let main = $("#main-text");
    let output = $("#output");


    /* var url1 = "https://picsum.photos/id/";
     var url3 = "/800?";
     opraveno*/





    //path = $("#formFile").val(); opraveno

    main.change(function () {
        //text_img = $(this).val()
        //text = $("#text_i")
        text.html($(this).val())


    })
    name.change(function () {
        //from_who = $("#name").val()
        //from = $("#from_i")
        from.html($(this).val())

    })




    style.click(function () {
        text.css({ "font-family": fonts.val(), "font-size": size.val(), "color": color.val() });
        from.css({ "font-family": fonts.val(), "font-size": size.val(), "color": color.val() });
    });






    submit.click(function () {

        let url2 = $("[type='radio']:checked").val();
        /*src = url1 + $("[type='radio']:checked").val() + url3; opraveno*/
        console.log("prvni")
        fetch("https://picsum.photos/v2/list?page=1?limit=5", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then((response) => response.json())
            .then((data) => {



                let prv_img = $('.img_prv')
                for (let i = 0; i < data.length; i++) {

                    //console.log(data[i].url);
                    //console.log(img_cont)

                    let img = $('<img>', { class: "banana", src: data[i].download_url, alt: "image" }).click(function () {
                        console.log("banana")
                        let xhr = new XMLHttpRequest();
                        xhr.open("GET", data[i].download_url, true);
                        xhr.send();
                        xhr.responseType = 'blob';
                        xhr.onload = response;
                        function response() {
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL(this.response);
                            document.querySelector("#output").src = imageUrl;
                        }
                    })
                    prv_img.prepend(img)

                }
            }
            )
            .catch((error) => { window.alert(`Upsik Dupsik, server nám neposkytl obrázek, vyberte si svůj. ERROR:${error}`) })
    });
    // response JSon parsovani, ale to jen v pripade ze taham img detail a nebo img list, kde dostanu json








    form.change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#output").attr("src", e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    download.click(function () {
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


    share.click(() => {
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
                        alert("Nemáte funkci sdílení ve vašem prohlížeči, stáhněte si přání do vašeho počítače.");
                    };
                };
                share();
            }

                , 'image/png');
        });
    });

})


