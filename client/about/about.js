function changeImage() {
    var image = document.getElementById("sharon"); //what i clicked on
    var main = document.getElementById("group"); //what i'm going to change
    if (image.src == "https://farm6.staticflickr.com/5727/22012819988_291bab87a2_b.jpg") {
        main.src = "http://i1036.photobucket.com/albums/a449/susiekang1995/f7615ea2-671f-4f2f-a8e4-4b8679e4c42a_zpsu37xz7kb.jpg";
    } else {
        main.src = "https://farm6.staticflickr.com/5727/22012819988_291bab87a2_b.jpg";
    }
}