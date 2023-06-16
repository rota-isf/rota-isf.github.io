/**
 * Search function
 */
function searchFunc() {
    let searchPhrase = document.getElementById("searchbox").value;
    let entries = document.getElementById("entries");
    let count = 0;
    let countResult = document.getElementById("count-result");
    entries.innerHTML = "";
    fetch(`assets/MD/contents/docs.md`)
        .then((res) => res.text())
        .then((text) => {
            let posts = [];
            text.split("---------------------\n").forEach(item => {
                posts.push(item.split("\n"));
            });
            posts.forEach(post => {
                keywords = post[4].split("، ");
                keypersons = post[5].split("، ");            
                if (keywords.indexOf(searchPhrase) >= 0 || keypersons.indexOf(searchPhrase) >= 0) {
                    entries.innerHTML += `<article class="entry"><h2 class="entry-title">${post[1]}</h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a>${post[0]}</a></li></ul></div><div class="entry-content"><p>${post[2].slice(0, 200) + "..."}</p><button class="btn btn-blue" onclick="showPost('${post[7]}')">مطالعه‌ی بیشتر</button></div></article>`;
                    count += 1;
                }
            });
            countResult.innerText = count + " مورد یافت شد.";
        })
        .catch((e) => console.error(e));
}

// function searchFunc() {
//     let searchPhrase = document.getElementById("searchbox").value;
//     let entries = document.getElementById("entries");
//     let count = 0;
//     let countResult = document.getElementById("count-result");
//     entries.innerHTML = "";
//     fetch(`assets/MD/contents/docs.md`)
//         .then((res) => res.text())
//         .then((text) => {
//             let posts = [];
//             text.split("---------------------\n").forEach(item => {
//                 posts.push(item);
//             });
//             posts.forEach(post => {
//                 if (posts[posts.indexOf(post)].search(searchPhrase) !== -1) {
//                     post = post.split("\n");
//                     entries.innerHTML += `<article class="entry"><h2 class="entry-title">${post[1]}</h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a>${post[0]}</a></li></ul></div><div class="entry-content"><p>${post[2].slice(0, 200) + "..."}</p><button class="btn btn-blue" onclick="showPost('${post[7]}')">مطالعه‌ی بیشتر</button></div></article>`;
//                     count += 1;
//                 }
//             })
//             countResult.innerText = count + " مورد یافت شد.";
//         })
//         .catch((e) => console.error(e));
// }

window.onkeyup = function(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    if ( key == 13 ) {
        searchFunc();
    }
}

/**
 * Show post function
 */
function showPost(article) {
    let entries = document.getElementById("entries");
    fetch("assets/MD/contents/docs.md")
        .then((res) => res.text())
        .then((text) => {
            let posts = [];
            text.split("---------------------\n").forEach(item => {
                posts.push(item.split("\n"));
            });
            entries.innerHTML = "";
            entries.innerHTML += `<article class="entry"><h2 class="entry-title">${posts[article-1][1]}</h2><div class="entry-meta"><ul><li class="d-flex"><li class="d-flex align-items-center"><i class="bi bi-clock"></i><a>${posts[article-1][0]}</a></li></ul></div>`
            if (posts[article-1][2] !== "") {
                entries.innerHTML += `<div class="entry-content"><h6 class="entry-title">- شرح مختصر</h6>${posts[article-1][2]}<p></p>`
            }
            if (posts[article-1][3] !== "") {
                entries.innerHTML += `<h6 class="entry-title">- وقایع متاثر از آن</h6>${posts[article-1][3]}<p></p>`
            }
            if (posts[article-1][5] !== "") {
                entries.innerHTML += `<h6 class="entry-title">- افراد مرتبط</h6>${posts[article-1][5]}<p></p>`
            }
            if (posts[article-1][6] !== "") {
                entries.innerHTML += `<h6 class="entry-title">- منبع</h6>${posts[article-1][6]}<p></p>`
            }
            entries.innerHTML += `<div class="read-more"><a href="contents.html">بازگشت</a></div></div></article>`;
            entries.innerHTML = entries.innerHTML.replaceAll("</article>", "");

        })
        .catch((e) => console.error(e));
}

let page = 1;

/**
 * Show posts
 */
fetch("assets/MD/contents/docs.md")
    .then((res) => res.text())
    .then((text) => {
        let entries = document.getElementById("entries");
        let posts = [];
        text.split("---------------------\n").slice((20*page)-19,20*page).forEach(item => {
            posts.push(item.split("\n"));
        });
        posts.forEach(post => {
            entries.innerHTML += `<article class="entry"><h2 class="entry-title">${post[1]}</h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a>${post[0]}</a></li></ul></div><div class="entry-content"><p>${post[2].slice(0, 200) + "..."}</p><button class="btn btn-blue" onclick="showPost('${post[7]}')">مطالعه‌ی بیشتر</button></div></article>`;
        });
    })
    .catch((e) => console.error(e));

    
function nextPage() {
    page += 1;
    entries.innerHTML = "";
    fetch("assets/MD/contents/docs.md")
        .then((res) => res.text())
        .then((text) => {
            posts = [];
            text.split("---------------------\n").slice((20*page)-19,20*page).forEach(item => {
                posts.push(item.split("\n"));
            });
            posts.forEach(post => {
                entries.innerHTML += `<article class="entry"><h2 class="entry-title">${post[1]}</h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a>${post[0]}</a></li></ul></div><div class="entry-content"><p>${post[2].slice(0, 200) + "..."}</p><button class="btn btn-blue" onclick="showPost('${post[7]}')">مطالعه‌ی بیشتر</button></div></article>`;
            });
        })
        .catch((e) => console.error(e));
}

function prevPage() {
    if (page > 1) { 
        page -= 1;
    }
    entries.innerHTML = "";
    fetch("assets/MD/contents/docs.md")
        .then((res) => res.text())
        .then((text) => {
            posts = [];
            text.split("---------------------\n").slice((20*page)-19,20*page).forEach(item => {
                posts.push(item.split("\n"));
            });
            posts.forEach(post => {
                entries.innerHTML += `<article class="entry"><h2 class="entry-title">${post[1]}</h2><div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a>${post[0]}</a></li></ul></div><div class="entry-content"><p>${post[2].slice(0, 200) + "..."}</p><button class="btn btn-blue" onclick="showPost('${post[7]}')">مطالعه‌ی بیشتر</button></div></article>`;
            });
        })
        .catch((e) => console.error(e));
}
