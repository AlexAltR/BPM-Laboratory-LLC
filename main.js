

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



// Работаем с постами 
async function getResponsePosts() {
    let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=9'); // Забираем данные всех постов с JSONPlaceholder
    let responsePostsText = await responsePosts.json(); // Преобразуем в 
    // console.log(responsePostsText);
    let responseComment = await fetch('https://jsonplaceholder.typicode.com/comments'); // Забираем данные всех постов с JSONPlaceholder
    let responseCommentText = await responseComment.json(); // Преобразуем в 

    // Извлекаем блок-элемент хранящий записи постов в grid 
    let grid = document.querySelector('.grid');



    // Цикл для перебора постов
    let key;
    let item;
    for (key in responsePostsText) {

        for (key in responseCommentText) {

            grid.innerHTML += `
            <div class="grid-item">
                <div class="grid-item__title">
                    <h2>${responsePostsText[key].title}</h2>
                </div>
                <div class="grid-item__content">
                    ${responsePostsText[key].body}
                </div>
                <div class="switch-comment" >
                    <button class="collapsible">Комментарии</button>
                
                    <div class="comments-content">

                        <div class="comment">
                            <div class="comment__title">
                                ${responseCommentText[key].name}
                            </div>
                            <div class="comment__content">
                                ${responseCommentText[key].body}
                            </div>
                            <div class="comment__email">
                                ${responseCommentText[key].email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
            // ${responseCommentText[i].name}




            console.log(responsePostsText[key])
        }
    }
}


// Работаем с комментариями
// async function getResponseComment() {
//     let responseComment = await fetch('https://jsonplaceholder.typicode.com/comments'); // Забираем данные всех постов с JSONPlaceholder
//     let responseCommentText = await responseComment.json(); // Преобразуем в 
//     console.log(responseCommentText);
// }


getResponsePosts();

// getResponseComment();

