

// // Блок по свертыванию и развертыванию комментариев
// function hiddenComments() {
//     let coll = document.getElementsByClassName('collapsible');
//     for (let i = 0; i < coll.length; i++) {
//         coll[i].addEventListener('click', function () {
//             this.classList.toggle('active');
//             let content = this.nextElementSibling;
//             if (content.style.maxHeight) {
//                 content.style.maxHeight = null;
//             } else {
//                 content.style.maxHeight = content.scrollHeight + 'px';
//             }
//         })
//     }

// };

// setTimeout(hiddenComments, 400);



// // Работаем с постами 
// async function getResponsePosts() {

//     let responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts `); //?_start=0&_limit=${contsPosts} Забираем данные всех постов с JSONPlaceholder
//     let responsePostsText = await responsePosts.json(); // Преобразуем в 
//     // console.log(responsePostsText);
//     let responseComment = await fetch('https://jsonplaceholder.typicode.com/comments'); // Забираем данные всех постов с JSONPlaceholder
//     let responseCommentText = await responseComment.json(); // Преобразуем в 

//     // Извлекаем блок-элемент хранящий записи постов в grid 
//     let grid = document.querySelector('.grid');



//     // Цикл для перебора постов
//     let key;
//     let item;
//     // for (key in responsePostsText) {

//     //     for (key in responseCommentText) {

//     //         grid.innerHTML += `
//     //         <div class="grid-item">
//     //             <div class="grid-item__title">
//     //                 <h2>${responsePostsText[key].title}</h2>
//     //             </div>
//     //             <div class="grid-item__content">
//     //                 ${responsePostsText[key].body}
//     //             </div>
//     //             <div class="switch-comment" >
//     //                 <button class="collapsible">Комментарии</button>

//     //                 <div class="comments-content">

//     //                     <div class="comment">
//     //                         <div class="comment__title">
//     //                             ${responseCommentText[key].name}
//     //                         </div>
//     //                         <div class="comment__content">
//     //                             ${responseCommentText[key].body}
//     //                         </div>
//     //                         <div class="comment__email">
//     //                             ${responseCommentText[key].email}
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     `
//     //     }
//     // }
// }

// getResponsePosts();




// Работа с пагинацией
async function pagination() {
    // Массив постов
    let responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts `); //?_start=0&_limit=${contsPosts} Забираем данные всех постов с JSONPlaceholder
    let responsePostsText1 = await responsePosts.json(); // Преобразуем в 

    // Массив комментариев
    let responseComment = await fetch('https://jsonplaceholder.typicode.com/comments'); // Забираем данные всех постов с JSONPlaceholder
    let responseCommentText = await responseComment.json(); // Преобразуем в 
    // console.log(responseCommentText);

    // Извлекаем блок-элемент хранящий записи постов в grid 
    let grid = document.querySelector('.grid');
    let items = document.querySelectorAll('#pagination li')
    console.log(items);
    let notesOnPage = 9; // Кол-во постов на странице
    for (let item of items) {
        item.addEventListener('click', function () {
            let pageNum = +this.innerHTML;
            // console.log(pageNum);

            /*
            1 = 0 - 9
            2 = 9 - 18
            3 = 18 - 27
            4 = 27 - 36
            5 = 36 - 45
            6 = 45 - 54
            7 = 54 - 63
            8 = 63 - 72
            9 = 72 - 81
            10 = 81 - 90
            11 = 90 - 99
            12 = 99 - 108
            */

            // Разбиваем массив постов
            // start = (номер страницы - 1) * кол-во записей на странице
            let start = (pageNum - 1) * notesOnPage;
            // end = start * кол-во записей на странице
            let end = start + notesOnPage;
            // Разбиваем массив постов для каждой страницы
            let notes = responsePostsText1.slice(start, end);
            console.log(notes);

            // Кол-во комментариев под постом
            let commentsOnNote = 5;


            // Генерируем HTML
            grid.innerHTML = ''; // Очищаем блок grid
            for (let note of notes) {
                console.log(note.id);
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
                    console.log(notesComm);
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


            }


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
        })
    }
}

pagination();
// setTimeout(pagination, 400);
