

// ------------------------------------------------------------
// Работа с пагинацией
async function pagination() {
    // Массив постов
    let responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts `); //?_start=0&_limit=${contsPosts} Забираем данные всех постов с JSONPlaceholder
    let responsePostsText1 = await responsePosts.json(); // Преобразуем в 

    // Массив комментариев
    let responseComment = await fetch('https://jsonplaceholder.typicode.com/comments'); // Забираем данные всех постов с JSONPlaceholder
    let responseCommentText = await responseComment.json(); // Преобразуем в 
    // console.log(responseCommentText);


    // ------------------------------------------------------------
    // Блок по формированию списка страниц для пагинации
    let paginationNumPage = document.querySelector('#pagination');
    // console.log(paginationNumPage);

    let notesOnPage = 9; // Кол-во постов на странице

    // Расчитываем, сколько нужно страниц
    let countOfItems = Math.ceil(responsePostsText1.length / notesOnPage);

    for (let i = 1; i <= countOfItems; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        paginationNumPage.appendChild(li);
    }
    // ------------------------------------------------------------


    // Извлекаем блок-элемент хранящий записи постов в grid 
    let grid = document.querySelector('.grid');
    let items = document.querySelectorAll('#pagination li')
    // console.log(items);


    for (let item of items) {
        item.addEventListener('click', function () { // Нажимаем на li
            // ------------------------------------------------------------
            // Реализация активной страницы для пагинации 


            let active = document.querySelector('#pagination li.active');
            if (active) {
                active.classList.remove('active');
            }
            this.classList.add('active');
            // ------------------------------------------------------------

            let pageNum = +this.innerHTML;
            // console.log(pageNum);

            // ------------------------------------------------------------
            // Разбиваем массив постов
            // start = (номер страницы - 1) * кол-во записей на странице
            let start = (pageNum - 1) * notesOnPage;
            // end = start * кол-во записей на странице
            let end = start + notesOnPage;
            // Разбиваем массив постов для каждой страницы
            let notes = responsePostsText1.slice(start, end);
            // console.log(notes);

            // Кол-во комментариев под постом
            let commentsOnNote = 5;
            // ------------------------------------------------------------


            // ------------------------------------------------------------
            // Генерируем HTML
            grid.innerHTML = ''; // Очищаем блок grid
            for (let note of notes) {
                // console.log(note.id);
                // Создаем блок поста
                let gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                grid.appendChild(gridItem);

                // Создаем заголовок блока поста
                let gridItemTitle = document.createElement('div');
                gridItemTitle.classList.add('grid-item__title');
                gridItemTitle.innerHTML = note.title;
                gridItem.appendChild(gridItemTitle);

                // Создаем тело блока поста
                let gridItemContent = document.createElement('div');
                gridItemContent.classList.add('grid-item__content');
                gridItemContent.innerHTML = note.body;
                gridItem.appendChild(gridItemContent);

                // Создаем ОБЩИЙ блок с комментариями
                let switchСomment = document.createElement('div');
                switchСomment.classList.add('switch-comment');
                gridItem.appendChild(switchСomment);

                // Создаем блок с комментариями
                let collapsible = document.createElement('button');
                collapsible.classList.add('collapsible');
                collapsible.innerHTML = 'Комментарии';
                switchСomment.appendChild(collapsible);

                // Создаем кнопку переключатель для комментариев
                let comments = document.createElement('div');
                comments.classList.add('comments-content');
                switchСomment.appendChild(comments);

                // Создаем блок-комментарий
                let comment = document.createElement('div');
                comment.classList.add('comment');
                comments.appendChild(comment);

                // Разбиваем массив комментариев
                // startComm = (номер записи - 1) * кол-во комментариев под записью
                let startComm = (note.id - 1) * commentsOnNote;
                // endComm = startComm + кол-во комментариев под записью
                let endComm = startComm + commentsOnNote;
                // Разбиваем массив комментариев для каждой записи
                let notesComm = responseCommentText.slice(startComm, endComm);


                for (let i = 0; i < notesComm.length; i++) {
                    // console.log(notesComm);
                    // Создаем заголовок блока-комментария
                    let commentTitle = document.createElement('div');
                    commentTitle.classList.add('comment__title');
                    commentTitle.innerHTML = notesComm[i].name;
                    comment.appendChild(commentTitle);

                    // Создаем тело блока-комментария
                    let commentContent = document.createElement('div');
                    commentContent.classList.add('comment__content');
                    commentContent.innerHTML = notesComm[i].body;
                    comment.appendChild(commentContent);

                    // Создаем email блока-комментария
                    let commentEmail = document.createElement('div');
                    commentEmail.classList.add('comment__email');
                    commentEmail.innerHTML = notesComm[i].email;
                    comment.appendChild(commentEmail);
                }
                // ------------------------------------------------------------

            }

            // ------------------------------------------------------------
            // Блок по свертыванию и развертыванию комментариев
            function hiddenComments() {
                let coll = document.getElementsByClassName('collapsible');
                for (let i = 0; i < coll.length; i++) {
                    coll[i].addEventListener('click', function () {
                        this.classList.toggle('active');
                        let content = this.nextElementSibling;
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                        } else {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    })
                }

            };
            setTimeout(hiddenComments, 400);
            // ------------------------------------------------------------
        })
    }









    // ------------------------------------------------------------
    // Реализация активной страницы по умолчанию

    function start() {
        let active = items[0];
        if (active) {
            active.classList.remove('active');
        }
        items[0].classList.add('active');
        // ------------------------------------------------------------

        let pageNum = +items[0].innerHTML;
        // console.log(pageNum);

        // ------------------------------------------------------------
        // Разбиваем массив постов
        // start = (номер страницы - 1) * кол-во записей на странице
        let start = (pageNum - 1) * notesOnPage;
        // end = start * кол-во записей на странице
        let end = start + notesOnPage;
        // Разбиваем массив постов для каждой страницы
        let notes = responsePostsText1.slice(start, end);
        // console.log(notes);

        // Кол-во комментариев под постом
        let commentsOnNote = 5;
        // ------------------------------------------------------------


        // ------------------------------------------------------------
        // Генерируем HTML
        grid.innerHTML = ''; // Очищаем блок grid
        for (let note of notes) {
            // console.log(note.id);
            // Создаем блок поста
            let gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            grid.appendChild(gridItem);

            // Создаем заголовок блока поста
            let gridItemTitle = document.createElement('div');
            gridItemTitle.classList.add('grid-item__title');
            gridItemTitle.innerHTML = note.title;
            gridItem.appendChild(gridItemTitle);

            // Создаем тело блока поста
            let gridItemContent = document.createElement('div');
            gridItemContent.classList.add('grid-item__content');
            gridItemContent.innerHTML = note.body;
            gridItem.appendChild(gridItemContent);

            // Создаем ОБЩИЙ блок с комментариями
            let switchСomment = document.createElement('div');
            switchСomment.classList.add('switch-comment');
            gridItem.appendChild(switchСomment);

            // Создаем блок с комментариями
            let collapsible = document.createElement('button');
            collapsible.classList.add('collapsible');
            collapsible.innerHTML = 'Комментарии';
            switchСomment.appendChild(collapsible);

            // Создаем кнопку переключатель для комментариев
            let comments = document.createElement('div');
            comments.classList.add('comments-content');
            switchСomment.appendChild(comments);

            // Создаем блок-комментарий
            let comment = document.createElement('div');
            comment.classList.add('comment');
            comments.appendChild(comment);

            // Разбиваем массив комментариев
            // startComm = (номер записи - 1) * кол-во комментариев под записью
            let startComm = (note.id - 1) * commentsOnNote;
            // endComm = startComm + кол-во комментариев под записью
            let endComm = startComm + commentsOnNote;
            // Разбиваем массив комментариев для каждой записи
            let notesComm = responseCommentText.slice(startComm, endComm);


            for (let i = 0; i < notesComm.length; i++) {
                // console.log(notesComm);
                // Создаем заголовок блока-комментария
                let commentTitle = document.createElement('div');
                commentTitle.classList.add('comment__title');
                commentTitle.innerHTML = notesComm[i].name;
                comment.appendChild(commentTitle);

                // Создаем тело блока-комментария
                let commentContent = document.createElement('div');
                commentContent.classList.add('comment__content');
                commentContent.innerHTML = notesComm[i].body;
                comment.appendChild(commentContent);

                // Создаем email блока-комментария
                let commentEmail = document.createElement('div');
                commentEmail.classList.add('comment__email');
                commentEmail.innerHTML = notesComm[i].email;
                comment.appendChild(commentEmail);
            }
            // ------------------------------------------------------------

        }

        // ------------------------------------------------------------
        // Блок по свертыванию и развертыванию комментариев
        function hiddenComments() {
            let coll = document.getElementsByClassName('collapsible');
            for (let i = 0; i < coll.length; i++) {
                coll[i].addEventListener('click', function () {
                    this.classList.toggle('active');
                    let content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                })
            }

        };
        setTimeout(hiddenComments, 400);
        // ------------------------------------------------------------
    }
    start();
}

pagination();

