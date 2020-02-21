window.addEventListener("DOMContentLoaded", function () {
    // var el_Img = document.getElementById('ContainerImgCode');/*Получаем контейнер для img*/

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        /*navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {*/
        // navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } }).then(function (stream) {

        var parent  = document.querySelector('#content');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(
            function (stream) {
                //video.src = window.URL.createObjectURL(stream);
            let video = document.createElement('video');
                video.autoplay = "autoplay";
                video.id       = "video";
                video.srcObject = stream;
                video.play();
                parent.prepend(video);

            },
            function (error) {
            let input = document.createElement('input');
                input.name  = "imgCode";
                input.type  = "file";
                input.id    = "uploadFile";
                input.addEventListener('change', function () {  

                    var file = this.files[0];/*Получаем содержимое файла*/
                    var reader = new FileReader(); /*Создаем объект reader класса FileReader*/
            
                    reader.onload = function (e) { /*Создаем  обработчик загрузки файла */
                        var img = new Image(); /*Создаем изображение*/
                        img.src = e.target.result;  /*В качестве пути указываем содержимое файла*/
                        var el_Img = document.getElementById('ContainerImgCode');/*Получаем контейнер для img*/
                        el_Img.innerHTML = ''; /*Обнуляем контейнер для img*/
                        el_Img.appendChild(img);/*Помещаем изображение в контейнер*/
                    };
                    reader.readAsDataURL(file);/*Преобразовываем содержимое файла в кодировку base64*/
            
                    /* var formElement = document.querySelector("form");
                    var formData = new FormData(formElement);  */
            
                    // создаём объект formData
                    var formData = new FormData();
                    // добавляем в formData файл
                    formData.append('code', file);
            
                    $.ajax({
                        url: 'https://facesheet:4433/decode',
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        dataType: "text",
                        success: function (resp) {
                            var el_Txt = document.getElementById('ContainerImgTxt');/*Получаем контейнер для текста img*/
                            el_Txt.innerHTML = ''; /*Обнуляем контейнер для текста*/
                            el_Txt.innerHTML = resp;
                        }
                    });
            
                });
                parent.prepend(input);


            }
        );
    }

}, false);	
